import { Component, OnInit } from '@angular/core';

declare var $: any;
declare var accounting: any;

@Component({
  selector: 'accounting-js',
  templateUrl: '../plugins/accounting-js.html'
})

export class AccountingJsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    const example1 = 12345678;
    $('#example-1 .from').html(example1);
    $('#example-1 .to').html(accounting.formatMoney(12345678));
    $('#example-2 .from').html(4999.99);
    $('#example-2 .to').html(accounting.formatMoney(4999.99, '€', 2, '.', ','));
    $('#example-3 .from').html(accounting.formatMoney(-500000, '£ ', 0));
    $('#example-3 .to').html(accounting.formatMoney(-500000, '£ ', 0));
    $('#example-4 .from').html(5318008);
    $('#example-4 .to').html(
      accounting.formatMoney(5318008, {
        symbol: 'GBP',
        format: '%v %s'
      })
    );
    $('#example-5 .from').html(5318008);
    $('#example-5 .to').html(
      accounting.formatNumber(5318008)
    );
    $('#example-6 .from').html(9876543.21);
    $('#example-6 .to').html(
      accounting.formatNumber(9876543.21, 3, ' ')
    );
    $('#example-7 .from').html('$12,345,678.00');
    $('#example-7 .to').html(accounting.unformat('$12,345,678.00'));
    $('#example-8 .from').html('£ 12,345,678.90 GBP');
    $('#example-8 .to').html(
      accounting.unformat('£ 12,345,678.90 GBP')
    );
  }

}
