import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Location } from "@angular/common";
import 'rxjs/add/operator/switchMap';

import { ExperimentService } from "./experiment.service";
import { ColorsService } from 'app/services/colors';
import { Http, Headers } from '@angular/http';
import { EditorService } from 'app/escher/editor.service';
import { EscherService } from 'app/escher/escher.service';

import { ISubscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Rx";

declare var $: any;
declare var _: any;
declare var nv: any;
declare var d3: any;
declare var moment: any;
declare var noUiSlider: any;
declare var fabric: any;
declare var ResizeSensor: any;
declare var toastr: any;

@Component({
  selector: 'app-supervised-experiment',
  templateUrl: './supervised-experiment.component.html',
  styleUrls: ['./supervised-experiment.component.scss'],
  providers: [ExperimentService, ColorsService, EditorService, EscherService]
})
export class SupervisedExperimentComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private experimentService: ExperimentService,
    private router: Router,
    private http: Http,
    private colorsService: ColorsService,
    public editorService: EditorService
  ) {
    this.colors = colorsService.getBootstrapColors();
  }

  colors: Object
  experiment: any;
  experiment_id: any;
  experiment_logs: any;
  exp_timeline: any;
  exp_timeline_all: any;
  selectedTimelineVariant = 'all'
  metrics = ['loss'];
  variants: any = [0];
  variantsData: any = { 0: { epoch: 0 } };
  selectedVariant = 'all'
  selectedMetric = 'loss'
  selectedDebuggingVariant = 0;
  model: any;
  debugSlider: any;
  canvas: any;
  canvasWrapper: any;
  gradientData: any;
  lr_var = false
  momentum_var = false
  epochs_var = false
  batch_size_var = false
  test_batch_size_var = false
  seed_var = false

  private subscription: ISubscription

  ngOnInit() {

    this.canvas = new fabric.Canvas('canvas')
    this.canvasWrapper = $("#canvasWrapper")
    this.editorService.init(this.canvas, this.canvasWrapper)
    // this.editorService.initFabric()


    this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.experiment_id = params.get('exp_id')
        return this.experimentService.getExperiment(params.get('exp_id'))
      })
      .subscribe(exp => {
        this.experiment = exp
        
        // shitty code to identify what hyperparameters to highlight
        // have to fix as we add more hyperparameters
        this.lr_var = exp.config.var_lr.length > 1
        this.momentum_var = exp.config.var_momentum.length > 1
        this.epochs_var = exp.config.var_epochs.length > 1
        this.batch_size_var = exp.config.var_batch_size.length > 1
        this.test_batch_size_var = exp.config.var_test_batch_size.length > 1
        this.seed_var = exp.config.var_seed.length > 1

        this.experiment.createdAt = moment(this.experiment.createdAt).fromNow()
        this.getModel();

        // refresh timeline and data every minute on the dashboard and 
        // destroy the subscription onDestroy component
        this.subscription = Observable.interval(1000 * 60 * 5).subscribe(() => {
          this.refreshTimeline()
          this.refreshData()
        })

        this.getExperimentTimeline();
        this.getExperimentLogs();
      })

    this.debugSlider = document.getElementById('debug-variant-slider')
    noUiSlider.create(this.debugSlider, {
      start: 0,
      connect: [true, false],
      step: 1,
      tooltips: true,
      format: {
        to: x => Math.round(x),
        from: x => Math.round(x)
      },
      range: {
        min: 0,
        max: 0.1
      }
    })
    this.modifySlider(this.selectedDebuggingVariant)

    this.debugSlider.noUiSlider.on('set', x => {
      if (x[0] == 0) {
        this.gradientData = undefined
        this.editorService.loadGradientData(this.gradientData)        
      }
      if (this.experiment && x[0] > 0) {
        this.http.post('/api/s3_object', {
          exp_id: this.experiment._id,
          variant: this.selectedDebuggingVariant,
          epoch: x[0]
        }).toPromise()
          .then(response => {
            if (!response.json().gradients) {
              toastr.options = {
                iconClass: '',
                positionClass: 'toast-top-right',
                progressBar: true,
                timeOut: 3000
              }
              toastr.info('Epoch not done yet, select previous epoch to get gradient data.')
              // console.log("gradients s3 file doens't exist yet")
            } else {
              this.gradientData = response.json().gradients
              for (let i of Object.keys(this.gradientData)) {
                this.gradientData[i].norm = this.gradientData[i].norm.toFixed(5)
                this.gradientData[i].positive = this.gradientData[i].positive.toFixed(5)
                this.gradientData[i].negative = this.gradientData[i].negative.toFixed(5)
                this.gradientData[i].zeros = this.gradientData[i].zeros.toFixed(5)
              }
              // this.gradientData = _.map(this.gradientData, x => {
              //   return {
              //     norm: x.norm.toFixed(5),
              //     positive: x.positive.toFixed(5),
              //     negative: x.negative.toFixed(5),
              //     zeros: x.zeros.toFixed(5),
              //     exploded: x.exploded
              //   }
              // })
              // console.log(this.gradientData)
              this.editorService.loadGradientData(this.gradientData)
            }
          })
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
    // throw new Error("Method not implemented.");
  }


  modifySlider(variant) {
    this.debugSlider.noUiSlider.set(0)
    this.debugSlider.noUiSlider.updateOptions({
      range: {
        'min': 0,
        'max': this.variantsData[variant].epoch + 0.2
      }
    });
  }


  getModel(): void {
    this.http.post('api/get_model', {
      model_id: this.experiment.model
    }).toPromise()
      .then(response => {
        console.log(response.json())
        this.model = response.json().model
        this.editorService.loadModel(this.model.network)
      })
      .catch(this.handleHttpError)
  }

  getExperimentTimeline(): void {
    this.http.post('/elastic/getExperimentTimeline', {
      exp_id: this.experiment._id
    }).toPromise()
      .then(response => {
        var hits = response.json().body.hits
        hits = _.sortBy(hits, x => moment(x._source.json.timestamp))
        hits = hits.reverse()
        var timeline_log
        this.exp_timeline_all = _.map(hits, x => {
          var timeline_log = x
          timeline_log.moment = moment(x._source.json.timestamp).fromNow()
          return timeline_log
        })
        console.log(this.exp_timeline_all)
        this.modifyTimeline(this.selectedTimelineVariant)
      })
      .catch(this.handleHttpError)
  }

  modifyTimeline(variant: any = "all"): void {
    console.log(variant)
    if (variant == "all") {
      this.exp_timeline = this.exp_timeline_all.slice(0, 5)
    } else {
      this.exp_timeline = _.filter(this.exp_timeline_all, x => {
        if ('variant' in x._source.json.timeline && x._source.json.timeline.variant == variant) {
          return true
        } else {
          return false
        }
      })
      this.exp_timeline = this.exp_timeline.slice(0, 5)
    }
    this.selectedTimelineVariant = variant
  }


  private handleHttpError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getExperimentLogs(): void {
    this.http.post('/elastic/getSupExpLogs', {
      exp_id: this.experiment._id
    }).toPromise()
      .then(response => {
        var temp
        var hits = _.map(response.json().body.hits, x => {
          temp = x._source.json
          temp['Variant'] = parseInt(x._source.json.variant)
          return temp
        })
        this.experiment_logs = hits
        var variants = new Set(_.map(hits, x => x.Variant))
        this.variants = _.sortBy(Array.from(variants), x => x)
        this.variantsData = {}
        for (let v of this.variants) {
          // console.log(_.filter(this.experiment_logs, x => x.Variant == v && x.event == 'train_log'))
          var maxLog = _.maxBy(
            _.filter(this.experiment_logs,
              x => x.Variant == v && x.event == 'val_log'),
            y => y.val_log.epoch)
          if (!maxLog) {
            this.variantsData[v] = {epoch: 0}
          } else {
            this.variantsData[v] = {
              epoch: maxLog.val_log.epoch
            }
          }
        }
        this.modifySlider(this.selectedDebuggingVariant)
        // console.log(this.variantsData)
        // console.log(hits)
        this.modifyDataTable(this.selectedVariant)
        this.modifyD3Table(this.selectedMetric)
      })
      .catch(this.handleHttpError)
  }

  modifyDataTable(variant: any = "all"): void {
    var keys_train
    var datatable_data_train;
    var hits_train = _.filter(this.experiment_logs, x => x.event == 'train_log')
    if (hits_train.length > 0) {
      keys_train = Object.keys(hits_train[0].train_log)
      if (variant == 'all') {
        datatable_data_train = _.map(hits_train, row => {
          return _.map(keys_train, x => row.train_log[x])
        })
      } else {
        datatable_data_train = _.map(_.filter(hits_train, x => x.Variant == variant), row => {
          return _.map(keys_train, x => row.train_log[x])
        })
      }

      var column_header_train = _.map(keys_train, x => {
        return { title: x }
      })

      this.resetDataTable(datatable_data_train, column_header_train, "#exp-logs-datatable-train")
    } else {
      keys_train = []
      datatable_data_train = []
    }
    var keys_val
    var datatable_data_val
    var hits_val = _.filter(this.experiment_logs, x => x.event == 'val_log')
    if (hits_val.length > 0) {
      keys_val = Object.keys(hits_val[0].val_log)
      if (variant == 'all') {
        datatable_data_val = _.map(hits_val, row => {
          return _.map(keys_val, x => row.val_log[x])
        })
      } else {
        datatable_data_val = _.map(_.filter(hits_val, x => x.Variant == variant), row => {
          return _.map(keys_val, x => row.val_log[x])
        })
      }

      var column_header_val = _.map(keys_val, x => {
        return { title: x }
      })
      this.resetDataTable(datatable_data_val, column_header_val, '#exp-logs-datatable-val')
    }
    this.selectedVariant = variant
  }

  resetDataTable(data: any, column_header: any, table_id: any): void {
    if ($.fn.dataTable.isDataTable(table_id)) {
      $(table_id).DataTable().destroy()
      $(table_id).empty()
      $(table_id).DataTable({
        data: data,
        columns: column_header
      })
    } else {
      $(table_id).DataTable({
        data: data,
        columns: column_header
      })
    }
  }

  nvD3Line(element: string, colors: Object, key: any, values: any, x_label: any, y_label: any): void {
    const data = _.map(_.zip(key, values), item => this.generateLineChartData(item[0], item[1], false))
    const self = this
    // console.log(data)
    nv.addGraph(function () {
      const chart = nv.models.lineWithFocusChart()
        .useInteractiveGuideline(true)
        .showLegend(true)
        .showYAxis(true)
        .showXAxis(true)
      chart.xAxis
        .axisLabel(x_label)
      chart.yAxis
        .axisLabel(y_label)
      // chart.interactiveLayer.tooltip.headerFormatter(function (d) {
      //   return ""
      // })
      // chart.interactiveLayer.tooltip.valueFormatter(function (d, i, p) {
      //   console.log(d)
      //   console.log(i)
      //   console.log(p)
      //   return ""
      // })
      chart.interactiveLayer.tooltip.contentGenerator(function (d) {
        // console.log(d)
        var header = d.value;
        var headerhtml = "<thead><tr><td colspan='3'><strong class='x-value'>" + header + "</strong></td></tr></thead>";
        var bodyhtml = "<tbody>";
        var series = d.series;
        series.forEach(function (c) {
          bodyhtml = bodyhtml + "<tr><td class='legend-color-guide'><div style='background-color: " + c.color + ";'></div></td><td class='key'>" + c.key + " " + c.data.tick + "</td><td class='value'>" + c.value + "</td></tr>";
        });
        bodyhtml = bodyhtml + "</tbody>";
        return "<table>" + headerhtml + '' + bodyhtml + "</table>";
      })
      d3.select(element)
        .datum(data)
        .call(chart);
      nv.utils.windowResize(function () {
        chart.update()
      })
      return chart;
    })
  }

  modifyD3Table(met: any): void {
    var metrics = []
    var metric
    var legend_keys = []
    for (let variant of this.variants) {
      legend_keys.push('Variant: ' + variant)
      metric = _.filter(this.experiment_logs, x => x.event == 'train_log')
      metric = _.filter(metric, x => x.Variant == variant)
      metric = _.sortBy(metric, x => x.train_log.epoch * 1000000 + x.train_log.batch_idx)
      metric = _.map(metric, x => {
        return {
          'metric': x.train_log[met],
          'batch_idx': x.train_log['batch_idx'],
          'epoch': x.train_log['epoch']
        }
      })
      metrics.push(metric)
    }
    this.selectedMetric = met
    this.nvD3Line('#nvd3-metric svg', this.colors, legend_keys, metrics, 'Batch', met)
  }

  generateLineChartData(key: any, values: any, area: any): Object {
    const values_list = []
    for (let i = 0; i < values.length; i++) {
      values_list.push({
        tick: "Epoch:" + String(values[i]['epoch']) + " Batch:" + String(values[i]['batch_idx']),
        y: values[i]['metric'].toFixed(4),
        x: i
      });
    }

    return {
      area: area,
      key: key,
      values: values_list
    }
  }

  debugVariant(variant: any): void {
    if (this.selectedDebuggingVariant != variant) {
      this.selectedDebuggingVariant = variant
      this.modifySlider(this.selectedDebuggingVariant)
    }
  }

  refreshTimeline(): void {
    if (this.experiment) {
      this.getExperimentTimeline();
    }
  }

  refreshData(): void {
    if (this.experiment) {
      this.getExperimentLogs();
    }
  }

  relaunchExperiment(): void {
    localStorage.setItem('supervised_exp_config', JSON.stringify(this.experiment.config.form_params))
    this.router.navigate(['/escher/supervised'])
  }

}
