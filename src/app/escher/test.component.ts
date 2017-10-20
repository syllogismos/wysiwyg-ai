import { Component, OnInit } from '@angular/core';
import { EscherService } from "./escher.service";

declare var $: any;
declare var d3: any;
declare var Raphael: any;
declare var fabric: any;
declare var _: any;
declare var ResizeSensor: any;

import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: [
    './test.component.scss',
  ],
  providers: [
    EscherService
  ]
})

export class TestComponent implements OnInit {

  constructor(
    private escherService: EscherService
  ) { }

  canvas: any;
  canvasWrapper: any;
  _clipboard: any;
  grid: number = 50;
  gridSmall: number = 50;
  top: number = 50;
  left: number = 50;
  connectionInput: any;
  connectionOutput: any;
  connectLineFlag: boolean = false;
  disconnectLineFlag: boolean = false;
  relativePanX: number = 0
  relativePanY: number = 0
  layerColors = {
    "CN": "#303f9f",
    "AF": "#424242",
    "AC": "#00796b",
    "BN": "#388e3c",
    "DR": "#1976d2",
    "PL": "#ffa000"
  }

  resizeCanvas() {
    this.canvas.setWidth(this.canvasWrapper.width());
    this.canvas.renderAll();
  }
  
  ngOnInit() {

    /**
     * https://jsfiddle.net/krunalhshah/qcqa1oe9
     * https://blog.thirdrocktechkno.com/how-to-draw-an-arrow-using-html-5-canvas-and-fabricjs-9500c3f50ecb
     * LineArrow lifted from this fiddle
     */
    fabric.LineArrow = fabric.util.createClass(fabric.Line, {

      type: 'lineArrow',

      initialize: function (element, options) {
        options || (options = {});
        this.callSuper('initialize', element, options);
      },

      toObject: function () {
        return fabric.util.object.extend(this.callSuper('toObject'));
      },

      _render: function (ctx) {
        this.callSuper('_render', ctx);

        // do not render if width/height are zeros or object is not visible
        if (this.width === 0 || this.height === 0 || !this.visible) return;

        ctx.save();

        var xDiff = this.x2 - this.x1;
        var yDiff = this.y2 - this.y1;
        var angle = Math.atan2(yDiff, xDiff);
        ctx.translate((this.x2 - this.x1) / 2, (this.y2 - this.y1) / 2);
        ctx.rotate(angle);
        ctx.beginPath();
        //move 10px in front of line to start the arrow so it does not have the square line end showing in front (0,0)
        ctx.moveTo(10, 0);
        ctx.lineTo(-10, 10);
        ctx.lineTo(-10, -10);
        ctx.closePath();
        ctx.fillStyle = this.stroke;
        ctx.fill();

        ctx.restore();

      }
    });

    fabric.LineArrow.fromObject = function (object, callback) {
      callback && callback(new fabric.LineArrow([object.x1, object.y1, object.x2, object.y2], object));
    };

    fabric.LineArrow.async = true;
      

    $('[data-toggle="tooltip"]').tooltip();
    this.canvas = new fabric.Canvas('canvas')
    this.canvasWrapper = $("#canvasWrapper")

    new ResizeSensor(this.canvasWrapper, e => {
      this.canvas.setWidth(this.canvasWrapper.width());
      this.canvas.renderAll();
    })

    // resize on init
    this.canvas.setHeight(900);
    this.resizeCanvas();
    

    $("#canvasWrapper").on('mousedown', e => {
      this.startPan(this.canvas, e);
    });

    fabric.Canvas.prototype.set({
      // use the default cursor when "not allowed action" on fabric canvas
      notAllowedCursor: "default",
    });

    fabric.Object.prototype.set({
      transparentCorners: false,
      borderColor: '#32424a',
      cornerColor: '#263238',
      cornerSize: 5,
      lockRotation: true,
      hasRotatingPoint: false,
      lockScalingX: true,
      lockScalingY: true
    })

    this.buildSupportGrid();
    this.loadCanvasFromCustomSerializedString(this.escherService.msnit);
    // this.loadResnet18();
    // this.loadCanvasFromString(this.escherService.sample_canvas);

    this.canvas.on('mouse:down', options => {
      // console.log(options.e)
      // console.log(options.e.layerX, options.e.layerY)
      // console.log(this.relativePanX, this.relativePanY)
      // console.log(options.e.layerX - this.relativePanX, options.e.layerY - this.relativePanY)
      this.top = options.e.layerY - this.relativePanY
      this.left = options.e.layerX - this.relativePanX
      this.top = Math.round(this.top / this.gridSmall) * this.gridSmall
      this.left = Math.round(this.left / this.gridSmall) * this.gridSmall
    })

    this.canvas.on('object:selected', options => {
      var object = options.target
      // if (object.layer_type != null) {
      //   console.log(object.outputs)
      //   console.log(object.inputs)
      // }
      // console.log(object)
      // console.log(object.layer_type)
      if ((this.connectLineFlag || this.disconnectLineFlag) && object.layer_type) {
        // console.log(this.connectionInput)
        // console.log(this.connectionOutput)
        // console.log(this.connectLineFlag)
        if (this.connectionInput == null) {
          // console.log('input is null and connect flag is true')
          this.connectionInput = object
        } else {
          // console.log('input is exists and connect falg is true')
          this.connectionOutput = object
          if (this.connectLineFlag) {
            var line = this.makeLine([this.connectionInput.left + 100, this.connectionInput.top + 25, this.connectionOutput.left + 100, this.connectionOutput.top + 25])
            line.source = this.connectionInput;
            line.dest = this.connectionOutput;
            this.connectionInput.outputs = this.connectionInput.outputs.concat(line);
            this.connectionOutput.inputs = this.connectionOutput.inputs.concat(line);
            this.canvas.add(line);
            this.connectLineFlag = false;
            this.connectionInput = null;
            this.connectionOutput = null;
          } else {
            var lines = _.intersection(this.connectionInput.outputs, this.connectionOutput.inputs);
            if (lines.length) {
              this.canvas.remove.apply(this.canvas, lines);
            }
            this.disconnectLineFlag = false;
            this.connectionInput = null;
            this.connectionOutput = null;
          }
        }
      }
    });

    this.canvas.on('object:moving', options => {
      
      var object = options.target;
      
      object.set({
        left: Math.round(options.target.left / this.gridSmall) * this.gridSmall,
        top: Math.round(options.target.top / this.gridSmall) * this.gridSmall
      });
      
      if (object.layer_type != null) {
        for (var line of object.inputs) {
          line.set({ x2: object.left + 100, y2: object.top + 25 })
        }
      
        for (var line of object.outputs) {
          line.set({ x1: object.left + 100, y1: object.top + 25 })
        }
      }
      
      for (var groupObject of object._objects) {
        // console.log(groupObject.layer_type);
        if (groupObject.layer_type != null) {
          // console.log(object.left, object.top, object.width, object.height)
          // console.log(groupObject.left, groupObject.top)
          for (var line of groupObject.inputs) {
            line.set({ x2: object.left + groupObject.left + object.width / 2 + 100, y2: object.top + object.height / 2 + groupObject.top + 25 })
          }
          for (var line of groupObject.outputs) {
            line.set({ x1: object.left + groupObject.left + object.width / 2 + 100, y1: object.top + object.height / 2 + groupObject.top + 25 })
          }
        }
      }

    });
    

  }

