import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation';

@Component({
  selector: 'left-sidebar-1',
  templateUrl: '../elements/left-sidebar-1.html',
  providers: [NavigationService]
})

export class LeftSidebar1Component implements OnInit {

  navigation: Array<Object>;

  constructor(private navigationService: NavigationService) {
    this.navigation = navigationService.getNavigation()
  }

  ngOnInit() {
    //console.log('navigation', this.navigation);
  }

}
