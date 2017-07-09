import { Component, OnInit } from '@angular/core';
import { ColorsService } from '../services/colors';

declare var $: any;

@Component({
  selector: 'line-chart-widgets',
  templateUrl: '../widgets/line-chart-widgets.html',
  providers: [ColorsService]
})

export class LineChartWidgetsComponent implements OnInit {

  public colors: Object;

  constructor(private colorsService: ColorsService) {
    this.colors = colorsService.getBootstrapColors();
  }

  ngOnInit() {

    let self = this;
    self.peityLine1('#line-chart-1', 75, self.colors['info']);
    self.peityLine1('#line-chart-2', 75, self.colors['success']);
    self.peityLine1('#line-chart-3', 60, self.colors['warning']);
    self.peityLine1('#line-chart-5', 60, self.colorsService.lighten(self.colors['info'], 30));
    self.peityLine1('#line-chart-4', 80, self.colors['danger']);
    self.peityLine1('#line-chart-6', 80, self.colorsService.lighten(self.colors['success'], 30));
    self.peityLine1('#line-chart-7', 70, self.colors['info']);
    self.peityLine1('#line-chart-8', 70, self.colorsService.lighten(self.colors['danger'], 30));
    let onResizeEnd = () => {
      self.peityLine1('#line-chart-1', 75, self.colors['info']);
      self.peityLine1('#line-chart-2', 75, self.colors['success']);
      self.peityLine1('#line-chart-3', 60, self.colors['warning']);
      self.peityLine1('#line-chart-5', 60, self.colorsService.lighten(self.colors['info'], 30));
      self.peityLine1('#line-chart-4', 80, self.colors['danger']);
      self.peityLine1('#line-chart-6', 80, self.colorsService.lighten(self.colors['success'], 30));
      self.peityLine1('#line-chart-7', 70, self.colors['info']);
      self.peityLine1('#line-chart-8', 70, self.colorsService.lighten(self.colors['danger'], 30));
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

  peityLine1(element: string, height: number, color: any): void {
    $(element).peity('line', {
      height: height,
      width: '100%',
      stroke: color,
      strokeWidth: 2,
      fill: 'transparent'
    });
  }
}