  /**
   * Create a group of fabric Objects, that contain a rectangle, Text, and a small circle
   * in the center of the rectangle.
   * @param color of the rect box
   * @param label of the rect box
   *
   * Return the fabric Group
   */
  addRectTextGroup(color, label, coords): any {

    var circle = new fabric.Circle({
      radius: 2,
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
      opacity: 0.6,
      strokeWidth: 2,
      stroke: 'black'
      // originX: 'center',
      // originY: 'center'
    })
    var text = new fabric.Text(label, {
      fontSize: 20,
      fontFamily: 'Arial Regular'
      // originX: 'center',
      // originY: 'center'
    })
    var group = new fabric.Group([rect, text, circle], {
      left: coords[0],
      top: coords[1]
    })

    group.layer_type = label;

    return group;
  }

  addConnection(): void {
    this.canvas.discardActiveObject().renderAll()
    this.connectLineFlag = true
    this.disconnectLineFlag = false
    this.connectionInput = null
    this.connectionOutput = null
  }

  removeConnection(): void {
    this.canvas.discardActiveObject()    
    this.disconnectLineFlag = true
    this.connectLineFlag = false
    this.connectionInput = null
    this.connectionOutput = null
  }

  refreshCanvas(): void {
    this.saveCanvas();
    this.loadCanvas();
  }

