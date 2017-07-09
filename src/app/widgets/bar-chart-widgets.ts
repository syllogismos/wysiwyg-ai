import { Component, OnInit } from '@angular/core';
import { ColorsService } from '../services/colors';

declare var $: any;

@Component({
  selector: 'bar-chart-widgets',
  templateUrl: '../widgets/bar-chart-widgets.html',
  providers: [ColorsService]
})

export class BarChartWidgetsComponent implements OnInit {

  public colors: Object;

  constructor(private colorsService: ColorsService) {
    this.colors = colorsService.getBootstrapColors();
  }

  ngOnInit() {

    let self = this;
    self.peityBar1('#bar-chart-1', 75, self.colors['info']);
    self.peityBar1('#bar-chart-2', 75, self.colors['success']);
    self.peityBar1('#bar-chart-3', 60, self.colors['warning']);
    self.peityBar1('#bar-chart-5', 60, self.colorsService.lighten(self.colors['info'], 20));
    self.peityBar1('#bar-chart-4', 80, self.colors['danger']);
    self.peityBar1('#bar-chart-6', 80, self.colorsService.darken(self.colors['success'], 20));
    self.peityBar1('#bar-chart-7', 70, self.colors['info']);
    self.peityBar1('#bar-chart-8', 70, self.colorsService.lighten(self.colors['danger'], 20));
    let onResizeEnd = () => {
      self.peityBar1('#bar-chart-1', 75, self.colors['info']);
      self.peityBar1('#bar-chart-2', 75, self.colors['success']);
      self.peityBar1('#bar-chart-3', 60, self.colors['warning']);
      self.peityBar1('#bar-chart-5', 60, self.colorsService.lighten(self.colors['info'], 20));
      self.peityBar1('#bar-chart-4', 80, self.colors['danger']);
      self.peityBar1('#bar-chart-6', 80, self.colorsService.darken(self.colors['success'], 20));
      self.peityBar1('#bar-chart-7', 70, self.colors['info']);
      self.peityBar1('#bar-chart-8', 70, self.colorsService.lighten(self.colors['danger'], 20));
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

  peityBar1(element: string, height: number, color: any): void {
    $(element).peity('bar', {
      height: height,
      width: '100%',
      fill: [color]
    });
  }
}

