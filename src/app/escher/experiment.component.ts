import { Component, OnInit } from '@angular/core';
import { ColorsService } from "../services/colors";
import { ExperimentService } from "./experiment.service";
import { Router } from "@angular/router";

declare var $: any;
declare var _: any;
declare var Chartist: any;

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.scss'],
  providers: [ColorsService, ExperimentService]
})
export class ExperimentComponent implements OnInit {
  
  colors: Object;
  palette: Object;
  experimentLogs: any;
  experiments: any;

  constructor(
    private colorsService: ColorsService,
    private experimentService: ExperimentService,
    private router: Router
  ) {
    const palettes = colorsService.getPalettes();
    const background = $('body').attr('data-background');
    this.colors = colorsService.getBootstrapColors();
    this.palette = palettes[background];
   }

  ngOnInit() {

    this.experimentService.getExperiments()
      .then(exps => {
        console.log(exps)
        this.experiments = exps
        setTimeout(function () {
          $(function () {
            $('#experiment-datatable').DataTable({
              "order": [[ 3, "desc" ]]
            });
          });
        }, 10);
        // $('#experiment-datatable').DataTable();
    })
  }
  getExperiments(): void {
    // var experiments;
    this.experimentService.getExperiments()
      .then(exps => {
        console.log(exps)
        this.experiments = exps
        $('#experiment-datatable').DataTable().destroy();
        setTimeout(function () {
          $(function () {
            $('#experiment-datatable').DataTable({
              "order": [[ 3, "desc" ]]
            });
          });
        }, 100);
      })
      
    // console.log(this.experiments)
  }

  launchRlExperiment(): void {
    this.router.navigate(['escher/rl'])
  }

  launchSupExperiment(): void {
    this.router.navigate(['escher/supervised'])
  }

}
