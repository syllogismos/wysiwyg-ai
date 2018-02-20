import { Injectable } from '@angular/core';
import { EscherService } from 'app/escher/escher.service';
import { Http } from "@angular/http";

declare var fabric: any;
declare var $: any;
declare var ResizeSensor: any;
declare var _: any;
declare var toastr: any;


import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EditorService {

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
  relativePanX: number = 0;
  relativePanY: number = 0
  localNetworkName = 'my model'
  newLayerIndex = 0
  currentLayer: any
  gradientData: any
  currentLayerGrads: any
  layerColors = {
    "CN": "#303f9f",
    "AF": "#424242",
    "AC": "#00796b",
    "BN": "#388e3c",
    "DR": "#1976d2",
    "PL": "#ffa000",
    "RS": "#dff0d8",
    "ML": "#ff5733"
  }

  defaultLayerConfigs = {
    "CN": {
      conv_type: "Conv2d", // Conv2d, ConvTranspose2d
      in_channels: "64",
      out_channels: "64",
      kernel_size: "3",
      stride: "1",
      padding: "0"
    },
    "AF": {
      in_features: "64",
      out_features: "64"
    },
    "AC": {
      activation_fn: "ReLU"
    },
    "BN": {
      num_features: "64",
      epsilon: "0.00001",
      momentum: "0.1"
    },
    "DR": {
      percent: "0.5"
    },
    "PL": {
      pool_type: "maxpool",
      kernel_size: "3",
      stride: "",
      padding: "0"
    },
    "RS": {
      x: "",
      y: ""
    },
    "ML": {
      merge_type: "Sum", // concat, sum, average
      dim: 1
    }
  }


  constructor(
    private escherService: EscherService,
    private http: Http
  ) { }

  init(canvas: any, canvasWrapper: any): void {
    this.initFabric()
    this.canvas = canvas
    this.canvasWrapper = canvasWrapper

    new ResizeSensor(this.canvasWrapper, e => {
      this.canvas.setWidth(this.canvasWrapper.width());
      console.log(this.canvasWrapper.innerHeight());
      this.canvas.setHeight(800);
      this.canvas.renderAll();
    })

    this.canvas.setHeight(this.canvasWrapper.innerHeight());
    this.resizeCanvas();

    this.registerEventListners()
    this.buildSupportGrid()
  }

  loadModel(networkString): void {
    this.clearCanvas()
    this.loadCanvasFromCustomSerializedString(networkString)
  }

  loadGradientData(gradientData): void {
    this.gradientData = gradientData
    if (this.currentLayer && this.gradientData) {
      this.currentLayerGrads = this.gradientData[this.currentLayer.layerConfig.layer_id]
    } else {
      this.currentLayerGrads = undefined
    }
  }

  resizeCanvas(): void {
    this.canvas.setWidth(this.canvasWrapper.width());
    this.canvas.setHeight(800);
    this.canvas.renderAll()
  }
  initFabric(): void {
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
  }

  registerEventListners(): any {
    this.canvas.on('mouse:down', options => {
      this.top = options.e.layerY - this.relativePanY
      this.left = options.e.layerX - this.relativePanX
      this.top = Math.round(this.top / this.gridSmall) * this.gridSmall
      this.left = Math.round(this.left / this.gridSmall) * this.gridSmall
    })

    this.canvas.on('selection:cleared', options => {
      this.currentLayer = null
      if (this.gradientData) {
        this.currentLayerGrads = null
      }
    })

    this.canvas.on('object:selected', options => {
      var object = options.target
      if (object.layer_type != null) {
        this.currentLayer = object
        // console.log(object.layerConfig)
        if (this.gradientData) {
          this.currentLayerGrads = this.gradientData[this.currentLayer.layerConfig.layer_id]
          // console.log(this.currentLayerGrads)
        }
      } else {
        this.currentLayer = null
        if (this.gradientData) {
          this.currentLayerGrads = null
        }
      }
      if ((this.connectLineFlag || this.disconnectLineFlag) && object.layer_type) {
        if (this.connectionInput == null) {
          this.connectionInput = object
        } else {
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
              this.connectionInput.outputs = _.difference(this.connectionInput.outputs, lines)
              this.connectionOutput.inputs = _.difference(this.connectionOutput.inputs, lines)
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

    this.canvasWrapper.on('mousedown', e => {
      this.startPan(this.canvas, e);
    })
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
    this.canvas.discardActiveObject().requestRenderAll()
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
      // refreshes the canvas, because connecting lines disappear while panning
      // self.refreshCanvas()
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

  refreshCanvas(): void {
    this.saveCanvas();
    this.loadCanvas();
  }


  serializeCanvas(): string {
    var allObjects = this.canvas.getObjects();
    var allLayerObjs = _.filter(allObjects, obj => (obj.type != 'line' && obj.type != 'lineArrow'))
    var serializedCanvas = _.map(allLayerObjs, obj => this.serializeLayer(obj, allLayerObjs))
    return JSON.stringify(serializedCanvas)
  }

  /**
   * Custom serialization function
   * Get all the layer objects, and for each layer store their location
   * the type of the layer, and their connections with other layers
   */
  saveCanvas(): void {
    localStorage.setItem('localFabricName', this.localNetworkName)
    var json_string = this.serializeCanvas()
    localStorage.setItem('localFabricCanvas', json_string);
  }

  loadCanvas(): void {
    this.clearCanvas();
    var storageKey = 'localFabricCanvas';
    this.localNetworkName = localStorage.getItem('localFabricName');
    var fabric_custom_serialized_string = localStorage.getItem(storageKey);
    if (fabric_custom_serialized_string == null) {
      console.log('no local fabric canvas model stored on disk')
    } else {
      this.loadCanvasFromCustomSerializedString(fabric_custom_serialized_string)
    }
  }

  serializeLayer(obj, allLayerObjs): any {
    if (obj.type != 'line' && obj.type != 'lineArrow') {
      var destLayers = _.map(obj.outputs, line => line.dest)
      var destLayersIndices = _.map(destLayers, obj => _.indexOf(allLayerObjs, obj))
      destLayersIndices = _.filter(destLayersIndices, ind => ind != -1)
      var sourceLayers = _.map(obj.inputs, line => line.source)
      var sourceLayersIndices = _.map(sourceLayers, obj => _.indexOf(allLayerObjs, obj))
      sourceLayersIndices = _.filter(sourceLayersIndices, ind => ind != -1)
      var layerConfig;
      if (obj.layerConfig) {
        layerConfig = obj.layerConfig
      } else {
        layerConfig = {}
      }
      return {
        coords: [obj.left, obj.top],
        layer_type: obj.layer_type,
        inputs: sourceLayersIndices,
        outputs: destLayersIndices,
        layerConfig: layerConfig
      }
    }
  }

  /**
   * Create a group of fabric Objects, that contain a rectangle, Text, and a small circle
   * in the center of the rectangle.
   * @param color of the rect box
   * @param label of the rect box
   *
   * Return the fabric Group
   */
  addRectTextGroup(color, label, coords, layerConfig): any {

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
    group.layerConfig = layerConfig;

    return group;
  }

  addLayer(label): void {
    var sourceGroup = this.canvas.getActiveObject();
    // we maintain a layer id for each layer, and increment it everytime we add a new layer
    // layerConfig['layer_id'] = this.currentLayerId++
    var currentLayerConfig = JSON.parse(JSON.stringify(this.defaultLayerConfigs[label]))
    currentLayerConfig['layer_id'] = this.newLayerIndex++
    var destGroup = this.addRectTextGroup(this.layerColors[label], label, [this.left, this.top], currentLayerConfig)
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
    this.top += 50
  }

  loadCanvasFromCustomSerializedString(stringCanvas): void {
    var serializedCanvas = JSON.parse(stringCanvas);
    var newObjects = []
    var newObject: any;
    var layer_type;
    var coords;
    var layerConfig;
    for (var serializedObj of serializedCanvas) {
      coords = serializedObj.coords
      layer_type = serializedObj.layer_type
      if (serializedObj.layerConfig) {
        layerConfig = serializedObj.layerConfig
      } else {
        layerConfig = {}
      }
      newObject = this.addRectTextGroup(this.layerColors[layer_type], layer_type, coords, layerConfig)
      newObject.inputs = []
      newObject.outputs = []
      newObjects = newObjects.concat(newObject)
      this.canvas.add(newObject)
    }

    var maxLayerId = _.max(_.map(newObjects, x => x.layerConfig.layer_id))
    // console.log(newObjects)
    // console.log(_.map(newObjects, x => x.layerConfig.layer_id))
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@")
    console.log(maxLayerId)
    this.newLayerIndex = maxLayerId + 1
    console.log(this.newLayerIndex)

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
   * clear the canvas board and make it blank
   */
  clearCanvas(): void {
    this.canvas.clear();
    this.buildSupportGrid();
    this.canvas.requestRenderAll();
    this.top = 50;
    this.localNetworkName = "new name"
    this.newLayerIndex = 0
  }

  buildSupportGrid(): void {
    for (var i = 0; i < (6000 / this.grid); i++) {
      this.canvas.add(new fabric.Line([i * this.grid, 0, i * this.grid, 6000], { stroke: '#F0E7E7', selectable: false }));
      this.canvas.add(new fabric.Line([0, i * this.grid, 6000, i * this.grid], { stroke: '#F0E7E7', selectable: false }));
    }
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

  loadResnet18(): void {
    var canvasSerialized = this.escherService.resnet18;
    this.clearCanvas()
    this.localNetworkName = "RESNET18"
    this.loadCanvasFromCustomSerializedString(canvasSerialized)
  }

  loadMNIST(): void {
    this.clearCanvas()
    this.loadCanvasFromCustomSerializedString(this.escherService.mnist);
    this.localNetworkName = 'MNIST'
  }



  saveToDb(): void {
    var allObjects = this.canvas.getObjects();
    var name = this.localNetworkName
    var allLayerObjs = _.filter(allObjects, obj => (obj.type != 'line' && obj.type != 'lineArrow'))
    var serializedCanvas = _.map(allLayerObjs, obj => this.serializeLayer(obj, allLayerObjs))
    var network = JSON.stringify(serializedCanvas);
    this.http.post('/api/savennmodel', {
      name: name,
      network: network
    }).toPromise()
      .then(response => {
        console.log(response)
        toastr.options = {
          iconClass: '',
          positionClass: 'toast-top-right',
          progressBar: true,
          timeOut: 3000
        }
        var response_json = response.json()
        if (response_json.saved) {
          toastr.info(response_json['message'])
        } else {
          toastr.info(response_json['message'])
        }
      }).catch(this.handleHttpError)
  }

  Paste(): void {
    // console.log(this.canvas.getActiveObjects())
    // console.log(this._clipboard.objects.length)
    if (this._clipboard.objects.length && this._clipboard.objects.length > 1) {
      this.canvas.discardActiveObject()
      // case when multiple layers are selected, you recreate all the layers seperately
      // and within in the selection create the connections/arrows as well
      var newObjects = [];
      var newObject: any;
      var newLayerConfig;
      var coords = [0, 0]
      console.log([this._clipboard.relativeLeft, this._clipboard.relativeTop])
      for (var object of this._clipboard.objects) {
        console.log([object.left, object.top])
        coords = [object.left + 50, object.top + 50]
        newLayerConfig = JSON.parse(JSON.stringify(object.layerConfig))
        newLayerConfig['layer_id'] = this.newLayerIndex++
        newObject = this.addRectTextGroup(this.layerColors[object.layer_type], object.layer_type, coords, newLayerConfig)
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
      var newLayer = this.addRectTextGroup(this.layerColors[layer_type], layer_type, [layer.left, layer.top + 50], layer.layerConfig)
      newLayer.inputs = []
      newLayer.outputs = []
      this.canvas.add(newLayer)
      this.canvas.setActiveObject(newLayer).renderAll()
    }
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
      relativeTop: activeObject.top + activeObject.height / 2,
      relativeLeft: activeObject.left + activeObject.width / 2
    };
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

  private handleHttpError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
