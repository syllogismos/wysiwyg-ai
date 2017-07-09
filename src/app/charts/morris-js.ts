import { Component, OnInit } from '@angular/core';
import { ColorsService } from '../services/colors';

declare var $: any;
declare var Morris: any;

@Component({
  selector: 'morris-js',
  templateUrl: '../charts/morris-js.html',
  providers: [ColorsService]
})

export class MorrisJsComponent implements OnInit {

  constructor(private colorsService: ColorsService) {

    const colors = colorsService.getBootstrapColors();
    console.log('colors', colors, colors['success']);
    const background = $('body').attr('data-background');

  }

  ngOnInit() {
    const colors = this.colorsService.getBootstrapColors();
    this.morrisArea('morris-area-example', colors);
    this.morrisLine('morris-line-example', colors);
    this.morrisDonut('morris-donut-example', colors);
    this.morrisBar('morris-bar-example', colors);

  }

  morrisArea(element: string, colors: any): void {
    const chart = Morris.Area({
      element: element,
      data: [{
        y: '2006',
        a: 100,
        b: 90
      }, {
        y: '2007',
        a: 75,
        b: 65
      }, {
        y: '2008',
        a: 50,
        b: 40
      }, {
        y: '2009',
        a: 75,
        b: 65
      }, {
        y: '2010',
        a: 50,
        b: 40
      }, {
        y: '2011',
        a: 75,
        b: 65
      }, {
        y: '2012',
        a: 100,
        b: 90
      }],
      xkey: 'y',
      ykeys: ['a', 'b'],
      //behaveLikeLine: true,
      labels: ['Series A', 'Series B'],
      lineColors: [colors.danger, colors.warning],
      lineWidth: 2,
      pointSize: 4,
      pointFillColors: [colors.danger, colors.warning],
      pointStrokeColors: [colors.danger, colors.warning],
    });
    $(window).resize(function() {
      chart.redraw();
    });
    $('body').on('toggle:collapsed', function() {
      chart.redraw();
    })
  }

  morrisLine(element: string, colors: any): void {
    const chart = Morris.Line({
      element: element,
      data: [{
        y: '2006',
        a: 100,
        b: 90
      }, {
        y: '2007',
        a: 75,
        b: 65
      }, {
        y: '2008',
        a: 50,
        b: 40
      }, {
        y: '2009',
        a: 75,
        b: 65
      }, {
        y: '2010',
        a: 50,
        b: 40
      }, {
        y: '2011',
        a: 75,
        b: 65
      }, {
        y: '2012',
        a: 100,
        b: 90
      }],
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Series A', 'Series B'],
      lineColors: [colors.danger, colors.warning],
      lineWidth: 2
    });
    $(window).resize(function() {
      chart.redraw();
    });
    $('body').on('toggle:collapsed', function() {
      chart.redraw();
    })

  }

  morrisDonut(element: string, colors: any): void {
    const chart = Morris.Donut({
      element: element,
      colors: [colors.info, colors.success],
      data: [{
        label: 'A',
        value: 12
      }, {
        label: 'B',
        value: 30
      }, {
        label: 'C',
        value: 20
      }]
    });
    $(window).resize(function() {
      chart.redraw();
    });
    $('body').on('toggle:collapsed', function() {
      chart.redraw();
    })
  }

  morrisBar(element: string, colors: any): void {
    const chart = Morris.Bar({
      element: element,
      data: [{
        y: '2006',
        a: 100,
        b: 90
      }, {
        y: '2007',
        a: 75,
        b: 65
      }, {
        y: '2008',
        a: 50,
        b: 40
      }, {
        y: '2009',
        a: 75,
        b: 65
      }, {
        y: '2010',
        a: 50,
        b: 40
      }, {
        y: '2011',
        a: 75,
        b: 65
      }, {
        y: '2012',
        a: 100,
        b: 90
      }],
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Series A', 'Series B'],
      barColors: [colors.info, colors.success],
    });
    $(window).resize(function() {
      chart.redraw();
    });
    $('body').on('toggle:collapsed', function() {
      chart.redraw();
    })
  }

}

