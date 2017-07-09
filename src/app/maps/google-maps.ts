import { Component, OnInit } from '@angular/core';
import { ColorsService } from '../services/colors';

declare var google: any;

@Component({
  selector: 'google-maps',
  templateUrl: '../maps/google-maps.html',
  providers: [ColorsService]
})

export class GoogleMapsComponent implements OnInit {

  public colors: Object;
  constructor(private colorsService: ColorsService) {
    this.colors = colorsService.getBootstrapColors();
  }

  ngOnInit() {
    this.googleMapSimple();
    this.googleMapGeolocation();
    this.googleMapStyled(this.colors);
    this.googleMapTransit();
    this.googleMapBicycling();
    this.googleMapStreetView();
  }

  googleMapSimple(): void {
    new google.maps.Map(document.getElementById('simple'), {
      center: {
        lat: -34.397,
        lng: 150.644
      },
      zoom: 8
    });
  }
  //geolocation
  //// Note: This example requires that you consent to location sharing when
  // prompted by your browser. If you see the error "The Geolocation service
  // failed.", it means you probably did not give permission for the browser to
  // locate you.
  googleMapGeolocation(): void {
    const map = new google.maps.Map(document.getElementById('geolocation'), {
      center: {
        lat: -34.397,
        lng: 150.644
      },
      zoom: 6
    });
    const infoWindow = new google.maps.InfoWindow({
      map: map
    });
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        map.setCenter(pos);
      }, function() {
        this.handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  handleLocationError(browserHasGeolocation: boolean, infoWindow: any, pos: any): void {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
  }
  //styled
  googleMapStyled(colors: Object) {
    const customMapType = new google.maps.StyledMapType([{
      stylers: [{
        hue: this.colors['primary']
      }, {
        visibility: 'simplified'
      }, {
        gamma: 0.5
      }, {
        weight: 0.5
      }]
    }, {
      elementType: 'labels',
      stylers: [{
        visibility: 'off'
      }]
    }, {
      featureType: 'water',
      stylers: [{
        color: this.colors['danger']
      }]
    }], {
        name: 'Custom Style'
      });
    const customMapTypeId = 'custom_style';
    const map = new google.maps.Map(document.getElementById('styled'), {
      zoom: 12,
      center: {
        lat: 40.674,
        lng: -73.946
      }, // Brooklyn.
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
      }
    });
    map.mapTypes.set(customMapTypeId, customMapType);
    map.setMapTypeId(customMapTypeId);
  }

  googleMapTransit(): void {
    const map = new google.maps.Map(document.getElementById('transit-layer'), {
      zoom: 13,
      center: {
        lat: 51.501904,
        lng: -0.115871
      }
    });
    const transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);
  }

  googleMapBicycling(): void {
    const map = new google.maps.Map(document.getElementById('bicycling-layer'), {
      zoom: 14,
      center: {
        lat: 42.3726399,
        lng: -71.1096528
      }
    });
    const bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);
  }

  googleMapStreetView(): void {
    new google.maps.StreetViewPanorama(
      document.getElementById('street-view'), {
        position: {
          lat: 37.869260,
          lng: -122.254811
        },
        pov: {
          heading: 165,
          pitch: 0
        },
        zoom: 1
      });
  }
}

