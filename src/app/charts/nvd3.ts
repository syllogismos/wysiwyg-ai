import { Component, OnInit } from '@angular/core';
import { ColorsService } from '../services/colors';

declare var nv: any;
declare var d3: any;

@Component({
  selector: 'nvd3',
  templateUrl: '../charts/nvd3.html',
  providers: [ColorsService]
})

export class Nvd3Component implements OnInit {

  public colors: Object;

  constructor(private colorsService: ColorsService) {
    this.colors = colorsService.getBootstrapColors();
    console.log(this.colors);
  }

  ngOnInit() {
    this.nvd3Bar1('#nvd3-bar-1 svg', this.colors);
    this.nvd3Bar2('#nvd3-bar-2 svg', this.colors);
    this.nvd3Pie1('#nvd3-pie svg', this.colors);
    this.nvd3Donut1('#nvd3-donut svg', this.colors);
    this.nvd3HorizontalBar1('#nvd3-horizontal-bar-1 svg', this.colors);
    this.nvd3HorizontalBar2('#nvd3-horizontal-bar-2 svg', this.colors);
    this.nvd3Line1('#nvd3-line-1 svg', this.colors);
    this.nvd3Line2('#nvd3-line-2 svg', this.colors);
    this.nvd3Scatter1('#nvd3-scatter svg', this.colors);
  }

  generateBarChartData(key: any, total: number): Object {
    const values = [];
    const min = 0;
    const max = 100;
    for (let i = 0; i < total; i++) {
      values.push({
        x: i,
        y: Math.floor(Math.random() * (max - min + 1)) + min
      });
    }
    return {
      key: key,
      values: values
    };
  }

  generatePieChartData(label: any, value: any, color: any): Object {
    return {
      label: label,
      value: value,
      color: color
    };
  }

  generateMultiBarHorizontalChartData1(key: any, color: any, total: number): Object {
    const values = [];
    const min = 0;
    const max = 100;
    for (let i = 0; i < total; i++) {
      values.push({
        label: 'Group ' + i,
        value: (Math.floor(Math.random() * (max - min + 1)) + min) * (i % 3 == 0 ? 1 : -1)
      });
    }
    return {
      key: key,
      color: color,
      values: values
    };
  }

  generateMultiBarHorizontalChartData2(key: any, color: any, total: number): Object {
    const values = [];
    const min = 0;
    const max = 100;
    for (let i = 0; i < total; i++) {
      values.push({
        label: 'Group ' + i,
        value: (Math.floor(Math.random() * (max - min + 1)) + min)
      });
    }
    return {
      key: key,
      color: color,
      values: values
    };
  }

  nvd3Bar1(element: string, colors: Object): void {
    const data = [
      this.generateBarChartData('Stream #0', 20),
      this.generateBarChartData('Stream #1', 20),
      this.generateBarChartData('Stream #2', 20)
    ];

    const self = this;
    nv.addGraph(function() {
      const chart = nv.models.multiBarChart()
        .reduceXTicks(true)
        .rotateLabels(0)
        .showControls(false)
        .groupSpacing(0)
        .color([self.colors['primary'], self.colors['secondary'], self.colors['info']]);
      chart.xAxis
        .tickFormat(d3.format(',f'));
      chart.yAxis
        .tickFormat(d3.format(',.1f'));
      d3.select(element)
        .datum(data)
        .call(chart);
      nv.utils.windowResize(chart.update);
      return chart;
    });

  }

  nvd3Bar2(element: string, colors: Object): void {
    const data = [
      this.generateBarChartData('Stream #0', 40),
      this.generateBarChartData('Stream #1', 40),
      this.generateBarChartData('Stream #2', 40)
    ];

    const self = this;
    nv.addGraph(function() {
      const chart = nv.models.multiBarChart()
        .reduceXTicks(true)
        .rotateLabels(0)
        .showControls(false)
        .groupSpacing(0.1)
        .stacked(true)
        .color([self.colors['danger'], self.colors['warning'], self.colors['success']]);
      chart.xAxis
        .tickFormat(d3.format(',f'));
      chart.yAxis
        .tickFormat(d3.format(',.1f'));
      d3.select(element)
        .datum(data)
        .call(chart);
      nv.utils.windowResize(chart.update);
      return chart;
    });
  }

  nvd3Pie1(element: string, colors: Object): void {

    const self = this;
    const data = [
      this.generatePieChartData('A', 30, self.colors['danger']),
      this.generatePieChartData('B', 45, self.colors['success']),
      this.generatePieChartData('C', 20, self.colors['warning'])
    ];
    nv.addGraph(function() {
      const chart = nv.models.pieChart()
        .x(function(d: any): any {
          return d.label;
        })
        .y(function(d: any): any {
          return d.value;
        })
        .showLegend(false)
        .showLabels(true);
      d3.select(element)
        .datum(data)
        .transition()
        .duration(350)
        .call(chart);
      return chart;
    });
  }

