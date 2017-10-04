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
  styleUrls: [
    './test.component.scss',
    // '../styles/ui-elements/buttons.scss'
  ]
})

export class TestComponent implements OnInit {

  constructor() { }

  canvas: any;
  _clipboard: any;
  grid: number = 50;
  gridSmall: number = 25;
  top: number = 50;
  left: number = 50;

  ngOnInit() {

    this.canvas = new fabric.Canvas('canvas')
    this.canvas.setHeight(500);
    this.canvas.setWidth(800);

    $("#canvasWrapper").on('mousedown', e => {
      this.startPan(this.canvas, e);
    });
    
    fabric.Canvas.prototype.set({
      notAllowedCursor: "default",
    });

    fabric.Object.prototype.set({
      transparentCorners: false,
      borderColor: '#32424a',
      cornerColor: '#263238',
      cornerSize: 6,
      lockRotation: true,
      hasRotatingPoint: false,
      lockScalingX: true,
      lockScalingY: true
    })

    for (var i = 0; i < (6000 / this.grid); i++) {
      this.canvas.add(new fabric.Line([i * this.grid, 0, i * this.grid, 6000], { stroke: '#FDFDFD', selectable: false }));
      this.canvas.add(new fabric.Line([0, i * this.grid, 6000, i * this.grid], { stroke: '#F0E7E7', selectable: false }))
    }

    this.canvas.on('object:moving', options => {
      options.target.set({
        left: Math.round(options.target.left / this.gridSmall) * this.gridSmall,
        top: Math.round(options.target.top / this.gridSmall) * this.gridSmall
      });
    });


    /**
     * Create objects
    //  */
    // var rect = new fabric.Rect({
    //   left: 100,
    //   top: 50,
    //   fill: '#D81B60',
    //   width: 100,
    //   height: 100,
    //   strokeWidth: 2,
    //   stroke: '#880E4F',
    //   rx: 10,
    //   ry: 10,
    //   angle: 45,
    //   hasControls: true
    // });

    // this.canvas.add(rect);

    // var rect2 = new fabric.Rect({
    //   left: 200,
    //   top: 50,
    //   fill: '#F06292',
    //   width: 100,
    //   height: 100,
    //   strokeWidth: 2,
    //   stroke: '#880E4F',
    //   rx: 10,
    //   ry: 10,
    //   angle: 45,
    //   hasControls: true
    // });


    // this.canvas.add(rect2);

    // var circle1 = new fabric.Circle({
    //   radius: 65,
    //   fill: '#039BE5',
    //   left: 0
    // });

    // var circle2 = new fabric.Circle({
    //   radius: 65,
    //   fill: '#4FC3F7',
    //   left: 100,
    //   opacity: 0.7,
    // });

    // var group = new fabric.Group([circle1, circle2,], {
    //   left: 40,
    //   top: 250
    // });

    // this.canvas.add(group);



    // var circle = new fabric.Circle({
    //   radius: 100,
    //   fill: '#eef',
    //   scaleY: 0.5,
    //   originX: 'center',
    //   originY: 'center'
    // })

    // var text = new fabric.Text('hello world', {
    //   fontSize: 30,
    //   originX: 'center',
    //   originY: 'center'
    // });

    // var group = new fabric.Group([circle, text], {
    //   left: 150,
    //   top: 100,
    //   angle: -10
    // });

    // this.canvas.add(group);
    
  }

  addRectTextGroup(color, text): void {
    var rect = new fabric.Rect({
      width: 200,
      height: 50,
      fill: color,
      opacity: 0.6
      // originX: 'center',
      // originY: 'center'
    })
    var text = new fabric.Text(text, {
      fontSize: 40,
      fontFamily: 'Arial Regular'
      // originX: 'center',
      // originY: 'center'
    })
    var group = new fabric.Group([rect, text], {
      left: this.left,
      top: this.top
    })

    this.top += 50;
    
    this.canvas.add(group);
  }

  addAffine(): void {
    this.addRectTextGroup('purple', 'AF')
  }

  addBatchNorm(): void {
    this.addRectTextGroup('green', 'BN')
  }

  addActivation(): void {
    this.addRectTextGroup('pink', 'AC')
  }

  addDropout(): void {
    this.addRectTextGroup('blue', 'DR')
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

  Copy(): void {
    // clone what are you copying since you
    // may want copy and paste on different moment.
    // and you do not want the changes happened
    // later to reflect on the copy.
    this.canvas.getActiveObject().clone(cloned => {
      this._clipboard = cloned;
    });
  }

  Paste(): void {
    // console.log(this.canvas)
    this._clipboard.clone(clonedObj => {
      this.canvas.discardActiveObject();
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true
      });

      if (clonedObj.type == 'activeSelection') {
        clonedObj.canvas = this.canvas;
        clonedObj.forEachObject(obj => {
          this.canvas.add(obj);
        });
        clonedObj.setCoords();
      } else {
        this.canvas.add(clonedObj);
      }
      this._clipboard.top += 10;
      this._clipboard.left += 10;
      this.canvas.setActiveObject(clonedObj);
      this.canvas.requestRenderAll();
      // this.canvas.renderAll();
    });
  }

  /**
   * Helper function that handles panning of the fabric canvas, that is
   * this helper is to be bound to the div wrapping the canvas element
   * on mousedown event
   * @param canvas fabric, canvas element inside the canvas wrapper
   * @param event event params given by the mousedown even
   */
  startPan(canvas, event): void {
    if (event.button != 2) {
      return;
    }
    var x0 = event.screenX,
      y0 = event.screenY;
    function continuePan(event) {
      var x = event.screenX,
        y = event.screenY;
      canvas.relativePan({ x: x - x0, y: y - y0 });
      x0 = x;
      y0 = y;
    }
    function stopPan(event) {
      $(window).off('mousemove', continuePan);
      $(window).off('mouseup', stopPan);
    };
    $(window).mousemove(continuePan);
    $(window).mouseup(stopPan);
    $(window).contextmenu(this.cancelMenu);
  };

  /**
   * Cancel right click menu for pan implementation
   */
  cancelMenu() {
    $(window).off('contextmenu', this.cancelMenu);
    return false;
  }

  Delete(): void {
    var activeObjects = this.canvas.getActiveObjects();
    // console.log(activeObject.type);
    // console.log(activeObject);
    this.canvas.discardActiveObject();
    if (activeObjects.length) {
      // console.log("lol")
      // activeObject.remove();
      this.canvas.remove.apply(this.canvas, activeObjects);
    }
    this.canvas.renderAll();
  }

  DeleteAll(): void {
    this.canvas.clear();
  }

}
