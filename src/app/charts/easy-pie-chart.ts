import { Component, OnInit } from '@angular/core';
import { ColorsService } from '../services/colors';

declare var $: any;

@Component({
  selector: 'easy-pie-chart',
  templateUrl: '../charts/easy-pie-chart.html',
  providers: [ColorsService]
})

export class EasyPieChartComponent implements OnInit {

  colors: Object;
  palette: Object;

  constructor(private colorsService: ColorsService) {
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

  ngOnInit() {
    this.easyPieChart('.easy-pie-chart-primary-xs', this.colors['primary'], this.palette['borderColor'], 100);
    this.easyPieChart('.easy-pie-chart-primary-md', this.colors['primary'], this.palette['borderColor'], 150);
    this.easyPieChart('.easy-pie-chart-primary-lg', this.colors['primary'], this.palette['borderColor'], 200);
    this.easyPieChart('.easy-pie-chart-secondary-xs', this.colors['secondary'], this.palette['borderColor'], 100);
    this.easyPieChart('.easy-pie-chart-secondary-md', this.colors['secondary'], this.palette['borderColor'], 150);
    this.easyPieChart('.easy-pie-chart-secondary-lg', this.colors['secondary'], this.palette['borderColor'], 200);
    this.easyPieChart('.easy-pie-chart-info-xs', this.colors['info'], this.palette['borderColor'], 100);
    this.easyPieChart('.easy-pie-chart-info-md', this.colors['info'], this.palette['borderColor'], 150);
    this.easyPieChart('.easy-pie-chart-info-lg', this.colors['info'], this.palette['borderColor'], 200);
    this.easyPieChart('.easy-pie-chart-success-xs', this.colors['success'], this.palette['borderColor'], 100);
    this.easyPieChart('.easy-pie-chart-success-md', this.colors['success'], this.palette['borderColor'], 150);
    this.easyPieChart('.easy-pie-chart-success-lg', this.colors['success'], this.palette['borderColor'], 200);
    this.easyPieChart('.easy-pie-chart-warning-xs', this.colors['warning'], this.palette['borderColor'], 100);
    this.easyPieChart('.easy-pie-chart-warning-md', this.colors['warning'], this.palette['borderColor'], 150);
    this.easyPieChart('.easy-pie-chart-warning-lg', this.colors['warning'], this.palette['borderColor'], 200);
    this.easyPieChart('.easy-pie-chart-danger-xs', this.colors['danger'], this.palette['borderColor'], 100);
    this.easyPieChart('.easy-pie-chart-danger-md', this.colors['danger'], this.palette['borderColor'], 150);
    this.easyPieChart('.easy-pie-chart-danger-lg', this.colors['danger'], this.palette['borderColor'], 200);
  }

  easyPieChart(element: string, barColor: string, trackColor: string, size: number): void {
    $(element).easyPieChart({
      barColor: barColor,
      size: size,
      trackColor: trackColor,
      scaleColor: false,
      animate: true,
      lineWidth: 10,
      lineCap: 'square',
    });
  }
}

