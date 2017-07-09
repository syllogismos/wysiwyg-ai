import { Component, OnInit } from '@angular/core';

declare var toastr: any;

@Component({
  selector: 'toastr',
  templateUrl: '../notifications/toastr.html'
})

export class ToastrComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  success(): void {
    toastr.options = {
      iconClass: '',
      positionClass: 'toast-top-right'
    };
    toastr.success('Great idea!');
  }
  warning(): void {
    toastr.options = {
      iconClass: '',
      positionClass: 'toast-bottom-right'
    };
    toastr.warning('Warning!');
  }
  danger(): void {
    toastr.options = {
      iconClass: '',
      positionClass: 'toast-bottom-left'
    };
    toastr.error('Danger!');
  }
  info(): void {
    toastr.options = {
      iconClass: '',
      positionClass: 'toast-top-left'
    };
    toastr.info('Excellent!');
  }
}

