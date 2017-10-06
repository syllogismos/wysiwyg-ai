import { Component, OnInit } from '@angular/core';
import { NavigationService } from "../services/navigation";

@Component({
  selector: 'app-everything',
  templateUrl: './everything.component.html',
  styleUrls: ['./everything.component.scss'],
  providers: [NavigationService]
})
export class EverythingComponent implements OnInit {
  everything: any;
  constructor(
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
    this.everything = this.navigationService.getEverything();
  }

}
