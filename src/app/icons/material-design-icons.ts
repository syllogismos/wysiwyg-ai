import { Component, OnInit } from '@angular/core';
import { MaterialDesignIconsService } from '../services/material-design-icons';

@Component({
  selector: 'material-design-icons',
  templateUrl: '../icons/material-design-icons.html',
  providers: [MaterialDesignIconsService]
})

export class MaterialDesignIconsComponent implements OnInit {

  public items: Array<string>;
  public icons: Array<string>;

  constructor(private materialDesignIconsService: MaterialDesignIconsService) {
    this.icons = materialDesignIconsService.getIcons();
  }

  ngOnInit() {
    this.items = this.icons.slice();
  }

  search(event: any) {
    const regex = new RegExp(event.target.value, 'gi');
    this.items = this.icons.filter((str) => str.match(regex));

  }

}

