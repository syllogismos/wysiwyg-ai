import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'datatable',
  templateUrl: '../tables/datatable.html'
})

export class DatatableComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    $('#datatable-example-1').DataTable({
      'ajax': '/assets/json/datatables.json'
    });
    $('#datatable-example-2').DataTable();
  }

}
