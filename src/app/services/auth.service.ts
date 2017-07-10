import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";

import "rxjs/add/operator/toPromise";

@Injectable()
export class AuthService {

  constructor(
    private http: Http
  ) { }

  isLoggedOut(): Promise<boolean> {
    return this.http.get('/api/loggedin')
      .toPromise()
      .then(response => {
        console.log("just called api/loggedin")
        console.log(response.json())
        return response.json() === 0
      })
      .catch(this.handleHttpError)
  }

  private handleHttpError(error: any): Promise<any> {
    console.error("An error occurred", error);
    return Promise.reject(error.message || error);
  }
}