  loadResnet18(): void {
    var canvasSerialized = this.escherService.resnet18;
    this.clearCanvas()
    this.loadCanvasFromCustomSerializedString(canvasSerialized)
  }

  addLayer(label): void {
    var sourceGroup = this.canvas.getActiveObject();
    var destGroup = this.addRectTextGroup(this.layerColors[label], label, [this.left, this.top])
    if (sourceGroup && sourceGroup.layer_type) {
      var line = this.makeLine([sourceGroup.left + 100, sourceGroup.top + 25, destGroup.left + 100, destGroup.top + 25])
      this.canvas.add(line);
      line.source = sourceGroup;
      line.dest = destGroup;
      sourceGroup.outputs = sourceGroup.outputs.concat(line);
      destGroup.inputs = [line]
    } else {
      destGroup.inputs = []
    }
    destGroup.outputs = []
    console.log(destGroup.layer_type)
    this.canvas.add(destGroup).setActiveObject(destGroup);
  }

  addConvLayer(): void {
    this.addLayer("CN")
    this.top += 50;
  }

  addAffine(): void {
    this.addLayer('AF')
    this.top += 50;
  }

  addBatchNorm(): void {
    this.addLayer('BN')
    this.top += 50;
  }

  addActivation(): void {
    this.addLayer('AC')
    this.top += 50;
  }

  addDropout(): void {
    this.addLayer('DR')
    this.top += 50;    
  }

  addPoolLayer(): void {
    this.addLayer('PL')
    this.top += 50;
  }

