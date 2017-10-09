import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

declare const $: any;

@Component({
  selector: 'app-modelzoo',
  templateUrl: './modelzoo.component.html',
  styleUrls: ['./modelzoo.component.scss']
})
export class ModelzooComponent implements OnInit {

  models: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    $('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });

    $('[data-toggle="tooltip"]').on('click', function () {
      $(this).tooltip('hide')
  })

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

  goToEscherBoard(): any {
    this.router.navigate(['escherboard/console'])
  }

  goToExperiment(): any {
    this.router.navigate(['escher/experiment'])
  }

}
