import { Injectable } from '@angular/core';

declare var $: any;
declare var Storages: any;
declare var Mousetrap: any;
declare var _: any;

@Injectable()
export class MousetrapService {
  helpers(): void {
    const storage = Storages.localStorage;
    let backgrounds = ['light', 'dark', 'indigo', 'blue-grey'];
    Mousetrap.bind('ctrl+1', function() {
      let background = $('body').attr('data-background');
      let index = _.indexOf(backgrounds, background);
      let nextBackground = backgrounds[index + 1] ? backgrounds[index + 1] : backgrounds[0];
      $('body').attr('data-background', nextBackground);
      $('body').trigger('changed:background');
    });

    let navbars = backgrounds.slice();
    Mousetrap.bind('ctrl+2', function() {
      let navbar = $('body').attr('data-navbar');
      let index = _.indexOf(navbars, navbar);
      let nextNavbar = navbars[index + 1] ? navbars[index + 1] : navbars[0];
      $('body').attr('data-navbar', nextNavbar);
      $('body').trigger('changed:navbar');
      $('body').attr('data-logo', nextNavbar);
      $('body').trigger('changed:logo');
    });

    let sidebars = backgrounds.slice();
    Mousetrap.bind('ctrl+3', function() {
      let sidebar = $('body').attr('data-sidebar');
      let index = _.indexOf(sidebars, sidebar);
      let nextSidebar = sidebars[index + 1] ? sidebars[index + 1] : sidebars[0];
      $('body').attr('data-sidebar', nextSidebar);
      $('body').trigger('changed:sidebar');
    });

    let topNavigations = backgrounds.slice();
    Mousetrap.bind('ctrl+4', function() {
      let topNavigation = $('body').attr('data-top-navigation');
      let index = _.indexOf(topNavigations, topNavigation);
      let nextNavbar = topNavigations[index + 1] ? topNavigations[index + 1] : topNavigations[0];
      $('body').attr('data-top-navigation', nextNavbar);
      $('body').trigger('changed:top-navigation');
    });

    let logos = backgrounds.slice();
    Mousetrap.bind('ctrl+5', function() {
      let logo = $('body').attr('data-logo');
      let index = _.indexOf(logos, logo);
      let nextLogo = logos[index + 1] ? logos[index + 1] : logos[0];
      $('body').attr('data-logo', nextLogo);
      $('body').trigger('changed:logo');
    });

    Mousetrap.bind('ctrl+6', function() {
      $('.right-sidebar-outer').toggleClass('show-from-right');
      let layout = $('body').data('layout');
      if ($('.right-sidebar-outer').hasClass('show-from-right')) {
        $('.right-sidebar-backdrop').toggleClass('fade in');
      } else {
        $('.right-sidebar-backdrop')
          .removeClass('fade')
          .removeClass('in');
      }
    });

    Mousetrap.bind('ctrl+7', function() {
      let collapsed = $('body').attr('data-collapsed') === 'true' ? true : false;
      $('body').attr('data-collapsed', !collapsed);
      $('body').trigger('changed:collapsed');
    });

    Mousetrap.bind('ctrl+9', function() {
      storage.removeAll();
    });
  }
}


