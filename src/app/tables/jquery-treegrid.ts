import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'jquery-treegrid',
  templateUrl: '../tables/jquery-treegrid.html'
})

export class JqueryTreegridComponent implements OnInit {

  constructor() {
    $.extend($.fn.treegrid.defaults, {
      expanderExpandedClass: 'fa fa-angle-down',
      expanderCollapsedClass: 'fa fa-angle-right'
    });
  }

  ngOnInit() {
    $('.treegrid').treegrid();
    const count_root_elements = 10;
    const count_deep = 5;
    for (let i = 0; i < count_root_elements; i++) {
      const tr = $('<tr></tr>').addClass('treegrid-' + i + '-0').appendTo($('.large-treegrid')).html('<td>Root node ' + i + '</td><td>More info</td>');
      for (let j = 1; j < count_deep; j++) {
        $('<tr></tr>').addClass('treegrid-' + i + '-' + j).addClass('treegrid-parent-' + i + '-' + (j - 1)).appendTo($('.large-treegrid')).html('<td>Child node ' + i + '-' + j + '</td><td>More info</td>');
      }
    }
    $('.large-treegrid').treegrid({
      initialState: 'collapsed'
    });
  }

}
