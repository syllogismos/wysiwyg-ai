import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation';

@Component({
  selector: 'top-navigation-2',
  templateUrl: '../elements/top-navigation-2.html',
  providers: [NavigationService]
})

export class TopNavigation2Component implements OnInit {

  navigation: Array<Object>;
  topNavigation: Array<Object>;
  numbers: Array<number>;

  constructor(private navigationService: NavigationService) {
    var self = this;
    self.topNavigation = [];
    self.navigation = navigationService.getNavigation()
    self.navigation.map((items) => {
      items['items'].map((item) => self.topNavigation.push(item))
    })
    this.numbers = [];
    for (var i = 1; i < 5; i++) {
      this.numbers.push(i)
    }
  }

  ngOnInit() {
    //console.log('navigation', this.navigation);
  }

}

