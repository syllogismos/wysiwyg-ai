import { Component, OnInit } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Router } from "@angular/router";

import "rxjs/add/operator/toPromise";

declare var approve: any;

@Component({
  selector: 'create-account',
  templateUrl: '../pages/create-account.html'
})

export class CreateAccountComponent implements OnInit {

  constructor(
    private http: Http,
    private router: Router
  ) {
  }

  ngOnInit() {}

  onRegClick(email: string, password: string) {
    console.log(email);
    console.log(password);
    console.log('registering the above user');
    this.http.post('/api/register', {
      'username': email,
      'email': email,
      'password': password,
      'password1': password
    }).toPromise()
      .then(response => {
        console.log('register response');
        console.log(response.json());
        localStorage.setItem('user', JSON.stringify(response.json()));
        this.router.navigate(['/'])
      })
      .catch(this.handleHttpError)
  }

  private handleHttpError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

