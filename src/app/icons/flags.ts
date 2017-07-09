import { Component, OnInit } from '@angular/core';
import { FlagsService } from '../services/flags';

@Component({
  selector: 'flags',
  templateUrl: '../icons/flags.html',
  providers: [FlagsService]
})

export class FlagsComponent implements OnInit {

  public items: Array<any>;
  public icons: Array<any>;

  constructor(private flagsService: FlagsService) {
    this.icons = flagsService.getIcons();
  }

  ngOnInit() {
    this.items = this.icons.slice();
  }

  search(event: any) {
    const regex = new RegExp(event.target.value, 'gi');
    this.items = this.icons.filter((item) => item.name.match(regex));


  }
}

