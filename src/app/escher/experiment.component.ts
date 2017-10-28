import { Component, OnInit } from '@angular/core';
import { ColorsService } from "../services/colors";

declare var $: any;
declare var _: any;
declare var Chartist: any;

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.scss'],
  providers: [ColorsService]
})
export class ExperimentComponent implements OnInit {
  
  colors: Object;
  palette: Object;
  experimentLogs: any;

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

    $.get('/assets/json/stats.json', data => {
      this.experimentLogs = data
      var mean = _.filter(this.experimentLogs.EpRewMean, (item, index) => {
        return index % 100 == 0;
      });

      var maxMean = _.filter(this.experimentLogs.EpRewMax, (item, index) => {
        return index % 100 == 0;
      })

      var iteration = _.filter(_.range(this.experimentLogs.EpLenMean.length), (item, index) => {
        return index % 100 == 0;
      })

      var pol_after = _.filter(this.experimentLogs.pol_ent_after, (item, index) => {
        return index % 100 == 0;
      })

      var pol_before = _.filter(this.experimentLogs.pol_ent_before, (item, index) => {
        return index % 100 == 0;
      })

      pol_before = _.map(pol_before, x => {
        return x + _.random(0.5)
      })
      
      this.lineChart1('#avg-return-line-chart', [mean, maxMean], iteration)
      this.lineChart1('#max-kl-line-chart', [pol_before, pol_after], iteration)
      // console.log(this.experimentLogs.EpLenMean)
    }, 'json');

    this.easyPieChart('.easy-pie-chart-primary-xs', this.colors['primary'], this.palette['borderColor'], 100);
    this.easyPieChart('.easy-pie-chart-danger-xs', this.colors['danger'], this.palette['borderColor'], 100);    
  }

  easyPieChart(element: string, barColor: string, trackColor: string, size: number): void {
    $(element).easyPieChart({
      barColor: barColor,
      size: size,
      trackColor: trackColor,
      scaleColor: false,
      animate: false,
      linewidth: 5,
      lineCap: 'square'
    })
  }

  lineChart1(element: string, series: any, labels: any): void {
    const data = {
      labels: labels,
      series: series
    };
    const options = {
      fullWidth: true,
      showArea: false
    };
    new Chartist.Line(element, data, options);
  }

}
