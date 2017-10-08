import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-modelzoo',
  templateUrl: './modelzoo.component.html',
  styleUrls: ['./modelzoo.component.scss']
})
export class ModelzooComponent implements OnInit {

  models: any;

  constructor() { }

  ngOnInit() {
    $('[data-toggle="tooltip"]').tooltip();

    this.models = [
      {
        name: "Co-co captioning Model",
        description : "feedforward cnn for object recognition",
        hidden: 200,
        iterations: 200,
        id: 'co-co1'
      },
      {
        name: "Co-co captioning Model",
        description : "feedforward cnn for object recognition",
        hidden: 200,
        iterations: 200,
        id: 'co-co1'
      },
      {
        name: "Co-co captioning Model",
        description : "feedforward cnn for object recognition",
        hidden: 200,
        iterations: 200,
        id: 'co-co1'
      },
      {
        name: "Co-co captioning Model",
        description : "feedforward cnn for object recognition",
        hidden: 200,
        iterations: 200,
        id: 'co-co1'
      },
      {
        name: "Co-co captioning Model",
        description : "feedforward cnn for object recognition",
        hidden: 200,
        iterations: 200,
        id: 'co-co1'
      },
      {
        name: "Co-co captioning Model",
        description : "feedforward cnn for object recognition",
        hidden: 200,
        iterations: 200,
        id: 'co-co1'
      },
      {
        name: "Co-co captioning Model",
        description : "feedforward cnn for object recognition",
        hidden: 200,
        iterations: 200,
        id: 'co-co1'
      }
    ]
  }

}
