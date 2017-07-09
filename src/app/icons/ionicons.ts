import { Component, OnInit } from '@angular/core';
import { IoniconsService } from '../services/ionicons';

@Component({
  selector: 'ionicons',
  templateUrl: '../icons/ionicons.html',
  providers: [IoniconsService]
})

export class IoniconsComponent implements OnInit {

  public items: Array<string>;
  public icons: Array<string>;

  constructor(private ioniconsService: IoniconsService) {
    this.icons = ioniconsService.getIcons();
  }

  ngOnInit() {
    this.items = this.icons.slice();
  }

  search(event: any) {
    const regex = new RegExp(event.target.value, 'gi');
    this.items = this.icons.filter((str) => str.match(regex));

  }

}

