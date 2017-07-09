import { Component, OnInit } from '@angular/core';
import { ColorsService } from '../services/colors';

declare var $: any;
declare var Datamap: any;

@Component({
  selector: 'vector-maps',
  templateUrl: '../maps/vector-maps.html',
  providers: [ColorsService]
})

export class VectorMapsComponent implements OnInit {

  public defaultFill: string;
  public altFill: string;
  public labelFill: string;
  public palettes: Object;
  public palette: Object;
  public colors: Object;

  constructor(private colorsService: ColorsService) {
    this.colors = colorsService.getBootstrapColors();
    const background = $('body').attr('data-background');
    this.palettes = colorsService.getPalettes();
    this.palette = this.palettes[background];
    this.defaultFill = this.palette['even-color'];
    this.altFill = this.palette['even-color'];
    this.labelFill = this.palette['color'];
  }

  ngOnInit() {
    this.worldMap('world', this.defaultFill, this.altFill, this.labelFill, this.colors['danger'], this.colors['warning'], this.colors['info'], this.colors['success']);
    this.usaMap('usa', this.defaultFill, this.altFill, this.labelFill);
    this.worldMapWithBubbles('bubble-map', this.defaultFill, this.altFill, this.colors['warning'], this.colors['warning'], this.colors['warning']);

    const self = this;
    $('body').on('changed:background', function(e, key, value) {
      $('#world').html('');
      $('#usa').html('');
      $('#bubble-map').html('');
      const palettes = self.colorsService.getPalettes();
      const background = $('body').attr('data-background');
      const newPalette = palettes[background];
      const defaultFill = newPalette['even-color'];
      const altFill = newPalette['even-color'];
      const labelFill = newPalette['odd-color'];
      self.worldMap('world', defaultFill, altFill, labelFill, self.colors['danger'], self.colors['warning'], self.colors['info'], self.colors['success']);
      self.usaMap('usa', defaultFill, altFill, labelFill);
      self.worldMapWithBubbles('bubble-map', defaultFill, altFill, self.colors['warning'], self.colors['warning'], self.colors['warning']);
    });
  }

  worldMap(id: string, defaultFill: string, altFill: string, labelFill: string, dangerFill: string, warningFill: string, infoFill: string, successFill: string): void {
    const world = new Datamap({
      element: document.getElementById(id),
      responsive: true,
      projection: 'mercator',
      fills: {
        defaultFill: defaultFill,
        altFill: altFill,
        labelFill: labelFill,
        dangerFill: dangerFill,
        warningFill: warningFill,
        infoFill: infoFill,
        successFill: successFill
      },
      geographyConfig: {
        borderWidth: 1,
        borderOpacity: 1,
        borderColor: altFill,
        highlightOnHover: true,
        highlightFillColor: altFill,
        highlightBorderColor: altFill,
        highlightBorderWidth: 1,
        highlightBorderOpacity: 1
      },
      labels: {
        labelColor: 'labelFill',
        fontSize: 12
      },
      data: {
        AUS: {
          fillKey: 'infoFill'
        },
        JPN: {
          fillKey: 'dangerFill'
        },
        ITA: {
          fillKey: 'altFill'
        },
        BRA: {
          fillKey: 'successFill'
        },
        DEU: {
          fillKey: 'warningFill'
        },
      }
    });
    window.addEventListener('resize', function() {
      world.resize();
    });
  }

  usaMap(id: string, defaultFill: string, altFill: string, labelColor: string) {
    const USmap = new Datamap({
      element: document.getElementById(id),
      scope: 'usa', //currently supports 'usa' and 'world', however with custom map data you can specify your own
      projection: 'equirectangular', //style of projection to be used. try 'mercator'
      responsive: true,
      fills: {
        defaultFill: defaultFill
      },
      geographyConfig: {
        borderWidth: 1,
        borderOpacity: 1,
        borderColor: altFill,
        highlightOnHover: true,
        highlightFillColor: altFill,
        highlightBorderColor: altFill,
        highlightBorderWidth: 1,
        highlightBorderOpacity: 1,
        popupTemplate: function(geography: any, data: any) {
          return '<div class="hoverinfo">' + geography.properties.name + '</div>';
        }
      }
    });
    USmap.labels({
      labelColor: labelColor,
      fontSize: 12
    });
    window.addEventListener('resize', function() {
      USmap.resize();
    });
  }

  worldMapWithBubbles(id: string, defaultFill: string, altFill: string, borderColor: string, highlightFillColor: string, highlightBorderColor: string) {
    const bubbleMap = new Datamap({
      element: document.getElementById(id),
      scope: 'world',
      projection: 'mercator',
      responsive: true,
      fills: {
        defaultFill: defaultFill
      },
      geographyConfig: {
        popupOnHover: false,
        borderWidth: 1,
        borderOpacity: 1,
        borderColor: altFill,
        highlightOnHover: true,
        highlightFillColor: altFill,
        highlightBorderColor: altFill,
        highlightBorderWidth: 1,
        highlightBorderOpacity: 1,
        popupTemplate: function(geography: any, data: any) {
          return '<div class="hoverinfo">' + geography.properties.name + '</div>';
        }
      }
    });
    const bubbles = [{
      name: 'Bubble 1',
      radius: 25,
      latitude: 0,
      longitude: 0
    }, {
      name: 'Bubble 2',
      radius: 25,
      latitude: 50,
      longitude: 0
    }, {
      name: 'Bubble 3',
      radius: 25,
      latitude: -33,
      longitude: -70
    }, {
      name: 'Bubble 4',
      radius: 45,
      latitude: 50,
      longitude: -78
    }, {
      name: 'Bubble 5',
      radius: 45,
      latitude: 50,
      longitude: 120
    },];
    bubbleMap.bubbles(bubbles, {
      borderWidth: 1,
      borderOpacity: 1,
      borderColor: borderColor,
      highlightFillColor: highlightFillColor,
      highlightBorderColor: highlightBorderColor,
      popupTemplate: function(geo: any, data: any) {
        return ['<div class="hoverinfo">' + data.name,
          '</div>'
        ].join('');
      }
    });
    window.addEventListener('resize', function() {
      bubbleMap.resize();
    });
  }
}


