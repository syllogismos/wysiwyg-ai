import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Location } from "@angular/common";
import { ColorsService } from "../services/colors";
import 'rxjs/add/operator/switchMap';
import { Http, Headers } from "@angular/http";


import { ExperimentService } from "./experiment.service";

declare var $: any;
declare var _: any;
declare var Chartist: any;

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
        var hits = _.map(response.json().body.hits, x => {
          return x._source.json.rl_log;
        })
        console.log(hits)
        // var iteration = _.map(hits, x => x.Iteration)
        var iteration = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        var avgReward = _.map(hits, x => x.AverageReturn)
        var meankl = _.map(hits, x => x.Entropy)
        this.lineChart1('#avg-return-line-chart', [avgReward], iteration)
        this.lineChart1('#max-kl-line-chart', [meankl], iteration)
        var keys;
        var datatable_data;
        if (hits.length > 0) {
          keys = _.difference(Object.keys(hits[0]), ['Iteration'])
          keys = ['Iteration'].concat(keys)
          keys = ['Iteration', 'MeanKL', 'AverageReturn', 'Entropy', 'MeanLength', 'NumTrajs', 'ExplainedVariance', 'Time']
          console.log(keys)
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

}
