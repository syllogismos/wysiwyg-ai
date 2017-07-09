import { Component, OnInit } from '@angular/core';
import { ColorsService } from '../services/colors';

declare var $: any;

@Component({
  selector: 'peity',
  templateUrl: '../charts/peity.html',
  providers: [ColorsService]
})

export class PeityComponent implements OnInit {

  public colors: Object;
  public palette: Object;

  constructor(private colorsService: ColorsService) {
    this.colors = colorsService.getBootstrapColors();
    const palettes = colorsService.getPalettes();
    const background = $('body').attr('data-background');
    this.palette = palettes[background];
    $.fn.peity.defaults.pie = {
      delimiter: null,
      fill: [this.colors['primary'], this.colors['secondary'], this.colors['info']],
      height: null,
      radius: 8,
      width: null
    };
    $.fn.peity.defaults.donut = {
      delimiter: null,
      fill: [this.colors['primary'], this.colors['secondary'], this.colors['info']],
      height: null,
      innerRadius: null,
      radius: 8,
      width: null
    };
    $.fn.peity.defaults.line = {
      delimiter: ',',
      fill: this.colors['primary'],
      height: 16,
      max: null,
      min: 0,
      stroke: this.colors['primary'],
      strokeWidth: 1,
      width: 32
    };
    $.fn.peity.defaults.bar = {
      delimiter: ',',
      fill: [this.colors['primary']],
      height: 16,
      max: null,
      min: 0,
      padding: 0.1,
      width: 32
    };

  }

  ngOnInit() {
    this.peityLine('.medium-line-1', 32, 96, this.colors['primary']);
    this.peityLine('.medium-line-2', 32, 96, this.colors['secondary']);
    this.peityLine('.medium-line-3', 32, 96, this.colors['info']);
    this.peityLine('.medium-line-4', 32, 96, this.colors['success']);
    this.peityLine('.medium-line-5', 32, 96, this.colors['warning']);
    this.peityLine('.medium-line-6', 32, 96, this.colors['danger']);

    this.peityArea('.medium-area-1', 32, 96, this.colors['primary']);
    this.peityArea('.medium-area-2', 32, 96, this.colors['secondary']);
    this.peityArea('.medium-area-3', 32, 96, this.colors['info']);
    this.peityArea('.medium-area-4', 32, 96, this.colors['success']);
    this.peityArea('.medium-area-5', 32, 96, this.colors['warning']);
    this.peityArea('.medium-area-6', 32, 96, this.colors['danger']);

    this.peityBar('.medium-bar-1', 32, 96, this.colors['primary']);
    this.peityBar('.medium-bar-2', 32, 96, this.colors['secondary']);
    this.peityBar('.medium-bar-3', 32, 96, this.colors['info']);
    this.peityBar('.medium-bar-4', 32, 96, this.colors['success']);
    this.peityBar('.medium-bar-5', 32, 96, this.colors['warning']);
    this.peityBar('.medium-bar-6', 32, 96, this.colors['danger']);

    this.peityPie('.medium-pie-1', 64, [this.palette['border-color'], this.colors['primary']]);
    this.peityPie('.medium-pie-2', 64, [this.palette['border-color'], this.colors['secondary']]);
    this.peityPie('.medium-pie-3', 64, [this.palette['border-color'], this.colors['info']]);
    this.peityPie('.medium-pie-4', 64, [this.palette['border-color'], this.colors['success']]);
    this.peityPie('.medium-pie-5', 64, [this.palette['border-color'], this.colors['warning']]);
    this.peityPie('.medium-pie-6', 64, [this.palette['border-color'], this.colors['danger']]);

    this.peityDonut('.medium-donut-1', 64, [this.palette['border-color'], this.colors['primary']]);
    this.peityDonut('.medium-donut-2', 64, [this.palette['border-color'], this.colors['secondary']]);
    this.peityDonut('.medium-donut-3', 64, [this.palette['border-color'], this.colors['info']]);
    this.peityDonut('.medium-donut-4', 64, [this.palette['border-color'], this.colors['success']]);
    this.peityDonut('.medium-donut-5', 64, [this.palette['border-color'], this.colors['warning']]);
    this.peityDonut('.medium-donut-6', 64, [this.palette['border-color'], this.colors['danger']]);

  }

  peityDonut(element: string, radius: number, colors: any): void {
    return $(element).peity('donut', {
      width: radius,
      radius: radius,
      fill: colors
    });
  }

  peityPie(element: string, radius: number, colors: any): void {
    return $(element).peity('pie', {
      height: radius,
      width: radius,
      radius: radius,
      fill: colors
    });
  }

  peityBar(element: string, height: number, width: number, color: any): void {
    return $(element).peity('bar', {
      height: height,
      width: width,
      fill: [color]
    });
  }

  peityLine(element: string, height: number, width: number, stroke: any): void {
    return $(element).peity('line', {
      height: height,
      width: width,
      stroke: stroke,
      fill: 'transparent'
    });
  }

  peityArea(element: string, height: number, width: number, color: any): void {
    return $(element).peity('line', {
      height: height,
      width: width,
      stroke: color,
      fill: color
    });
  }
}
