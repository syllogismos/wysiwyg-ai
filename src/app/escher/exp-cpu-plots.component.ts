import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Http } from "@angular/http";

import { ISubscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Rx";

declare var $: any;
declare var _: any;
declare var nv: any;
declare var d3: any;
declare var moment: any;

@Component({
  selector: 'app-exp-cpu-plots',
  // inputs: ['experiment'],
  templateUrl: './exp-cpu-plots.component.html',
  styleUrls: ['./exp-cpu-plots.component.scss']
})
export class ExpCpuPlotsComponent implements OnInit, OnDestroy {
  
  @Input() experiment
  hits: any
  selectedMetric: any = "CPU"
  metrics: any = ["CPU", "Load", "Memory"]
  variants: any = [0]

  private subscription: ISubscription

  constructor(
    private http: Http
  ) { }

  ngOnInit() {
    this.subscription = Observable.interval(1000*60*5).subscribe(() => this.refreshData())
    this.getSystemStats()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // throw new Error("Method not implemented.");
  }

  refreshData(): void {
    this.getSystemStats()
  }

  modifyD3Table(met: String): void {
    console.log(met)
    var metrics = []
    var metric
    var legend_keys = []
    for (let variant of this.variants) {
      legend_keys.push('Variant: ' + variant)
      metric = _.filter(this.hits, x => x._source.fields.variant == variant)
      switch (met) {
        case "CPU": {
          metric = _.filter(metric, x => x._source.metricset.name == 'cpu')
          metric = _.map(metric, x => x._source.system.cpu.user.pct)
          break
        }
        case "Load": {
          metric = _.filter(metric, x => x._source.metricset.name == 'load')
          metric = _.map(metric, x => x._source.system.load.norm[1])
          break
        }
        case "Memory": {
          metric = _.filter(metric, x => x._source.metricset.name == 'memory')
          metric = _.map(metric, x => x._source.system.memory.used.pct)
          break
        }
        default: {
          break
        }  
          
      }
      // metric = _.filter(metric, x => x._source.metricset.name == 'cpu')
      // metric = _.map(metric, x => x._source.system.cpu.user.pct)
      metrics.push(metric)
    }

    this.selectedMetric = met

    this.nvD3Line1('#nvd3-system svg', legend_keys, metrics, 'Time', met)
  }

  getSystemStats(): void {
    this.http.post('/elastic/getSystemStats', {
      exp_id: this.experiment
    }).toPromise()
      .then(response => {
        var hits = response.json().body.hits
        this.hits = _.sortBy(hits, x => {
          return new Date(x._source['@timestamp'])
        })
        console.log(this.hits)
        var variants = new Set(_.map(this.hits, x => x._source.fields.variant))
        this.variants = _.sortBy(Array.from(variants), x => x)
        this.modifyD3Table(this.selectedMetric)
      })
      .catch(this.handleHttpError)
  }

  private handleHttpError(error: any): Promise<any> {
    console.error('An error occurred http error', error);
    return Promise.reject(error.message || error)
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
  nvD3Line1(element: string, key: any, values: any, x_label: any, y_label: any): void {
    // const data = [
    //   this.generateLineChartData(key, values, false)
    // ]
    const data = _.map(_.zip(key, values), item => this.generateLineChartData(item[0], item[1], false))
    const self = this

    nv.addGraph(function () {
      const chart = nv.models.lineWithFocusChart()
        .useInteractiveGuideline(true)
        .showLegend(true)
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
}
