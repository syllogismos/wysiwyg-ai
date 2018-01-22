import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Http } from "@angular/http";

declare const $: any;
declare const _: any;

@Component({
  selector: 'app-modelzoo',
  templateUrl: './modelzoo.component.html',
  styleUrls: ['./modelzoo.component.scss']
})
export class ModelzooComponent implements OnInit {

  models: any;

  constructor(
    private router: Router,
    private http: Http
  ) { }

  ngOnInit() {
    $('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });

    $('[data-toggle="tooltip"]').on('click', function () {
      $(this).tooltip('hide')
    })


    this.models = []

    this.getModels()

  }

  goToEscherBoard(): any {
    this.router.navigate(['escherboard/console'])
  }

  goToExperiment(): any {
    this.router.navigate(['escher/experiment'])
  }

  getModels(): void {
    this.http.post('/api/get_nnmodel_list', {

    }).toPromise()
      .then(response => {
        var models = response.json().nnmodels
        console.log(models)
        this.models = _.map(models, model => {
          // console.log(model)
          var m = Object()
          var network = JSON.parse(model.network)
          m.description = JSON.stringify(_.countBy(_.map(network, x => x.layer_type)))
          m.name = model.name
          m.hidden = network.length
          m._id = model._id
          m.network = network
          m.createdAt = model.createdAt
          return m
        })

        var table_id = '#model-datatable'
        if ($.fn.dataTable.isDataTable(table_id)) {
          $(table_id).DataTable().destroy()
          setTimeout(function () {
            $('#model-datatable').DataTable({}, 10)
          })
        } else {
          setTimeout(function () {
            $('#model-datatable').DataTable({}, 10)
          })
        }

        console.log(this.models)
      })
  }

  selectModel(network): void {
    console.log("selected model", network)
  }

}