  nvd3Donut1(element: string, colors: Object): void {

    const self = this;

    const data = [
      this.generatePieChartData('A', 20, self.colors['primary']),
      this.generatePieChartData('B', 35, self.colors['warning']),
      this.generatePieChartData('C', 40, self.colors['info']),
      this.generatePieChartData('D', 10, self.colors['success'])
    ];

    nv.addGraph(function() {
      const chart = nv.models.pieChart()
        .x(function(d: any): any {
          return d.label;
        })
        .y(function(d: any): any {
          return d.value;
        })
        .showLabels(true)
        .showLegend(false)
        .labelThreshold(0.05)
        .labelType('percent')
        .donut(true)
        .donutRatio(0.35);
      d3.select(element)
        .datum(data)
        .transition()
        .duration(350)
        .call(chart);
      return chart;
    });
  }

  nvd3HorizontalBar1(element: string, colors: Object): void {

    const self = this;
    const data = [
      this.generateMultiBarHorizontalChartData1('Series 1', self.colors['success'], 10),
      this.generateMultiBarHorizontalChartData1('Series 2', self.colors['danger'], 10)
    ];
    nv.addGraph(function() {
      const chart = nv.models.multiBarHorizontalChart()
        .x(function(d: any): any {
          return d.label;
        })
        .y(function(d: any): any {
          return d.value;
        })
        .margin({
          top: 30,
          right: 20,
          bottom: 50,
          left: 175
        })
        .showValues(true)
        .showControls(true);
      chart.yAxis
        .tickFormat(d3.format(',.2f'));
      d3.select(element)
        .datum(data)
        .call(chart);
      nv.utils.windowResize(chart.update);
      return chart;
    });

  }

  nvd3HorizontalBar2(element: string, colors: Object): void {

    const self = this;
    const data = [
      this.generateMultiBarHorizontalChartData2('Series 1', self.colors['primary'], 10),
      this.generateMultiBarHorizontalChartData2('Series 2', self.colors['secondary'], 10)
    ];

    nv.addGraph(function() {
      const chart = nv.models.multiBarHorizontalChart()
        .x(function(d: any): any {
          return d.label;
        })
        .y(function(d: any): any {
          return d.value;
        })
        .margin({
          top: 30,
          right: 20,
          bottom: 50,
          left: 175
        })
        .stacked(true)
        .showValues(true)
        .showControls(true);
      chart.yAxis
        .tickFormat(d3.format(',.2f'));
      d3.select(element)
        .datum(data)
        .call(chart);
      nv.utils.windowResize(chart.update);
      return chart;
    });

  }

  generateLineChartData(key: any, total: number, area: any): Object {
    const values = [];
    const min = 0;
    const max = 100;
    for (let i = 0; i < total; i++) {
      values.push({
        x: i,
        y: (Math.floor(Math.random() * (max - min + 1)) + min)
      });
    }
    return {
      area: area,
      key: key,
      values: values
    };
  }

  generateScatterChartData(key: any, total: number): Object {
    const values = [];
    const min = 0;
    const max = 100;
    for (let i = 0; i < total; i++) {
      values.push({
        x: i,
        shape: 'circle',
        y: (Math.floor(Math.random() * (max - min + 1)) + min),
        size: (Math.floor(Math.random() * (100 - 30 + 1)) + 30) / 100
      });
    }
    return {
      key: key,
      values: values
    };
  }

  nvd3Line1(element: string, colors: Object): void {
    const data = [
      this.generateLineChartData('Series 1', 40, false),
      this.generateLineChartData('Series 2', 40, false),
    ];

    const self = this;
    nv.addGraph(function() {
      const chart = nv.models.lineChart()
        .useInteractiveGuideline(true)
        .showLegend(false)
        .color([self.colors['primary'], self.colors['secondary']])
        //.forceY([0, 1])
        .showYAxis(true)
        .showXAxis(true);
      chart.xAxis
        .axisLabel('Time (ms)')
        .tickFormat(d3.format(',r'));
      chart.yAxis
        .axisLabel('Voltage (v)')
        .tickFormat(d3.format('.02f'));
      d3.select(element)
        .datum(data)
        .call(chart);
      nv.utils.windowResize(function() {
        chart.update();
      });
      return chart;
    });

  }

  nvd3Line2(element: string, colors: Object): void {
    const data = [
      this.generateLineChartData('Series 1', 40, true),
      this.generateLineChartData('Series 2', 40, true),
    ];

    const self = this;

    nv.addGraph(function() {
      const chart = nv.models.lineChart()
        .useInteractiveGuideline(true)
        .showLegend(true)
        .showYAxis(true)
        //.forceY([-1.5, 1.5])
        .color([self.colors['warning'], self.colors['danger']])
        .showXAxis(true);
      chart.xAxis
        .axisLabel('Time (ms)')
        .tickFormat(d3.format(',r'));
      chart.yAxis
        .axisLabel('Voltage (v)')
        .tickFormat(d3.format('.02f'));
      d3.select(element)
        .datum(data)
        .call(chart);
      nv.utils.windowResize(function() {
        chart.update();
      });
      return chart;
    });
  }

  nvd3Scatter1(element: string, colors: Object): void {
    const data = [
      this.generateScatterChartData('Series 1', 40)
    ];

    const self = this;
    nv.addGraph(function() {
      const chart = nv.models.scatterChart()
        .showDistX(false)
        .showDistY(false)
        .showLegend(false)
        .color([self.colors['primary']]);
      chart.xAxis.tickFormat(d3.format('.01f'));
      chart.yAxis.tickFormat(d3.format('.01f'));
      d3.select(element)
        .datum(data)
        .call(chart);
      nv.utils.windowResize(chart.update);
      return chart;
    });

  }
}

