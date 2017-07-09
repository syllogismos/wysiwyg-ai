import { Component, OnInit } from '@angular/core';

declare var Chartist: any;

@Component({
  selector: 'chartist',
  templateUrl: '../charts/chartist.html'
})

export class ChartistComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    this.barChart1('#bar-chart-1');
    this.barChart2('#bar-chart-2');
    this.barChart3('#bar-chart-3');
    this.barChart4('#bar-chart-4');
    this.lineChart1('#line-chart-1');
    this.lineChart2('#line-chart-2');
    this.donutChart1('#donut-chart-1');
    this.donutChart2('#donut-chart-2');
    this.pieChart1('#pie-chart-1');
    this.pieChart2('#pie-chart-2');
    this.scatterChart1('#scatter-chart-1');
  }

  pieChart1(element: string): void {
    const data = {
      labels: ['Bananas', 'Apples', 'Grapes'],
      series: [20, 15, 40]
    };
    const options = {
      labelInterpolationFnc: function(value: any): any {
        return value[0];
      }
    };
    const responsiveOptions = [
      ['screen and (min-width: 640px)', {
        chartPadding: 30,
        labelOffset: 100,
        labelDirection: 'explode',
        labelInterpolationFnc: function(value: any): any {
          return value;
        }
      }],
      ['screen and (min-width: 1024px)', {
        labelOffset: 80,
        chartPadding: 20
      }]
    ];
    new Chartist.Pie(element, data, options, responsiveOptions);
  }

  donutChart2(element: string): void {
    const data = {
      series: [20, 10, 30, 40]
    };
    const options = {
      donut: true,
      donutWidth: 60,
      startAngle: 270,
      total: 200,
      showLabel: false
    };
    new Chartist.Pie(element, data, options);
  }

  lineChart1(element: string): void {
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      series: [
        [1000, 1200, 1300, 1200, 1440, 1800, 1500],
        [1600, 1550, 1497, 1440, 1200, 1000, 1400],
      ]
    };
    const options = {
      fullWidth: true,
      showArea: false
    };
    new Chartist.Line(element, data, options);
  }

  pieChart2(element: string): void {
    const data = {
      series: [20, 10, 30, 40]
    };
    new Chartist.Pie(element, data);
  }

  donutChart1(element: string): void {
    const data = {
      series: [20, 10, 30, 40]
    };
    const options = {
      donut: true
    };
    new Chartist.Pie(element, data, options);
  }

  scatterChart1(element: string): void {
    const times = function(n: number) {
      return Array.apply(null, new Array(n));
    };
    const data = times(52).map(Math.random).reduce(function(data: any, rnd: any, index: any): any {
      data.labels.push(index + 1);
      data.series.forEach(function(series) {
        series.push(Math.random() * 100);
      });
      return data;
    }, {
        labels: [],
        series: times(4).map(function() {
          return [];
        })
      });
    const options = {
      showLine: false,
      axisX: {
        labelInterpolationFnc: function(value: number, index: number): any {
          return index % 13 === 0 ? 'W' + value : null;
        }
      }
    };
    const responsiveOptions = [
      ['screen and (min-width: 640px)', {
        axisX: {
          labelInterpolationFnc: function(value: any, index: any): any {
            return index % 4 === 0 ? 'W' + value : null;
          }
        }
      }]
    ];
    new Chartist.Line(element, data, options, responsiveOptions);
  }

  lineChart2(element: string): void {
    const data = {
      labels: [1, 2, 3, 4, 5, 6, 7, 8],
      series: [
        [1, 2, 3, 1, -2, 0, 1, 0],
        [-2, -1, -2, -1, -2.5, -1, -2, -1],
        [0, 0, 0, 1, 2, 2.5, 2, 1],
        [2.5, 2, 1, 0.5, 1, 0.5, -1, -2.5]
      ]
    };
    const options = {
      high: 3,
      low: -3,
      showArea: true,
      showLine: false,
      showPoint: false,
      fullWidth: true,
      axisX: {
        showLabel: false,
        showGrid: false
      }
    };
    new Chartist.Line(element, data, options);
  }

  barChart4(element: string): void {
    const data = {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
      series: [
        [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
      ]
    };
    const options = {
      high: 10,
      low: -10,
      axisX: {
        labelInterpolationFnc: function(value: any, index: any): any {
          return index % 2 === 0 ? value : null;
        }
      }
    };
    new Chartist.Bar(element, data, options);
  }

  barChart3(element: string): void {
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
        [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
      ]
    };
    const options = {
      seriesBarDistance: 10
    };
    const responsiveOptions = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function(value: any): any {
            return value[0];
          }
        }
      }]
    ];
    new Chartist.Bar(element, data, options, responsiveOptions);
  }

  barChart1(element: string): void {
    const data = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      series: [
        [800000, 1200000, 1400000, 1300000],
        [200000, 400000, 500000, 300000],
        [100000, 200000, 400000, 600000]
      ]
    };
    const options = {
      stackBars: true,
      axisY: {
        labelInterpolationFnc: function(value: any): any {
          return (value / 1000) + 'k';
        }
      }
    };
    const chart = Chartist.Bar(element, data, options);
    chart.on('draw', function(data: any): any {
      if (data.type === 'bar') {
        data.element.attr({
          style: 'stroke-width: 40px'
        });
      }
    });
  }

  barChart2(element: string): void {
    const data = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      series: [
        [5, 4, 3, 7, 5, 10, 3],
        [3, 2, 9, 5, 4, 6, 4]
      ]
    };
    const options = {
      seriesBarDistance: 10,
      reverseData: true,
      horizontalBars: true,
      axisY: {
        offset: 70
      }
    };
    new Chartist.Bar(element, data, options);
  }
}

