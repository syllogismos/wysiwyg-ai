import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Location } from "@angular/common";
import { ColorsService } from "../services/colors";
import 'rxjs/add/operator/switchMap';
import { Http, Headers } from "@angular/http";


import { ExperimentService } from "./experiment.service";
import { last } from '@angular/router/src/utils/collection';

declare var $: any;
declare var _: any;
declare var Chartist: any;
declare var nv: any;
declare var d3: any;

@Component({
  selector: 'app-rl-experiment',
  templateUrl: './rl-experiment.component.html',
  styleUrls: ['./rl-experiment.component.scss'],
  providers: [ExperimentService, ColorsService]
})
export class RlExperimentComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private experimentService: ExperimentService,
    private router: Router,
    private http: Http,
    private colorsService: ColorsService
  ) {
    const palettes = colorsService.getPalettes();
    const background = $('body').attr('data-background');
    this.colors = colorsService.getBootstrapColors();
    this.palette = palettes[background];
    if (background == 'light') {
      this.palette['borderColor'] = colorsService.darken(this.palette['borderColor'], 10);
    }
    if (background == 'primary') {
      this.palette['borderColor'] = colorsService.darken(this.palette['borderColor'], 30);
    }
   }
  colors: Object;
  palette: Object;
  experiment: any;
  experiment_id: any;

  experiment_logs: any;
  hits: any;
  metrics = ['AverageReward'];
  variants: any = [0];
  selectedVariant = 'all'
  selectedMetric = 'AverageReward'

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        return this.experimentService.getExperiment(params.get('exp_id'))
      })
      .subscribe(exp => {
        console.log(exp)
        // this.experiment_id = exp.id
        this.experiment = exp
        this.getExperimentLogs()
        // return this.experiment = exp
      })
    
    this.easyPieChart('.easy-pie-chart-primary-xs', this.colors['primary'], this.palette['borderColor'], 100);
    this.easyPieChart('.easy-pie-chart-danger-xs', this.colors['danger'], this.palette['borderColor'], 100); 
    
    $('#metric-select').on('change', () => {
      const met = $('#metric-select').val()
      var metrics = []
      var metric
      var legend_keys = []
      for (let variant of this.variants) {
        legend_keys.push('Variant: ' + variant)
        metric = _.filter(this.hits, x => x.Variant == variant)
        metric = _.sortBy(metric, x => x.Iteration)
        metric = _.map(metric, x => x[met])
        metrics.push(metric)
      }

      this.nvD3Line1('#nvd3-metric svg', this.colors, legend_keys, metrics, 'Iteration', met)
    
    })

    $('#variant-select').on('change', () => {
      const variant = parseInt($('#variant-select').val())
      var keys;
      var datatable_data;
      if (this.hits.length > 0) {
        keys = _.difference(Object.keys(this.hits[0]), ['Iteration'])
        this.metrics = keys
        keys = ['Iteration'].concat(keys)
        keys = ['Iteration', 'MeanKL', 'AverageReturn', 'Entropy', 'MeanLength', 'NumTrajs', 'ExplainedVariance', 'Time']
        // console.log(keys)
        datatable_data = _.map(_.filter(this.hits, x => x.Variant == variant), row => {
          return _.map(keys, x => row[x])
        })
      } else {
        keys = []
      }
      
      var column_header = _.map(keys, x => {
        return {title: x}
      })
      $('#exp-logs-datatable').DataTable().destroy();
      $('#exp-logs-datatable').DataTable({
        data: datatable_data,
        columns: column_header
      })
    })
    
    
  }



  /**
   * ["Iteration", "AbsLearnSignal", "AverageDiscountedReturn", "AverageReturn", 
   * "Entropy", "ExplainedVariance", "ItrTime", "LossAfter", "LossBefore", "MaxLength", 
   * "MaxReturn", "MeanKL", "MeanKLBefore", "MeanLength", "MinLength", "MinReturn", 
   * "NumTrajs", "Perplexity", "StdReturn", "Time", "dLoss"]
   */

  getExperimentLogs(): void {
    this.http.post('/elastic/getExperimentLogs', {
      exp_id: this.experiment._id
    }).toPromise()
      .then(response => {
        console.log('right after querying elastic')
        console.log(response.json())
        var temp
        var hits = _.map(response.json().body.hits, x => {
          temp = x._source.json.rl_log
          temp['Variant'] = parseInt(x._source.json.variant)
          return temp;
        })
        console.log(hits)
        // hits = _.sortBy(hits, x => x.Iteration)
        this.hits = hits
        var variants = new Set(_.map(hits, x => x.Variant))
        this.variants = Array.from(variants)
        // this.variants = [0,1]
        var metrics = []
        var metric
        var legend_keys = []
        for (let variant of this.variants) {
          legend_keys.push('Variant: ' + variant)
          metric = _.filter(this.hits, x => x.Variant == variant)
          metric = _.sortBy(metric, x => x.Iteration)
          metric = _.map(metric, x => x['AverageReturn'])
          metrics.push(metric)
        }
        this.nvD3Line1('#nvd3-metric svg', this.colors, legend_keys, metrics, 'Iteration', 'AverageReward')
        var keys;
        var datatable_data;
        if (hits.length > 0) {
          keys = _.difference(Object.keys(hits[0]), ['Iteration'])
          this.metrics = keys
          this.metrics = _.difference(this.metrics, ['Variant'])
          keys = ['Iteration'].concat(keys)
          keys = ['Iteration', 'MeanKL', 'AverageReturn', 'Entropy', 'MeanLength', 'NumTrajs', 'Time', 'Variant']
          // console.log(keys)
          datatable_data = _.map(hits, row => {
            return _.map(keys, x => row[x])
          })
        } else {
          keys = []
        }
        
        var column_header = _.map(keys, x => {
          return {title: x}
        })
        // try {
        //   $('#exp-logs-datatable').DataTable().destroy();
        // } catch (e) {
        //   console.log(e.message)
        //   console.log("error caught while destroing the datatable")
        // }
        // $('#exp-logs-datatable').DataTable().destroy();
        $('#exp-logs-datatable').DataTable({
          data: datatable_data,
          columns: column_header
        })
      })
      .catch(this.handleHttpError)
  }

  easyPieChart(element: string, barColor: string, trackColor: string, size: number): void {
    $(element).easyPieChart({
      barColor: barColor,
      size: size,
      trackColor: trackColor,
      scaleColor: false,
      animate: false,
      linewidth: 5,
      lineCap: 'square'
    })
  }


  lineChart1(element: string, series: any, labels: any): void {
    const data = {
      labels: labels,
      series: series
    };
    const options = {
      fullWidth: true,
      showArea: false
      // ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    };
    new Chartist.Line(element, data, options);
  }


  private handleHttpError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  generateLineChartData(key: any, values: any, area: any): Object {
    const values_list = []
    for (let i = 0; i < values.length; i++) {
      values_list.push({
        x: i,
        y: values[i]
      });
    }

    return {
      area: area,
      key: key,
      values: values_list
    }
  }
  /**
   * 
   * @param element : html element name
   * @param colors : colors object
   * @param key : legend key eg: Variant: 0
   * @param values : values list eg: [1,2,3,4]
   * @param x_label : name of xlabel eg: Iteration
   * @param y_label : name of ylabel eg: Average Reward
   */
  nvD3Line1(element: string, colors: Object, key: any, values: any, x_label: any, y_label: any): void {
    // const data = [
    //   this.generateLineChartData(key, values, false)
    // ]
    const data = _.map(_.zip(key, values), item => this.generateLineChartData(item[0], item[1], false))
    const self = this

    nv.addGraph(function () {
      const chart = nv.models.lineChart()
        .useInteractiveGuideline(true)
        .showLegend(true)
        // .color([self.colors['primary']])
        .showYAxis(true)
        .showXAxis(true);
      chart.xAxis
        .axisLabel(x_label)
        .tickFormat(d3.format(',r'));
      chart.yAxis
        .axisLabel(y_label)
        .tickFormat(d3.format('0.02f'));
      d3.select(element)
        .datum(data)
        .call(chart);
      nv.utils.windowResize(function () {
        chart.update();
      });
      return chart;
    });
  }

  changeD3(): void {
    const meanL = _.map(this.hits, x => x.MeanLength)
    const expVar = _.map(this.hits, x => x.ExplainedVariance)
    this.nvD3Line1('#nvd3-metric svg', this.colors, ['Variant: 0'], [meanL], 'Iteration', 'Mean Length')
  }


  modifyDataTable(variant: any = "all"): void {
    var keys;
    var datatable_data;
    if (this.hits.length > 0) {
      keys = _.difference(Object.keys(this.hits[0]), ['Iteration'])
      keys = ['Iteration'].concat(keys)
      keys = ['Iteration', 'MeanKL', 'AverageReturn', 'Entropy', 'MeanLength', 'NumTrajs', 'Time', 'Variant']
      // console.log(keys)
      if (variant == "all") {
        // keys.push('Variant')
        datatable_data = _.map(this.hits, row => {
          return _.map(keys, x => row[x])
        })
      } else {
        datatable_data = _.map(_.filter(this.hits, x => x.Variant == variant), row => {
          return _.map(keys, x => row[x])
        })
      }
    } else {
      keys = []
    }
    
    var column_header = _.map(keys, x => {
      return {title: x}
    })
    console.log(column_header)
    $('#exp-logs-datatable').DataTable().destroy();
    $('#exp-logs-datatable').empty()
    $('#exp-logs-datatable').DataTable({
      data: datatable_data,
      columns: column_header
    })
    this.selectedVariant = variant
  }

  allVariantsDataTable(): void {
    this.modifyDataTable("all")
  }

  modifyD3Table(met: any): void {
    var metrics = []
    var metric
    var legend_keys = []
    for (let variant of this.variants) {
      legend_keys.push('Variant: ' + variant)
      metric = _.filter(this.hits, x => x.Variant == variant)
      metric = _.sortBy(metric, x => x.Iteration)
      metric = _.map(metric, x => x[met])
      metrics.push(metric)
    }
    this.selectedMetric = met

    this.nvD3Line1('#nvd3-metric svg', this.colors, legend_keys, metrics, 'Iteration', met)
  
  }



}
