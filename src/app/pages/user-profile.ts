import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";

declare var $: any;

@Component({
  selector: 'user-profile',
  templateUrl: '../pages/user-profile.html'
})

export class UserProfileComponent implements OnInit {

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    console.log(this.user)
  }


  user: any;

constructor(private http: Http) {
  }

  updateAccountSettings(): void {
    console.log('sending params to the server')
    var params = {};
    $('.account-settings').serializeArray().map(x => params[x.name] = x.value)
    console.log(params)
    this.http.post('/api/updateAccount', params)
      .toPromise()
      .then(response => {
        console.log('right after post test response')
        localStorage.setItem('user', JSON.stringify(response.json()))
        this.user = response.json()
      })
  }

  onEmailUpdateClick(): void {
    var params = {};
    $('.email-settings').serializeArray().map(x => params[x.name] = x.value)
    console.log(params)
    this.http.post('/api/updateEmail', params)
      .toPromise()
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.json()))
        this.user = response.json()
      })
  }

}

