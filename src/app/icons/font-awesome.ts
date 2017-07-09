import { Component, OnInit } from '@angular/core';
import { FontAwesomeService } from '../services/font-awesome';

@Component({
  selector: 'font-awesome',
  templateUrl: '../icons/font-awesome.html',
  providers: [FontAwesomeService]
})

export class FontAwesomeComponent implements OnInit {

  public items: Array<string>;
  public icons: Array<string>;

  constructor(private fontAwesomeService: FontAwesomeService) {
    this.icons = fontAwesomeService.getIcons();
  }

  ngOnInit() {
    this.items = this.icons.slice();
  }

  search(event: any) {
    const regex = new RegExp(event.target.value, 'gi');
    this.items = this.icons.filter((str) => str.match(regex));

  }

}
