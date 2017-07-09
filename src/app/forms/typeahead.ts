import { Component, OnInit } from '@angular/core';

declare var $: any;
declare var typeahead: any;

@Component({
  selector: 'typeahead',
  templateUrl: '../forms/typeahead.html',
  styleUrls: [
    '../styles/forms/typeahead.scss'
  ]
})

export class TypeaheadComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    let states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
      'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
      'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
      'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
      'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
      'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
      'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
      'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
      'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];
    $('.typeahead-1').typeahead({
      source: states
    });
    $.get('/assets/json/100.json', function(data) {
      $('.typeahead-2').typeahead({
        source: data
      });
    }, 'json');
  }
}

