import { Component, OnInit } from '@angular/core';
import { ColorsService } from '../services/colors';

declare var $: any;

@Component({
  selector: 'area-chart-widgets',
  templateUrl: '../widgets/area-chart-widgets.html',
  providers: [ColorsService]
})

export class AreaChartWidgetsComponent implements OnInit {

  public colors: Object;

  constructor(private colorsService: ColorsService) {
    this.colors = colorsService.getBootstrapColors();
  }

  ngOnInit() {

    let self = this;
    self.peityArea1('#area-chart-1', 75, self.colors['info']);
    self.peityArea1('#area-chart-2', 75, self.colors['success']);
    self.peityArea1('#area-chart-3', 60, self.colors['warning']);
    self.peityArea1('#area-chart-5', 60, self.colorsService.lighten(self.colors['info'], 20));
    self.peityArea1('#area-chart-4', 80, self.colors['danger']);
    self.peityArea1('#area-chart-6', 80, self.colorsService.darken(self.colors['success'], 20));
    self.peityArea1('#area-chart-7', 70, self.colors['info']);
    self.peityArea1('#area-chart-8', 70, self.colorsService.lighten(self.colors['danger'], 20));
    let onResizeEnd = () => {
      self.peityArea1('#area-chart-1', 75, self.colors['info']);
      self.peityArea1('#area-chart-2', 75, self.colors['success']);
      self.peityArea1('#area-chart-3', 60, self.colors['warning']);
      self.peityArea1('#area-chart-5', 60, self.colorsService.lighten(self.colors['info'], 20));
      self.peityArea1('#area-chart-4', 80, self.colors['danger']);
      self.peityArea1('#area-chart-6', 80, self.colorsService.darken(self.colors['success'], 20));
      self.peityArea1('#area-chart-7', 70, self.colors['info']);
      self.peityArea1('#area-chart-8', 70, self.colorsService.lighten(self.colors['danger'], 20));
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

  peityArea1(element: string, height: number, color: any): void {
    $(element).peity('line', {
      height: height,
      width: '100%',
      stroke: color,
      fill: color
    });
  }
}

