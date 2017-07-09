import { Component, OnInit } from '@angular/core';
import { ColorsService } from '../services/colors';

declare var $: any;

@Component({
  selector: 'donut-chart-widgets',
  templateUrl: '../widgets/donut-chart-widgets.html',
  providers: [ColorsService]
})

export class DonutChartWidgetsComponent implements OnInit {

  public colors: Object;
  public palette: Object;

  constructor(private colorsService: ColorsService) {
    this.colors = colorsService.getBootstrapColors();
    this.palette = colorsService.getPalette();
  }

  ngOnInit() {

    let self = this;
    self.peityDonut1('#donut-chart-1', 120, [self.palette['border-color'], self.colors['info']]);
    self.peityDonut1('#donut-chart-2', 120, [self.palette['border-color'], self.colors['success']]);
    self.peityDonut1('#donut-chart-3', 120, [self.palette['border-color'], self.colors['warning']]);
    self.peityDonut1('#donut-chart-5', 120, [self.palette['border-color'], self.colorsService.darken(self.colors['danger'], 20)]);
    let onResizeEnd = () => {
      self.peityDonut1('#donut-chart-1', 120, [self.palette['border-color'], self.colors['info']]);
      self.peityDonut1('#donut-chart-2', 120, [self.palette['border-color'], self.colors['success']]);
      self.peityDonut1('#donut-chart-3', 120, [self.palette['border-color'], self.colors['warning']]);
      self.peityDonut1('#donut-chart-5', 120, [self.palette['border-color'], self.colorsService.darken(self.colors['danger'], 20)]);
      $('body').trigger('changed:background');
    }

    let resizeTimeout;
    $(window).on('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(onResizeEnd, 500);
    });

    $('body').on('toggle:collapsed', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(onResizeEnd, 500);
    })
  }

  peityDonut1(element: string, radius: number, colors: any): void {
    $(element).peity('donut', {
      width: radius,
      height: radius,
      radius: radius,
      fill: colors
    });
  }
}

