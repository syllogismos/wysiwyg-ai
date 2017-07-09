import { Component, OnInit } from '@angular/core';
import { ColorsService } from '../services/colors';

declare var $: any;

@Component({
  selector: 'pie-chart-widgets',
  templateUrl: '../widgets/pie-chart-widgets.html',
  providers: [ColorsService]
})

export class PieChartWidgetsComponent implements OnInit {

  public colors: Object;
  public palette: Object;

  constructor(private colorsService: ColorsService) {
    this.colors = colorsService.getBootstrapColors();
    this.palette = colorsService.getPalette();
  }

  ngOnInit() {

    let self = this;
    self.peityPie1('#pie-chart-1', 120, [self.palette['border-color'], self.colors['info']]);
    self.peityPie1('#pie-chart-2', 120, [self.palette['border-color'], self.colors['success']]);
    self.peityPie1('#pie-chart-3', 120, [self.palette['border-color'], self.colors['warning']]);
    self.peityPie1('#pie-chart-5', 120, [self.palette['border-color'], self.colorsService.darken(self.colors['danger'], 20)]);
    let onResizeEnd = () => {
      self.peityPie1('#pie-chart-1', 120, [self.palette['border-color'], self.colors['info']]);
      self.peityPie1('#pie-chart-2', 120, [self.palette['border-color'], self.colors['success']]);
      self.peityPie1('#pie-chart-3', 120, [self.palette['border-color'], self.colors['warning']]);
      self.peityPie1('#pie-chart-5', 120, [self.palette['border-color'], self.colorsService.darken(self.colors['danger'], 20)]);
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

  peityPie1(element: string, radius: number, colors: any): void {
    $(element).peity('pie', {
      width: radius,
      height: radius,
      radius: radius,
      fill: colors
    });
  }
}

