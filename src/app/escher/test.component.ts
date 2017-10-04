import { Component, OnInit } from '@angular/core';
// import * as d3 from 'd3';

declare var $: any;
declare var d3: any;
declare var Raphael: any;
// import 'fabric';
declare var fabric: any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

export class TestComponent implements OnInit {

  constructor() { }

  canvas: any;

  ngOnInit() {
    // var paper = Raphael(100, 20, 10, 3);
    // var circle = paper.circle(50, 40, 10);
    // var width  = 960;
    // var height = 500;
    // // var colors = d3.scale.category10();
    // var colors = d3.schemeCategory10;
    // // circle.attr('fill', '#f00');
    // // circle.attr('stroke', '#fff');
    // d3.select("#d3_window")
    //   .append('svg')
    //   .attr('oncontextmenu', 'return false;')
    //   .attr('width', width)
    //   .attr('height', height);
    // d3.scale
    d3.selectAll('p').style('color', 'green')

    this.canvas = new fabric.Canvas('canvas')
    this.canvas.setHeight(500);
    this.canvas.setWidth(800);
    

    this.canvas.add(new fabric.Rect({
      left: 100,
      top: 100,
      width: 50,
      height: 50,
      fill: '#faa'
    }));

    this.canvas.add(new fabric.Circle({
      left: 200,
      top: 100,
      radius: 25,
      fill: '#afa'
    }));

    this.canvas.add(new fabric.Triangle({
      left: 300,
      top: 100,
      width: 50,
      height: 50,
      fill: '#aaf'
    }))

    
  }

  onButtonClick(): void {
    var rect = new fabric.Triangle({
      left: 123,
      top: 26,
      width: 50,
      height: 50,
      fill: '#abc'
    })

    this.canvas.add(rect);
    this.canvas.render();
  }

}
