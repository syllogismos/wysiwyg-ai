import { Component, OnInit } from '@angular/core';

declare var $: any;
declare var datepicker: any;

@Component({
  selector: 'datepicker',
  templateUrl: '../forms/datepicker.html'
})

export class DatepickerComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    $('#date-picker-1').datepicker({
      format: 'mm/dd/yyyy',
      orientation: 'bottom'
    });
    $('#date-picker-1').on('changeDate', function() {
      let val = $('#date-picker-1').datepicker('getFormattedDate');
      console.log('date: ', val);
    });
    $('#date-picker-2').datepicker({
      orientation: 'bottom'
    });
    $('#date-picker-2').on('changeDate', function() {
      let val = $('#date-picker-2').datepicker('getFormattedDate');
      console.log('date: ', val);
    });
    $('#date-picker-3').datepicker({
      orientation: 'bottom'
    });
    $('#date-picker-3').on('changeDate', function() {
      let val = $('#date-picker-3').datepicker('getFormattedDate');
      console.log('date: ', val);
    });
    $('#date-picker-4').datepicker({
      orientation: 'bottom'
    });
    $('#date-picker-4').on('changeDate', function() {
      let val = $('#date-picker-4').datepicker('getFormattedDate');
      console.log('date: ', val);
    });
    $('#date-picker-5').datepicker({
      orientation: 'bottom'
    });
    $('#date-picker-5').on('changeDate', function() {
      let val = $('#date-picker-5').datepicker('getFormattedDate');
      console.log('date: ', val);
      $('#date-picker-5-input').val(val);
    });
  }
}
