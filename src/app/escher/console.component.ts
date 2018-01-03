import { Component, OnInit } from '@angular/core';
import { EscherService } from "./escher.service";
import { Http } from "@angular/http";

declare var $: any;
declare var d3: any;
declare var Raphael: any;
declare var fabric: any;
declare var _: any;
declare var ResizeSensor: any;
declare var toastr: any;

import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/toPromise';
import { EditorService } from 'app/escher/editor.service';


@Component({
  selector: 'app-test',
  templateUrl: './console.component.html',
  styleUrls: [
    './console.component.scss',
  ],
  providers: [
    EscherService, EditorService
  ]
})

export class ConsoleComponent implements OnInit {

  constructor(
    private escherService: EscherService,
    public editorService: EditorService,
    private http: Http
  ) { }

  canvas: any;
  canvasWrapper: any;

  ngOnInit() {
    $('[data-toggle="tooltip"]').tooltip();
    this.canvas = new fabric.Canvas('canvas')
    this.canvasWrapper = $("#canvasWrapper")
    this.editorService.init(this.canvas, this.canvasWrapper)
    this.editorService.loadResnet18();
  }

  addConnection(): void{
    this.editorService.addConnection()
  }

  removeConnection(): void {
    this.editorService.removeConnection()
  }

  refreshCanvas(): void {
    this.editorService.refreshCanvas();
  }

  addNetworkLayer(layer_type: String): void {
    this.editorService.addLayer(layer_type)
  }

  TestButton(): void {
    console.log(this.editorService.serializeCanvas())
  }

  Copy(): void {
    this.editorService.Copy()
  }

  Paste(): void {
    this.editorService.Paste()
  }

  Delete(): void {
    this.editorService.Delete();
  }

  saveToDb(): void{
    this.editorService.saveToDb()
  }

  clearCanvas(): void{
    this.editorService.clearCanvas();
  }

  saveCanvas(): void {
    this.editorService.saveCanvas();
  }

  loadCanvas(): void {
    this.editorService.loadCanvas();
  }

  loadResnet18(): void {
    this.editorService.loadResnet18();
  }

  loadMNIST(): void {
    this.editorService.loadMNIST();
  }

}