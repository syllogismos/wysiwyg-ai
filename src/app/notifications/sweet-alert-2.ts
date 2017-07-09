import { Component, OnInit } from '@angular/core';
import { ColorsService } from '../services/colors';

declare var swal: any;

@Component({
  selector: 'sweet-alert-2',
  templateUrl: '../notifications/sweet-alert-2.html',
  providers: [ColorsService]
})

export class SweetAlert2Component implements OnInit {

  colors: Object;

  constructor(private colorsService: ColorsService) {
    this.colors = colorsService.getBootstrapColors();
  }

  ngOnInit() {
  }

  basic(): void {
    swal({
      title: 'The Internet?',
      text: 'That thing is still around?',
      confirmButtonColor: this.colors['primary']
    });
  }

  autoClose(): void {
    swal({
      title: 'Auto close alert!',
      text: 'I will close in 2 seconds.',
      timer: 2000
    });
  }

  html(): void {
    swal({
      title: 'HTML example',
      html: 'You can use <b>bold text</b>, ' + '<a href="//github.com">links</a> ' + 'and other HTML tags'
    });
  }

  confirmation(): void {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      closeOnConfirm: false
    }, function() {
      swal('Deleted!', 'Your file has been deleted.', 'success');
    });
  }

  cancel(): void {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel plx!',
      confirmButtonClass: 'confirm-class',
      cancelButtonClass: 'cancel-class',
      closeOnConfirm: false,
      closeOnCancel: false
    }, function(isConfirm) {
      if (isConfirm) {
        swal('Deleted!', 'Your file has been deleted.', 'success');
      } else {
        swal('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  }
}

