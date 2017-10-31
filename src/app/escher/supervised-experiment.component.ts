import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Location } from "@angular/common";
import 'rxjs/add/operator/switchMap';

import { ExperimentService } from "./experiment.service";

@Component({
  selector: 'app-supervised-experiment',
  templateUrl: './supervised-experiment.component.html',
  styleUrls: ['./supervised-experiment.component.scss'],
  providers: [ExperimentService]
})
export class SupervisedExperimentComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private experimentService: ExperimentService
  ) { }

  experiment: any;

  timeline: any = [
    {
      "class": "timeline-warning",
      "time": "10 minutes ago",
      "desc": "Manually terminated the run on Variang id: 9dfaj"
    },
    {
      "class": "timeline-info",
      "time": "15 minutes ago",
      "desc": "Max Return greater than threshold of 400 for the first time"
    },
    {
      "class": "timeline-danger",
      "time": "2 hours ago",
      "desc": "Under utilized CPU's in Variant id: 9ho50q"
    },
    {
      "class": "timeline-info",
      "time": "4 hours ago",
      "desc": "All 4 variants successfully started running on c4.8xlarge machines"
    },
    {
      "class": "timeline-info",
      "time": "8 hours ago",
      "desc": "A new supervised experiment started on model"
    }
  ]

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        return this.experimentService.getExperiment(params.get('exp_id'))
      })
      .subscribe(exp => {
        console.log(exp)
        return this.experiment = exp
      })
  }

}
