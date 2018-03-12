import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Location } from "@angular/common";
import { ColorsService } from "../services/colors";
import 'rxjs/add/operator/switchMap';
import { Http, Headers } from "@angular/http";

import { Observable } from "rxjs/Rx";
import { ISubscription } from "rxjs/Subscription";

import { ExperimentService } from "./experiment.service";
import { last } from '@angular/router/src/utils/collection';
import { GymEnvsService } from 'app/services/gym-envs.service';

declare var $: any;
declare var _: any;
declare var Chartist: any;
declare var nv: any;
declare var d3: any;
declare var moment: any;
declare var noUiSlider: any;
declare var introJs: any;

@Component({
  selector: 'app-rl-experiment',
  templateUrl: './rl-experiment.component.html',
  styleUrls: ['./rl-experiment.component.scss'],
  providers: [ExperimentService, ColorsService, GymEnvsService]
})
export class RlExperimentComponent implements OnInit, OnDestroy {

  variant_table_header = ['seed', 'qf_batch_size', 'policy_batch_size',
    'qf_learning_rate', 'replay_pool_size', 'scale_reward', 'step_size',
    'gae_lambda', 'learning_rate', 'discount', 'batch_size'
  ]

  actual_variants: any
  private subscription: ISubscription

  constructor(
    private route: ActivatedRoute,
    private experimentService: ExperimentService,
    private router: Router,
    private http: Http,
    private colorsService: ColorsService,
    private gymEnvService: GymEnvsService
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
    this.gymEnvService.loadMetadata
  }
  colors: Object;
  palette: Object;
  experiment: any = {
    config: {form_params: {var_policy_batch_size: null,}} // initiate null experiment object to prevent errors on template
  };
  experiment_id: any;
  dataTable: any;

