import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from "rxjs/Rx";
import { ISubscription } from "rxjs/Subscription";

@Component({
  selector: 'sidebar-heading',
  templateUrl: '../elements/sidebar-heading.html',
  //styleUrls: ['./src/styles/elements/sidebar-heading.scss']
})

export class SidebarHeadingComponent implements OnInit, OnDestroy {


  private subscription: ISubscription
  user: any;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    console.log('after sidebar')
    console.log(this.user)
    /**
     * TODO: This loads user from localstorage every one second
     * optimize this later.
     */
    this.subscription = Observable.interval(1000).subscribe(() => {
      this.user = JSON.parse(localStorage.getItem('user'))
    })
  }

  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");
    this.subscription.unsubscribe();
  }

  constructor() {
  }

}
