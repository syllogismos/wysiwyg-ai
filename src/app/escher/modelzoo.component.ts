import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Http } from "@angular/http";
import { EditorService } from 'app/escher/editor.service';
import { EscherService } from 'app/escher/escher.service';

declare const $: any;
declare const _: any;
declare const fabric: any;

@Component({
  selector: 'app-modelzoo',
  templateUrl: './modelzoo.component.html',
  styleUrls: ['./modelzoo.component.scss'],
  providers: [EditorService, EscherService]
})
export class ModelzooComponent implements OnInit {

  models: any;
  canvas: any;
  canvasWrapper: any;
  currentModel: any;

  constructor(
    private router: Router,
    private http: Http,
    public editorService: EditorService
  ) { }

  ngOnInit() {
    $('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });

    $('[data-toggle="tooltip"]').on('click', function () {
      $(this).tooltip('hide')
    })

    // this.canvas = new fabric.Canvas('canvas')
    // this.canvasWrapper = $('#canvasWrapper')
    // this.editorService.init(this.canvas, this.canvasWrapper)

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
          m.network = model.network
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

  selectModel(model): void {
    console.log("selected model", model)
    if (this.currentModel === undefined) {
      this.currentModel = model      
      console.log("initializing canvas editor service")
      setTimeout(() => {
        // little timeout for when you introduce canvas and canvas wrapper elements into html in the beginning
        this.canvas = new fabric.Canvas('canvas')
        this.canvasWrapper = $('#canvasWrapper')
        this.editorService.init(this.canvas, this.canvasWrapper)
      }, 100)
      setTimeout(() => {
        // slightly larger timeout for the editor service to get initialized so that the network can be loaded
        // on to the editor after wards.
        this.editorService.loadModel(model.network)
      }, 1000)
    } else {
      this.currentModel = model
      this.editorService.loadModel(model.network)
    }
  }

}
