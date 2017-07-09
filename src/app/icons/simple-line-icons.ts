import { Component, OnInit } from '@angular/core';
import { SimpleLineIconsService } from '../services/simple-line-icons';

@Component({
  selector: 'simple-line-icons',
  templateUrl: '../icons/simple-line-icons.html',
  providers: [SimpleLineIconsService]
})

export class SimpleLineIconsComponent implements OnInit {

  public items: Array<string>;
  public icons: Array<string>;

  constructor(private simpleLineIconsService: SimpleLineIconsService) {
    this.icons = simpleLineIconsService.getIcons();
  }

  ngOnInit() {
    this.items = this.icons.slice();
  }

  search(event: any) {
    const regex = new RegExp(event.target.value, 'gi');
    this.items = this.icons.filter((str) => str.match(regex));

  }

}