  TestButton(): void {
    console.log(JSON.stringify(this.canvas));
  }
  makeLine(coords): any {
    // return new fabric.Line(coords, {
    return new fabric.LineArrow(coords, {
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

  buildSupportGrid(): void {
    for (var i = 0; i < (6000 / this.grid); i++) {
      this.canvas.add(new fabric.Line([i * this.grid, 0, i * this.grid, 6000], { stroke: '#F0E7E7', selectable: false }));
      this.canvas.add(new fabric.Line([0, i * this.grid, 6000, i * this.grid], { stroke: '#F0E7E7', selectable: false }));
    }
  }

  /**
   * Custom serialization function
   * Get all the layer objects, and for each layer store their location
   * the type of the layer, and their connections with other layers
   */
  saveCanvas(): void {
    var allObjects = this.canvas.getObjects();
    var allLayerObjs = _.filter(allObjects, obj => (obj.type != 'line' && obj.type != 'lineArrow'))
    // console.log(allLayerObjs)
    var serializedCanvas = _.map(allLayerObjs, obj => this.serializeLayer(obj, allLayerObjs))
    // console.log(JSON.stringify(serializedCanvas));
    // console.log(JSON.parse(JSON.stringify(serializedCanvas)));
    localStorage.setItem('resnet18', JSON.stringify(serializedCanvas));
  }

  serializeLayer(obj, allLayerObjs): any {
    if (obj.type != 'line' && obj.type != 'lineArrow') {
      var destLayers = _.map(obj.outputs, line => line.dest)
      var destLayersIndices = _.map(destLayers, obj => _.indexOf(allLayerObjs, obj))
      destLayersIndices = _.filter(destLayersIndices, ind => ind != -1)
      var sourceLayers = _.map(obj.inputs, line => line.source)
      var sourceLayersIndices = _.map(sourceLayers, obj => _.indexOf(allLayerObjs, obj))
      sourceLayersIndices = _.filter(sourceLayersIndices, ind => ind != -1)
      return {
        coords: [obj.left, obj.top],
        layer_type: obj.layer_type,
        inputs: sourceLayersIndices,
        outputs: destLayersIndices
      }
    }
  }

  /**
   * Save the serialized canvas version into local storage
   */
  saveCanvasOld(): void {
    localStorage.setItem('fabricCanvas', JSON.stringify(this.canvas.toJSON()));
  }

  loadCanvasFromString(stringCanvas): void {
    this.canvas.clear();
    this.canvas.loadFromJSON(stringCanvas);
    for (var obj of this.canvas._objects) {
      if (obj.type == 'line') {
        obj.set({
          selectable: false
        })
      }
    }
    this.canvas.requestRenderAll();
  };

  loadCanvas(): void {
    this.clearCanvas();
    var storageKey = 'resnet18';
    var fabric_custom_serialized_string = localStorage.getItem(storageKey);
    if (fabric_custom_serialized_string == null) {
      console.log('no resnet18 model stored on disk')
    } else {
      this.loadCanvasFromCustomSerializedString(fabric_custom_serialized_string)
    }
  }

  loadCanvasFromCustomSerializedString(stringCanvas): void {
    var serializedCanvas = JSON.parse(stringCanvas);
    var newObjects = []
    var newObject: any;
    var layer_type;
    var coords;
    for (var serializedObj of serializedCanvas) {
      coords = serializedObj.coords
      layer_type = serializedObj.layer_type
      newObject = this.addRectTextGroup(this.layerColors[layer_type], layer_type, coords)
      newObject.inputs = []
      newObject.outputs = []
      newObjects = newObjects.concat(newObject)
      this.canvas.add(newObject)
    }

    var destLayersIndices;
    for (var i = 0; i < serializedCanvas.length; i++) {
      destLayersIndices = serializedCanvas[i].outputs;
      for (var ind of destLayersIndices) {
        var line = this.makeLine([newObjects[i].left + 100, newObjects[i].top + 25, newObjects[ind].left + 100, newObjects[ind].top + 25])
        this.canvas.add(line);
        line.source = newObjects[i]
        line.dest = newObjects[ind];
        newObjects[i].outputs = newObjects[i].outputs.concat(line);
        newObjects[ind].inputs = newObjects[ind].inputs.concat(line);
      }
    }

    this.canvas.discardActiveObject();
    
    this.canvas.requestRenderAll();
  }

  /**
   * load canvas from fabric canvas serialized json stored in localStorage
   */
  loadCanvasOld(): void {
    var fabric_canvas_string = localStorage.getItem('fabricCanvas')
    if (fabric_canvas_string == null){
      fabric_canvas_string = this.escherService.sample_canvas;
    }
    this.loadCanvasFromString(fabric_canvas_string);
  }

  /**
   * clear the canvas board and make it blank
   */
  clearCanvas(): void {
    this.canvas.clear();
    this.buildSupportGrid();
    this.canvas.requestRenderAll();
    this.top = 50;
  }


  /**
   * Save network built in the canvas in mongo after serializing the canvas objects
   * ignore the grid lines before serializing
   */
  SaveNetwork(): void {

  }

  /**
   * Function that copies the selected fabric objects to clipboard
   */
  Copy(): void {
    // clone what are you copying since you
    // may want copy and paste on different moment.
    // and you do not want the changes happened
    // later to reflect on the copy.
    // this.canvas.getActiveObject().clone(cloned => {
    //   this._clipboard = cloned;
    // });
    var activeObject = this.canvas.getActiveObject()
    this._clipboard = {
      objects: this.canvas.getActiveObjects(),
      relativeTop: activeObject.top + activeObject.height/2,
      relativeLeft: activeObject.left + activeObject.width/2
    };
  }
  /**
   * Function that pastes fabric objects in clipboard on to canvas
   */
  PasteOld(): void {
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

  Paste(): void {
    // console.log(this.canvas.getActiveObjects())
    // console.log(this._clipboard.objects.length)
    if (this._clipboard.objects.length && this._clipboard.objects.length > 1) {
      // case when multiple layers are selected, you recreate all the layers seperately
      // and within in the selection create the connections/arrows as well
      var newObjects = [];
      var newObject: any;
      var coords = [0, 0]
      for (var object of this._clipboard.objects) {
        coords = [object.left + this._clipboard.relativeLeft + 50, object.top + this._clipboard.relativeTop + 50]
        newObject = this.addRectTextGroup(this.layerColors[object.layer_type], object.layer_type, coords)
        newObject.inputs = []
        newObject.outputs = []
        newObjects = newObjects.concat(newObject)  
        this.canvas.add(newObject)
      }
      // this.canvas.discardActiveObject();
      // var selection = new fabric.ActiveSelection(newObjects, {
      //   canvas: this.canvas
      // })
      // this.canvas.setActiveObject(selection)

      var destLayers
      var destLayersIndices
      var object
      // var i
      for (var i = 0; i < this._clipboard.objects.length; i++) {
        object = this._clipboard.objects[i]
        destLayers = _.map(object.outputs, line => line.dest)
        // console.log(destLayers)
        destLayersIndices = _.map(destLayers, obj => _.indexOf(this._clipboard.objects, obj))
        destLayersIndices = _.filter(destLayersIndices, ind => ind != -1)
        // console.log(destLayersIndices)
        for (var ind of destLayersIndices) {
          // console.log("adding line")
          // console.log([newObjects[i].left + 100, newObjects[i].top + 25, newObjects[ind].left + 100, newObjects[ind].top + 25])
          var line = this.makeLine([newObjects[i].left + 100, newObjects[i].top + 25, newObjects[ind].left + 100, newObjects[ind].top + 25])
          this.canvas.add(line);
          line.source = newObjects[i];
          line.dest = newObjects[ind];
          newObjects[i].outputs = newObjects[i].outputs.concat(line);
          newObjects[ind].inputs = newObjects[ind].inputs.concat(line);
        }
      }

      this.canvas.discardActiveObject();
      var selection = new fabric.ActiveSelection(newObjects, {
        canvas: this.canvas
      })
      this.canvas.setActiveObject(selection)

      

      this.canvas.requestRenderAll()
    } else if (this._clipboard.objects.length && this._clipboard.objects.length == 1) {
      // when only one layer was in the clipboard, you just create a new layer of that type
      // just below the old one.
      var layer = this._clipboard.objects[0]
      var layer_type = layer.layer_type;
      var newLayer = this.addRectTextGroup(this.layerColors[layer_type], layer_type, [layer.left, layer.top + 50])
      newLayer.inputs = []
      newLayer.outputs = []
      this.canvas.add(newLayer)
      this.canvas.setActiveObject(newLayer).renderAll()
    }
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
    var self = this
    var x0 = event.screenX,
      y0 = event.screenY;
    function continuePan(event) {
      var x = event.screenX,
        y = event.screenY;
      canvas.relativePan({ x: x - x0, y: y - y0 });
      self.relativePanX += x - x0
      self.relativePanY += y - y0
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
    var lines = []
    for (var object of activeObjects) {
      if (object.layer_type != null) {
        lines = lines.concat(object.inputs)
        lines = lines.concat(object.outputs)
      }
    }
    lines = _.uniq(lines)
    this.canvas.discardActiveObject();
    if (activeObjects.length) {
      // console.log("lol")
      // activeObject.remove();
      this.canvas.remove.apply(this.canvas, activeObjects.concat(lines));
    }
    this.canvas.renderAll();
  }

  DeleteAll(): void {
    this.canvas.clear();
  }

}