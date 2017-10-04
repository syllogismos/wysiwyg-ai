import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

declare var _: any;

@Component({
  selector: 'jumbotron-1',
  templateUrl: '../elements/jumbotron-1.html'
})

export class Jumbotron1Component implements OnInit {
  
  public controller: string = 'Escherboard';
  public view: string = 'Console';

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    this.controller = 'Escherboard';
    this.view = 'Console';

    const self = this;
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        const copy = Object.assign({}, val);
        const data = copy.url
          .split('/')
          .filter(url => url.length > 0);
        if (data.length == 2) {
          self.controller = _.startCase(data[0]).replace(/-/gi, ' ').replace(/Ui Elements/g, 'UI Elements');
          self.view = _.startCase(data[1]).replace(/-/gi, ' ');
        }
      }
    });
  }

  

}
