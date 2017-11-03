import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";

import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/toPromise'
import 'rxjs/add/observable/of'

@Injectable()
export class ExperimentService {

  constructor(
    private http: Http
  ) { }

  getExperimentTest(id): Promise<any> {
    console.log('get experiment called lol', id)
    return Observable.of(id).toPromise()
  }

  private headers = new Headers({'Content-Type': 'application/json'})    
  getExperiment(id): Promise<any> {
    return this.http.post('api/experiment', JSON.stringify({exp_id: id}), {headers: this.headers})
      .toPromise()
      .then(response => response.json().experiment)
      .catch(this.handleError);
  }

  getExperiments(): Promise<any> {
    return this.http.post('api/get_experiment_list', {}, { headers: this.headers })
      .toPromise()
      .then(response => {
        return response.json().experiments
      })
      .catch(this.handleError)
  }

  handleError(error): Promise<any> {
    return Promise.reject(error.message || error);
    
  }

}
