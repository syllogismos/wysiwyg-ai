import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sidebar-heading',
  templateUrl: '../elements/sidebar-heading.html',
  //styleUrls: ['./src/styles/elements/sidebar-heading.scss']
})

export class SidebarHeadingComponent implements OnInit {

  user: any;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    console.log('after sidebar')
    console.log(this.user)
  }

  constructor() {
  }

}
