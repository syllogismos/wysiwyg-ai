import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Location } from "@angular/common";
import 'rxjs/add/operator/switchMap';
import { Http, Headers } from "@angular/http";


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
    private router: Router,
    private http: Http
  ) { }

  experiment: any;
  experiment_id: any;

  experiment_logs: any;

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

  getExperimentLogs(): void {
    this.http.post('/elastic/getExperimentLogs', {
      exp_id: this.experiment._id
    }).toPromise()
      .then(response => {
        console.log('right after querying elastic')
      })
      .catch(this.handleHttpError)
  }

  private handleHttpError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
