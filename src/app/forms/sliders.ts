import { Component, OnInit } from '@angular/core';

declare var noUiSlider: any;

@Component({
  selector: 'sliders',
  templateUrl: '../forms/sliders.html'
})

export class SlidersComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    const colors = ['primary', 'secondary', 'info', 'success', 'warning', 'danger'];

    for (const i in colors) {
      const slider = 'slider-' + colors[i];
      noUiSlider.create(document.getElementById(slider), {
        start: [this.random(10, 30), this.random(70, 90)],
        connect: true,
        range: {
          'min': 0,
          'max': 100
        }
      });
    }
  }

  random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}

