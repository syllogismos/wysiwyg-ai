import { Injectable } from '@angular/core';

declare var fabric: any;
declare var $: any;
declare var ResizeSensor: any;
declare var _: any;


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
  localNetworkName = 'local name'
  currentLayerId = 0
  currentLayer: any
  layerColors = {
    "CN": "#303f9f",
    "AF": "#424242",
    "AC": "#00796b",
    "BN": "#388e3c",
    "DR": "#1976d2",
    "PL": "#ffa000",
    "RS": "#dff0d8"
  }

  defaultLayerConfigs = {
    "CN": {
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
    }
  }


  constructor() { }

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
    })

    this.canvas.on('object:selected', options => {
      var object = options.target
      if (object.layer_type != null) {
        this.currentLayer = object
        console.log(object.layerConfig)
      } else {
        this.currentLayer = null
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

}