  experiment_logs: any;
  env_data: any;
  exp_timeline: any;
  exp_timeline_all: any;
  selectedTimelineVariant = 'all';
  hits: any;
  metrics = ['AverageReturn'];
  variants: any = [0];
  selectedVariant = 'all'
  selectedMetric = 'AverageReturn'
  selectedDebuggingVariant: any = 0
  intro = introJs();
  variantsData: any = {
    0: {
      iteration: 0
    }
  }
  variantIterationVideoSrc: String //= "https://s3.amazonaws.com/karaka_test/5a4b9c9108d1a338d21d38ef/0/escher/rl_exp/gym_log/openaigym.video.0.1.video000022.mp4"
  angularLogo = 'https://angular.io/assets/images/logos/angular/angular.svg';
  debugSlider: any;


  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.experiment_id = params.get('exp_id')
        console.log('inside switch map')
        console.log(this.experiment_id)
        return this.experimentService.getExperiment(params.get('exp_id'))
      })
      .subscribe(exp => {
        this.experiment = exp
        this.env_data = this.gymEnvService.getMetadataOfEnv(exp.config.env_name)
        this.getExperimentTimeline();
        this.getExperimentLogs();
        this.subscription = Observable.interval(1000 * 60 * 5).subscribe(() => {
          this.refreshData()
          this.refreshTimeline()
        })
        this.presentVariantDataTable();
      })
    
    this.intro.setOptions({
      // showStepNumbers: false,
      steps: [
        {
          element: '#step1',
          intro: 'Select the variant in the dropdown to see its timeline.',
          position: 'left'
        },
        {
          element: '#step2',
          intro: 'You can see all the variant configurations here.',
          position: 'top'
        },
        {
          element: '#step3',
          intro: 'Select the metric you are interested in the dropdown to see how the training is progressing.',
          position: 'below'
        },
        {
          element: '#step4',
          intro: 'Select the variant in the dropdown, and epoch in the slider below to see how the agent behaves.'
        },
        {
          element: '#cpu_step',
          intro: 'Slect any system metric to see how the compute resources are being used during training in each variant.'
        }
      ]
    })
    /**
     * Below event handler is needed as for some reason the introjs is not showing number of the step properly
     */
    this.intro.onafterchange(function(targetElement) {
      $(".introjs-helperNumberLayer").css("width", "30px");
      $(".introjs-helperNumberLayer").css("height", "30px");
    });
    
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

    this.debugSlider.noUiSlider.on('set', x => {
      if (this.experiment) {
        this.variantIterationVideoSrc = 'https://s3.amazonaws.com/karaka_test/' + this.experiment._id + '/' + String(this.selectedDebuggingVariant) + '/escher/rl_exp/gym_log/openaigym.video.0.1.video' + this.padNumberWithZeros(x[0], 6) + '.mp4'
      }
    })

    this.modifySlider(this.selectedDebuggingVariant)


  }

  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");
    this.subscription.unsubscribe();
  }

  presentVariantDataTable(): void {
    this.actual_variants = this.variant_table_header.map((e, i) => {
      return [i, this.experiment.config['var_' + e].length]
    })
    this.actual_variants = _.filter(this.actual_variants, x => x[1] > 1)
    this.actual_variants = _.map(this.actual_variants, x => x[0])
    console.log(this.actual_variants)
    console.log("actual variants lamo")
    setTimeout(() => {
      var table = $('#variants-table').DataTable();
      // hilighting the variant column parameters
      _.map(this.actual_variants, v => $(table.column(v + 1).nodes()).addClass('highlight'));
    }, 1000)
  }

  modifySlider(variant) {
    var timeoutToLoadExperiment
    if (this.experiment._id) {
      timeoutToLoadExperiment = 10
      console.log('exp loaded')
    } else {
      timeoutToLoadExperiment = 5000
      console.log('exp didnt load')
    }
    setTimeout(() => {
      this.debugSlider.noUiSlider.updateOptions({
        range: {
          'min': 0,
          'max': this.variantsData[variant].iteration + 0.2
        }
      });
      this.debugSlider.noUiSlider.set(0)
    }, timeoutToLoadExperiment)
    
  }

  padNumberWithZeros = (num, size) => {
    var s = String(num);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
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
        // this.exp_timeline = this.exp_timeline_all.slice(0, 8)
        this.modifyTimeline(this.selectedTimelineVariant)
      })
      .catch(this.handleHttpError)
  }

  /**
   * ["Iteration", "AbsLearnSignal", "AverageDiscountedReturn", "AverageReturn", 
   * "Entropy", "ExplainedVariance", "ItrTime", "LossAfter", "LossBefore", "MaxLength", 
   * "MaxReturn", "MeanKL", "MeanKLBefore", "MeanLength", "MinLength", "MinReturn", 
   * "NumTrajs", "Perplexity", "StdReturn", "Time", "dLoss"]
   */

  getExperimentLogs(): void {
    this.http.post('/elastic/getRLExpLogs', {
      exp_id: this.experiment._id
    }).toPromise()
      .then(response => {
        var temp
        var hits = _.map(response.json().body.hits, x => {
          temp = x._source.json.rl_log
          temp['Variant'] = parseInt(x._source.json.variant)
          return temp;
        })
        this.hits = hits
        var variants = new Set(_.map(hits, x => x.Variant))
        this.variants = _.sortBy(Array.from(variants), x => x)
        var keys;
        var datatable_data;
        if (hits.length > 0) {
          this.metrics = _.difference(Object.keys(hits[0]), ['Iteration'])
          this.metrics = _.difference(this.metrics, ['Variant'])
        } else {
          keys = []
        }

        // console.log(this.hits)
        for (let i of this.variants) {
          this.variantsData[i] = {
            iteration: _.maxBy(_.filter(this.hits, x => x.Variant == i), y => y.Iteration).Iteration
          }
        }

        this.modifyDataTable(this.selectedVariant)
        this.modifyD3Table(this.selectedMetric)
        this.modifySlider(this.selectedDebuggingVariant)
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

  debugVariant(variant: any): void {
    if (this.selectedDebuggingVariant != variant) {
      this.selectedDebuggingVariant = variant
      this.modifySlider(this.selectedDebuggingVariant)
    }
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
      const chart = nv.models.lineWithFocusChart()
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

  modifyTimeline(variant: any = "all"): void {
    if (variant == "all") {
      this.exp_timeline = this.exp_timeline_all.slice(0, 8)
    } else {
      this.exp_timeline = _.filter(this.exp_timeline_all, x => {
        if ('variant' in x._source.json.timeline && x._source.json.timeline.variant == variant) {
          return true
        } else {
          return false
        }
      })
      this.exp_timeline = this.exp_timeline.slice(0, 8)
    }
    this.selectedTimelineVariant = variant
  }

  allVariantsTimeline(): void {
    this.modifyTimeline('all')
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
      var column_header = _.map(keys, x => {
        return { title: x }
      })

      if ($.fn.dataTable.isDataTable('#exp-logs-datatable')) {
        $('#exp-logs-datatable').DataTable().destroy();
        $('#exp-logs-datatable').empty()
        $('#exp-logs-datatable').DataTable({
          data: datatable_data,
          columns: column_header
        })
      } else {
        $('#exp-logs-datatable').DataTable({
          data: datatable_data,
          columns: column_header
        })
      }
    } else {
      keys = []
      datatable_data = []
    }

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

  relaunchExperiment(): void {
    localStorage.setItem('rl_exp_config', JSON.stringify(this.experiment.config.form_params))
    this.router.navigate(['/escher/rl'])
  }

  startIntroJS(): void {
    this.intro.start()
  }

  refreshTimeline(): void {
    if (this.experiment) {
      this.getExperimentTimeline();
      // this.getExperimentLogs();
    }
  }

  refreshData(): void {
    if (this.experiment) {
      this.getExperimentLogs()
    }
  }
}
