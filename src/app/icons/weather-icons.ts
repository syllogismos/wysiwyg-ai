import { Component, OnInit } from '@angular/core';
import { WeatherIconsService } from '../services/weather-icons';

@Component({
  selector: 'weather-icons',
  templateUrl: '../icons/weather-icons.html',
  providers: [WeatherIconsService]
})

export class WeatherIconsComponent implements OnInit {

  public items: Array<string>;
  public icons: Array<string>;

  constructor(private weatherIconsService: WeatherIconsService) {
    this.icons = weatherIconsService.getIcons();
  }

  ngOnInit() {
    this.items = this.icons.slice();
  }

  search(event: any) {
    const regex = new RegExp(event.target.value, 'gi');
    this.items = this.icons.filter((str) => str.match(regex));

  }

}

