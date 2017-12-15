import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";

import "rxjs/add/operator/toPromise";
import 'rxjs/add/operator/timeout'


@Injectable()
export class AuthService {

  constructor(
    private http: Http
  ) { }

  isLoggedOut(): Promise<boolean> {
    return this.http.get('/api/loggedin')
      // .timeout(2000)
      .toPromise()
      .then(response => {
        // console.log("just called api/loggedin")
        // console.log(response.json())
        localStorage.setItem('user', JSON.stringify(response.json()))        
        return response.json() === 0
      })
      .catch(this.handleHttpError)
  }

  private handleHttpError(error: any): Promise<any> {
    console.error("An error occurred", error);
    return Promise.reject(error.message || error);
  }
}
