import { Injectable } from '@angular/core';

declare var $: any;
declare var Storages: any;

@Injectable()
export class CustomEventsService {
  helpers(): void {
    const storage = Storages.localStorage;
    let config = storage.get('config');

    //right sidebar
    $('body').on('toggle:right-sidebar', function() {
      $('.right-sidebar-outer').toggleClass('show-from-right');
      if ($('.right-sidebar-outer').hasClass('show-from-right')) {
        $('.right-sidebar-backdrop').toggleClass('fade in');
      } else {
        $('.right-sidebar-backdrop')
          .removeClass('fade')
          .removeClass('in');
      }
    });

    //fullscreen
    $('body').on('toggle:fullscreen', function() {
      let body = $('body');
      let value = body.attr('data-fullscreen') === 'true' ? true : false;
      body.attr('data-fullscreen', !value);
      $(document).fullScreen(!value);
    });

    //collapsed
    $('body').on('toggle:collapsed', function() {
      let body = $('body');
      let collapsed = body.attr('data-collapsed') === 'true' ? true : false;
      body.attr('data-collapsed', !collapsed);
      //      config = Object.assign({}, config, {
      //        collapsed: !collapsed
      //      });
      //      storage.set('config', config);
    });

    //background
    $('body').on('changed:background', function() {
      let body = $('body');
      let background = body.attr('data-background');
      config = Object.assign({}, config, {
        background: background
      });
      storage.set('config', config);
    });

    //sidebar
    $('body').on('changed:sidebar', function() {
      let body = $('body');
      let sidebar = body.attr('data-sidebar');
      config = Object.assign({}, config, {
        sidebar: sidebar
      });
      storage.set('config', config);
    });

    //logo
    $('body').on('changed:logo', function() {
      let body = $('body');
      let logo = body.attr('data-logo');
      config = Object.assign({}, config, {
        logo: logo
      });
      storage.set('config', config);
    });

    //navbar
    $('body').on('changed:navbar', function() {
      let body = $('body');
      let navbar = body.attr('data-navbar');
      config = Object.assign({}, config, {
        navbar: navbar
      });
      storage.set('config', config);
    });

    //top-navigation
    $('body').on('changed:top-navigation', function() {
      let body = $('body');
      let topNavigation = body.attr('data-top-navigation');
      config = Object.assign({}, config, {
        topNavigation: topNavigation
      });
      storage.set('config', config);
    });
  }
}

