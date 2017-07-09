import { Component, OnInit } from '@angular/core';

declare var $: any;
declare var moment: any;

@Component({
  selector: 'moment-js',
  templateUrl: '../plugins/moment-js.html'
})

export class MomentJsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    $('#example-1 .to').html(
      moment().format('MMMM Do YYYY, h:mm:ss a')
    );
    $('#example-2 .to').html(
      moment().format('dddd')
    );
    $('#example-3 .to').html(
      moment().format('MMM Do YY')
    );
    $('#example-4 .to').html(
      moment().format()
    );
    $('#example-5 .to').html(
      moment('20111031', 'YYYYMMDD').fromNow()
    );
    $('#example-6 .to').html(
      moment('20120620', 'YYYYMMDD').fromNow()
    );
    $('#example-7 .to').html(
      moment().startOf('day').fromNow()
    );
    $('#example-8 .to').html(
      moment().endOf('day').fromNow()
    );
    $('#example-9 .to').html(
      moment().startOf('hour').fromNow()
    );
    $('#example-10 .to').html(
      moment().subtract(10, 'days').calendar()
    );
    $('#example-11 .to').html(
      moment().subtract(2, 'months').format()
    );
    $('#example-12 .to').html(
      moment().subtract(15, 'days').startOf('day').fromNow()
    );
    $('#example-13 .to').html(
      moment().add(10, 'days').calendar()
    );
    $('#example-14 .to').html(
      moment().add(2, 'months').format()
    );
    $('#example-15 .to').html(
      moment().add(15, 'days').startOf('day').fromNow()
    );
  }

}

