import { Component, OnInit } from '@angular/core';
import { MousetrapService } from 'app/services/mousetrap';
import { CustomEventsService } from 'app/services/custom-events';
import { Router, NavigationStart } from '@angular/router';
import { NavigationService } from 'app/services/navigation';

declare var $: any;
declare var _: any;
declare var Storages: any;
declare var fakeLoader: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MousetrapService, CustomEventsService, NavigationService]
})

export class AppComponent {

  public layout: string = 'default-sidebar-1'; //default-sidebar-1,off-canvas-1,sidebar-over-1,off-canvas-1,top-navigation-1,top-navigation-2,empty-view-1
  public background: string = 'light';//light,dark,indigo,blue-grey
  public navbar: string = 'dark';//light,dark,indigo,blue-grey
  public sidebar: string = 'dark';//light,dark,indigo,blue-grey
  public topNavigation: string = 'light';//light,dark,indigo,blue-grey
  public logo: string = 'light';//light,dark,indigo,blue-grey
  public collapsed: boolean = false;//true,false
  public controller: string = 'Escher';
  public view: string;

  constructor(
    private router: Router,
    private mousetrapService: MousetrapService,
    private customEventsService: CustomEventsService,
    private navigationService: NavigationService
  ) {

    let config = {
      layout: this.layout,
      background: this.background,
      navbar: this.navbar,
      sidebar: this.sidebar,
      topNavigation: this.topNavigation,
      collapsed: this.collapsed,
      logo: this.logo
    };

    let storage = Storages.localStorage;
    let collapsed = config.collapsed;

    let allUrls = _.map(this.navigationService.getEverything(), x => '/' + x.url)

    allUrls = allUrls.concat([
      '/',
      '/escher/experiment-detail',
      '/escher/sup-experiment',
      '/escher/rl-experiment'
    ])

    //reset localStorage on page load for demo purposes only. this can be removed in production
    // storage.removeAll();

    if (storage.isEmpty('config') || !(storage.get('config'))) {
      storage.removeAll();
      storage.set('config', config);
    }
    config = storage.get('config');

    //set attributes before page is loaded. this can be removed in production
    $('body').attr('data-background', config.background);
    $('body').attr('data-navbar', config.navbar);
    $('body').attr('data-sidebar', config.sidebar);
    $('body').attr('data-top-navigation', config.topNavigation);
    $('body').attr('data-collapsed', config.collapsed);
    $('body').attr('data-logo', config.logo);

    if ($('html').hasClass('loading')) {
      const loaderTime = 2;
      $('#fakeloader').fakeLoader({
        timeToHide: loaderTime,
        zIndex: '99999',
        spinner: 'spinner1',
        bgColor: '#263238'
      });
      setTimeout(function() {
        $('html').removeClass('loading');
      }, loaderTime);
    }

    //alternative layouts for some urls
    const demoRedirects = [
      '/demos/default-sidebar',
      '/demos/collapsed-sidebar',
      '/demos/off-canvas',
      '/demos/top-navigation-1',
      '/demos/top-navigation-2',
      '/demos/sidebar-over-layout',
      '/demos/dark-background',
      '/demos/blue-background',
      '/demos/blue-grey-background',
    ];

    const emptyView1 = [
      '/pages/error-page',
      '/pages/coming-soon',
      '/pages/contact-us',
      '/pages/create-account',
      '/pages/producthunt/create-account',
      '/pages/login',
      '/pages/reset-password',
      '/pages/subscribe',
      '/pages/under-maintenance',
      '/pages/unlock-account',
    ];

    const self = this;
    
    router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {

        const copy = Object.assign({}, val);
        const url = copy.url.split('?')[0];

        // is 404 is a flag to check if it should be a 404 error page
        // so that we can have the empty page layout and 404 page
        const is404 = _.filter(allUrls, x => {
          if (x == url) return true
          else if (url.startsWith(x + '/')) return true
          // return url.startsWith(x)
        }).length == 0

        // console.log(is404);
        // console.log(url)
        // console.log(_.filter(allUrls, x=> url.startsWith(x)))

        if (_.includes(emptyView1, url)) {
          self['layout'] = 'empty-view-1';
          $('body').attr('data-background', 'light');
          $('body').attr('data-layout', self['layout']);
        } else if (is404) {
          self['layout'] = 'empty-view-1';
          $('body').attr('data-background', 'light');
          $('body').attr('data-layout', self['layout']);
        } else {
          self['layout'] = config.layout;
          $('body').attr('data-layout', self['layout']);
        }

        //set data-controller and data-view attributes
        const data = url.split('/').filter(url => url.length > 0);
        let currentController = $('body').attr('data-controller');
        let currentView = $('body').attr('data-view');

        console.log(data)
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        if (_.includes(demoRedirects, url)) {
          console.log('demo redirect', url, data);
          //modify urls to match layouts
          if (data[1] == 'default-sidebar') {
            //default-sidebar-1
            self['layout'] = 'default-sidebar-1';
            config = Object.assign({}, config, {
              layout: 'default-sidebar-1'
            });
          } else if (data[1] == 'collapsed-sidebar') {
            //collapsed-sidebar-1
            self['layout'] = 'collapsed-sidebar-1';
            config = Object.assign({}, config, {
              layout: 'collapsed-sidebar-1'
            });
          } else if (data[1] == 'top-navigation-1') {
            //top-navigation-1
            self['layout'] = 'top-navigation-1';
            config = Object.assign({}, config, {
              layout: 'top-navigation-1'
            });
            $('body').attr('data-background', 'light');
            $('body').attr('data-navbar', 'dark');
            $('body').attr('data-top-navigation', 'dark');
          } else if (data[1] == 'top-navigation-2') {
            //top-navigation-2
            self['layout'] = 'top-navigation-2';
            config = Object.assign({}, config, {
              layout: 'top-navigation-2'
            });
            $('body').attr('data-background', 'light');
            $('body').attr('data-navbar', 'indigo');
            $('body').attr('data-top-navigation', 'indigo');
          } else if (data[1] == 'off-canvas') {
            //off-canvas-1
            self['layout'] = 'off-canvas-1';
            config = Object.assign({}, config, {
              layout: 'off-canvas-1'
            });
            $('body').attr('data-navbar', 'indigo');
          } else if (data[1] == 'sidebar-over-layout') {
            //sidebar-over-1
            self['layout'] = 'sidebar-over-1';
            config = Object.assign({}, config, {
              layout: 'sidebar-over-1'
            });
          } else if (data[1] == 'dark-background') {
            //dark background
            self['layout'] = 'default-sidebar-1';
            $('body').attr('data-background', 'dark');
            $('body').attr('data-navbar', 'dark');
            $('body').attr('data-top-navigation', 'dark');
            $('body').attr('data-sidebar', 'dark');
            config = Object.assign({}, config, {
              layout: 'default-sidebar-1'
            });
          } else if (data[1] == 'blue-background') {
            //blue background
            self['layout'] = 'default-sidebar-1';
            $('body').attr('data-background', 'indigo');
            $('body').attr('data-navbar', 'indigo');
            $('body').attr('data-top-navigation', 'indigo');
            $('body').attr('data-sidebar', 'indigo');
            config = Object.assign({}, config, {
              layout: 'default-sidebar-1'
            });
          } else if (data[1] == 'blue-grey-background') {
            //blue-grey background
            self['layout'] = 'default-sidebar-1';
            $('body').attr('data-background', 'blue-grey');
            $('body').attr('data-navbar', 'blue-grey');
            $('body').attr('data-top-navigation', 'blue-grey');
            $('body').attr('data-sidebar', 'blue-grey');
            config = Object.assign({}, config, {
              layout: 'default-sidebar-1'
            });
          } else {
            //default redirect
            self['layout'] = 'default-sidebar-1';
            config = Object.assign({}, config, {
              layout: 'default-sidebar-1'
            });
          }
          self['controller'] = 'dashboards';
          self['view'] = 'dashboard';
          $('body').attr('data-controller', 'dashboards');
          $('body').attr('data-view', 'dashboard');
          storage.set('config', config);
          let newUrl = `/dashboards/dashboard`;
          router.navigateByUrl(newUrl);

        } else {

          if (data.length == 1) {
            self['layout'] = data[0];
            $('body').attr('data-layout', data[0]);
            $('body').attr('data-collapsed', false);
            config = Object.assign({}, config, {
              layout: data[0],
              collapsed: false
            });
            storage.set('config', config);
            let newUrl = `/${currentController}/${currentView}`;
            router.navigateByUrl(newUrl);

            //hide backdrop in case previous layout is sidebar-over-1 and state is collapsed
            let backdrop = $('.left-sidebar-backdrop');
            if (backdrop.hasClass('in')) {
              backdrop.removeClass('fade');
              backdrop.removeClass('in');
            }

            //set colors for top navigation layouts. this can be removed in production
            if (data[0] == 'top-navigation-1') {
              $('body').attr('data-background', 'light');
              $('body').attr('data-navbar', 'dark');
              $('body').attr('data-top-navigation', 'dark');
            }
            if (data[0] == 'top-navigation-2') {
              $('body').attr('data-background', 'light');
              $('body').attr('data-navbar', 'indigo');
              $('body').attr('data-top-navigation', 'indigo');
            }
          } else if (data.length == 2) {
            $('body').attr('data-controller', data[0]);
            $('body').attr('data-view', data[1]);
            self['controller'] = data[0];
            self['view'] = data[1];
          } else {
            self['controller'] = data[0];
            self['view'] = data[1];
            $('body').attr('data-controller', data[0]);
            $('body').attr('data-view', data[1]);
          }
        }

      }
    });

    //mousetrap helpers to control layout settings with the keyboard. this can be removed in production
    // mousetrapService.helpers();

    //custom events used to update demo views. this can be removed in production
    // customEventsService.helpers();
  }

}

