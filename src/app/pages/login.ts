import { Component, OnInit } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Router } from "@angular/router";

import "rxjs/add/operator/toPromise";

declare var toastr: any

@Component({
  selector: 'login',
  templateUrl: '../pages/login.html'
})

export class LoginComponent implements OnInit {

  constructor(
    private http: Http,
    private router: Router
  ) {
  }

  ngOnInit() {}

  onLoginClick(email: string, password: string) {
    console.log(email);
    console.log(password);
    console.log('Im stupid');

    this.http.post('/api/login', {
      'email': email,
      'password': password
    }).toPromise()
      .then(response => {
        console.log('right after login response')
        console.log(response.json())
        localStorage.setItem('user', JSON.stringify(response.json()))
        this.router.navigate(['/']);
      })
      .catch(this.handleLoginHttpError)
  }

  onRegisterClick(): void {
    this.router.navigate(['/pages/create-account']);
  }

  onLogoutClick() {
    console.log('clicked on logout');
    this.http.post('/api/logout', {})
      .toPromise()
      .then(response => {
        console.log('api/logout responded');
        console.log(response);
        localStorage.setItem('user', null);
        // and then route to login page
      })
      .catch(this.handleHttpError)
  }

  private handleLoginHttpError(error: any): Promise<any> {
    console.error('An error occurred while logging', error);
    toastr.options = {
      iconClass: '',
      positionClass: 'toast-top-right',
      progressBar: true,
      timeOut: 3000
    }
    toastr.error('Error Logging in, check your credentials.')
    return Promise.reject(error.message || error);
  }

  private handleHttpError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

