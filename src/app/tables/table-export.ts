import { Component } from '@angular/core';

declare var $: any;

@Component({
  selector: 'table-export',
  templateUrl: '../tables/table-export.html'
})

export class TableExportComponent {

  constructor() {
  }

  exportTo(format: string): void {

    if (format === 'json') {
      $('#table-export-json').tableExport({
        type: 'json',
        escape: 'false'
      });
    } else if (format === 'xml') {
      $('#table-export-xml').tableExport({
        type: 'xml',
        escape: 'false'
      });
    } else if (format === 'pdf') {
      $('#table-export-pdf').tableExport({
        type: 'pdf',
        pdfFontSize: '7',
        escape: 'false'
      });
    } else if (format === 'sql') {
      $('#table-export-sql').tableExport({
        type: 'sql',
        escape: 'false'
      });
    } else if (format === 'csv') {
      $('#table-export-csv').tableExport({
        type: 'csv',
        escape: 'false'
      });
    } else if (format === 'txt') {
      $('#table-export-txt').tableExport({
        type: 'txt',
        escape: 'false'
      });
    } else if (format === 'xls') {
      $('#table-export-xls').tableExport({
        type: 'excel',
        escape: 'false'
      });
    }

  }
}

