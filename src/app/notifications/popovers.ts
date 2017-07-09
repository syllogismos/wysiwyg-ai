import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'popovers',
  templateUrl: '../notifications/popovers.html'
})

export class PopoversComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    $('[data-toggle="popover"]').popover();
    $('[data-toggle="popover-primary"]').popover({
      template: '<div class="popover popover-primary" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
    $('[data-toggle="popover-secondary"]').popover({
      template: '<div class="popover popover-secondary" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
    $('[data-toggle="popover-info"]').popover({
      template: '<div class="popover popover-info" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
    $('[data-toggle="popover-success"]').popover({
      template: '<div class="popover popover-success" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
    $('[data-toggle="popover-warning"]').popover({
      template: '<div class="popover popover-warning" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
    $('[data-toggle="popover-danger"]').popover({
      template: '<div class="popover popover-danger" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
  }

}
