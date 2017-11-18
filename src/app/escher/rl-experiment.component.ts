import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Location } from "@angular/common";
import 'rxjs/add/operator/switchMap';


import { ExperimentService } from "./experiment.service";

@Component({
  selector: 'app-rl-experiment',
  templateUrl: './rl-experiment.component.html',
  styleUrls: ['./rl-experiment.component.scss'],
  providers: [ExperimentService]
})
export class RlExperimentComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private experimentService: ExperimentService,
    private router: Router
  ) { }

  experiment: any;
  experiment_id: any;

  logs: any;

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        return this.experimentService.getExperiment(params.get('exp_id'))
      })
      .subscribe(exp => {
        console.log(exp)
        // this.experiment_id = exp.id
        return this.experiment = exp
      })
  }

}
