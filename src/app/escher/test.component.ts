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
  canvasWrapper: any;
  _clipboard: any;
  grid: number = 50;
  gridSmall: number = 50;
  top: number = 50;
  left: number = 50;

  resizeCanvas() {
    // this.canvas.setHeight(this.canvasWrapper.innerHeight());
    this.canvas.setWidth(this.canvasWrapper.width());
    this.canvas.renderAll();
  }

  ngOnInit() {

    this.canvas = new fabric.Canvas('canvas')
    this.canvasWrapper = $("#canvasWrapper")

    this.canvasWrapper.on('resize', this.resizeCanvas, false);
    

    // resize on init
    this.canvas.setHeight(500);
    // this.canvas.setWidth(800);
    this.resizeCanvas();
    

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
      this.canvas.add(new fabric.Line([i * this.grid, 0, i * this.grid, 6000], { stroke: '#F0E7E7', selectable: false }));
      this.canvas.add(new fabric.Line([0, i * this.grid, 6000, i * this.grid], { stroke: '#F0E7E7', selectable: false }));
    }

    this.canvas.on('object:moving', options => {
      options.target.set({
        left: Math.round(options.target.left / this.gridSmall) * this.gridSmall,
        top: Math.round(options.target.top / this.gridSmall) * this.gridSmall
      });
    });


  //  this.canvas.on('object:moving', options => {
  //    var p = options.target;
  //   //  console.log(p._objects.length);
  //   //  console.log(p._objects[0])
  //   //  console.log(p.top)
  //   //  var obj;
  //   //  var activeObjects = this.canvas.getActiveGroup();
  //   //  console.log(this.canvas.getActiveGroup())
  //    console.log(this.canvas.getActiveObject())
  //    console.log(this.canvas.getActiveObjects())
  //    var activeObjects = this.canvas.getActiveObjects()
  //    if (activeObjects.length > 1) {
  //      console.log(activeObjects.length)
  //      for (var obj of activeObjects) {
  //        obj.dest && obj.dest.set({x1: obj.left + 100, y1: obj.top + 25})
  //        obj.sour && obj.sour.set({x2: obj.left + 100, y2: obj.top + 25})
  //      }
  //    }
     
  //    p.dest && p.dest.set({ x1: p.left + 100, y1: p.top + 25 })
  //    p.sour && p.sour.set({ x2: p.left + 100, y2: p.top + 25 })
  //  })
    
  }

  addRectTextGroup(color, text): any {

    var circle = new fabric.Circle({
      radius: 4,
      fill: 'black',
      opacity: 0.6,
      top: 22,
      left: 97
      // originX: 'center',
      // originY: 'center'
    })

    var rect = new fabric.Rect({
      width: 200,
      height: 50,
      fill: color,
      opacity: 0.6
      // originX: 'center',
      // originY: 'center'
    })
    var text = new fabric.Text(text, {
      fontSize: 20,
      fontFamily: 'Arial Regular'
      // originX: 'center',
      // originY: 'center'
    })
    var group = new fabric.Group([rect, text, circle], {
      left: this.left,
      top: this.top
    })

    this.top += 50;
    group.layer_type = text;

    // var line = this.makeLine([this.left + 100, this.top - 25, this.left + 100, this.top + 25])
    // group.dest = line
    
    // this.canvas.add(group).setActiveObject(group);
    // this.canvas.add(line);
    return group;
  }

  addAffine(): void {
    // var sourceGroup = this.canvas.getActiveObject();
    var destGroup = this.addRectTextGroup('#303f9f', 'AF')
    // if (sourceGroup) {
    //   var line = this.makeLine([sourceGroup.left + 100, sourceGroup.top + 25, destGroup.left + 100, destGroup.top + 25])
    //   this.canvas.add(line);
    //   sourceGroup.dest = line
    //   destGroup.sour = line
    // }
    // console.log(destGroup.layer_type)
    // console.log(destGroup.sour)
    this.canvas.add(destGroup).setActiveObject(destGroup);
  }

  addBatchNorm(): void {
    // var sourceGroup = this.canvas.getActiveObject();
    var destGroup = this.addRectTextGroup('#388e3c', 'BN')
    // if (sourceGroup) {
    //   var line = this.makeLine([sourceGroup.left + 100, sourceGroup.top + 25, destGroup.left + 100, destGroup.top + 25])
    //   this.canvas.add(line);
    //   sourceGroup.dest = line
    //   destGroup.sour = line
    // }
    this.canvas.add(destGroup).setActiveObject(destGroup);
  }

  addActivation(): void {
    // var sourceGroup = this.canvas.getActiveObject();    
    var destGroup = this.addRectTextGroup('#00796b', 'AC')
    // if (sourceGroup) {
    //   var line = this.makeLine([sourceGroup.left + 100, sourceGroup.top + 25, destGroup.left + 100, destGroup.top + 25])
    //   this.canvas.add(line);
    //   sourceGroup.dest = line
    //   destGroup.sour = line
    // }
    this.canvas.add(destGroup).setActiveObject(destGroup)
  }

  addDropout(): void {
    // var sourceGroup = this.canvas.getActiveObject();    
    var destGroup = this.addRectTextGroup('#1976d2', 'DR')
    // if (sourceGroup) {
    //   var line = this.makeLine([sourceGroup.left + 100, sourceGroup.top + 25, destGroup.left + 100, destGroup.top + 25])
    //   this.canvas.add(line);
    //   sourceGroup.dest = line
    //   destGroup.sour = line
    // }
    this.canvas.add(destGroup).setActiveObject(destGroup)
  }

  TestButton(): void {
    var aObj = this.canvas.getActiveObject();
    console.log(aObj)
    console.log(aObj.top)
    console.log(aObj.left)
  }
  makeLine(coords): any {
    return new fabric.Line(coords, {
      fill: 'red',
      stroke: 'red',
      strokeWidth: 2,
      opacity: 0.3,
      selectable: false
    })
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
