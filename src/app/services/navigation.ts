import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {

  navigation: Array<Object> = [
    {
      "title": "Menu",
      "items": [
        {
          "url": "escher/test",
          "icon": "sli-layers",
          "title": "Escher Board",
          "items": [],
          "id": "escher"
        },
        {
          "url": "escher/dashboard",
          "icon": "sli-diamond",
          "title": "Escher",
          "items": [],
          "id": "escher"
        },
        {
          "url": "dashboards/dashboard",
          "icon": "sli-chart",
          "title": "Dashboard",
          "items": [],
          "id": "dashboard"
        },
        {
          "url": "#",
          "icon": "sli-puzzle",
          "title": "Widgets",
          "items": [
            {
              "url": "widgets/activity-widgets",
              "icon": "",
              "title": "Activity widgets",
              "items": [],
              "id": "activity-widgets"
            },
            {
              "url": "widgets/area-chart-widgets",
              "icon": "",
              "title": "Area chart widgets",
              "items": [],
              "id": "area-chart-widgets"
            },
            {
              "url": "widgets/bar-chart-widgets",
              "icon": "",
              "title": "Bar chart widgets",
              "items": [],
              "id": "bar-chart-widgets"
            },
            {
              "url": "widgets/donut-chart-widgets",
              "icon": "",
              "title": "Donut chart widgets",
              "items": [],
              "id": "donut-chart-widgets"
            },
            {
              "url": "widgets/icon-widgets",
              "icon": "",
              "title": "Icon widgets",
              "items": [],
              "id": "icon-widgets"
            },
            {
              "url": "widgets/line-chart-widgets",
              "icon": "",
              "title": "Line chart widgets",
              "items": [],
              "id": "line-chart-widgets"
            },
            {
              "url": "widgets/pie-chart-widgets",
              "icon": "",
              "title": "Pie chart widgets",
              "items": [],
              "id": "pie-chart-widgets"
            },
            {
              "url": "widgets/table-widgets",
              "icon": "",
              "title": "Table widgets",
              "items": [],
              "id": "table-widgets"
            },
            {
              "url": "widgets/text-widgets",
              "icon": "",
              "title": "Text widgets",
              "items": [],
              "id": "text-widgets"
            },
            {
              "url": "widgets/timeline-widgets",
              "icon": "",
              "title": "Timeline widgets",
              "items": [],
              "id": "timeline-widgets"
            },
            {
              "url": "widgets/user-widgets",
              "icon": "",
              "title": "User widgets",
              "items": [],
              "id": "user-widgets"
            }
          ],
          "id": "widgets"
        },
        {
          "url": "#",
          "icon": "sli-organization",
          "title": "Layouts",
          "items": [
            {
              "url": "collapsed-sidebar-1",
              "icon": "",
              "title": "Collapsed sidebar",
              "items": [],
              "id": "collapsed-sidebar"
            },
            {
              "url": "default-sidebar-1",
              "icon": "",
              "title": "Default sidebar",
              "items": [],
              "id": "default-sidebar"
            },
            {
              "url": "off-canvas-1",
              "icon": "",
              "title": "Off canvas",
              "items": [],
              "id": "off-canvas"
            },
            {
              "url": "sidebar-over-1",
              "icon": "",
              "title": "Sidebar over",
              "items": [],
              "id": "sidebar-over"
            },
            {
              "url": "top-navigation-1",
              "icon": "",
              "title": "Top navigation 1",
              "items": [],
              "id": "top-navigation-1"
            },
            {
              "url": "top-navigation-2",
              "icon": "",
              "title": "Top navigation 2",
              "items": [],
              "id": "top-navigation-2"
            }
          ],
          "id": "layouts"
        },
        {
          "url": "#",
          "icon": "sli-info",
          "title": "Documentation",
          "items": [
            {
              "url": "documentation/changelog",
              "icon": "",
              "title": "Changelog",
              "items": [],
              "id": "changelog"
            },
            {
              "url": "documentation/code-structure",
              "icon": "",
              "title": "Code structure",
              "items": [],
              "id": "code-structure"
            },
            {
              "url": "documentation/credits",
              "icon": "",
              "title": "Credits",
              "items": [],
              "id": "credits"
            },
            {
              "url": "documentation/customization",
              "icon": "",
              "title": "Customization",
              "items": [],
              "id": "customization"
            },
            {
              "url": "documentation/angular-cli",
              "icon": "",
              "title": "Angular CLI",
              "items": [],
              "id": "gulp-tasks"
            },
            {
              "url": "documentation/installation",
              "icon": "",
              "title": "Installation",
              "items": [],
              "id": "installation"
            },
            {
              "url": "documentation/layout",
              "icon": "",
              "title": "Layout",
              "items": [],
              "id": "layout"
            },
            {
              "url": "documentation/styles",
              "icon": "",
              "title": "Styles",
              "items": [],
              "id": "styles"
            }
          ],
          "id": "documentation"
        }
      ],
      "id": "menu"
    },
    {
      "title": "Components",
      "items": [
        {
          "url": "#",
          "icon": "sli-chemistry",
          "title": "UI Elements",
          "items": [
            {
              "url": "ui-elements/badges",
              "icon": "",
              "title": "Badges",
              "items": [],
              "id": "badges"
            },
            {
              "url": "ui-elements/breadcrumbs",
              "icon": "",
              "title": "Breadcrumbs",
              "items": [],
              "id": "breadcrumbs"
            },
            {
              "url": "ui-elements/buttons",
              "icon": "",
              "title": "Buttons",
              "items": [],
              "id": "buttons"
            },
            {
              "url": "ui-elements/cards",
              "icon": "",
              "title": "Cards",
              "items": [],
              "id": "cards"
            },
            {
              "url": "ui-elements/dropdowns",
              "icon": "",
              "title": "Dropdowns",
              "items": [],
              "id": "dropdowns"
            },
            {
              "url": "ui-elements/images",
              "icon": "",
              "title": "Images",
              "items": [],
              "id": "images"
            },
            {
              "url": "ui-elements/lists",
              "icon": "",
              "title": "Lists",
              "items": [],
              "id": "lists"
            },
            {
              "url": "ui-elements/pagination",
              "icon": "",
              "title": "Pagination",
              "items": [],
              "id": "pagination"
            },
            {
              "url": "ui-elements/progress-bars",
              "icon": "",
              "title": "Progress bars",
              "items": [],
              "id": "progress-bars"
            },
            {
              "url": "ui-elements/social-media-buttons",
              "icon": "",
              "title": "Social media buttons",
              "items": [],
              "id": "social-media-buttons"
            },
            {
              "url": "ui-elements/tabs",
              "icon": "",
              "title": "Tabs",
              "items": [],
              "id": "tabs"
            },
            {
              "url": "ui-elements/typography",
              "icon": "",
              "title": "Typography",
              "items": [],
              "id": "typography"
            }
          ],
          "id": "ui-elements"
        },
        {
          "url": "#",
          "icon": "sli-clock",
          "title": "Notifications",
          "items": [
            {
              "url": "notifications/alerts",
              "icon": "",
              "title": "Alerts",
              "items": [],
              "id": "alerts"
            },
            {
              "url": "notifications/modals",
              "icon": "",
              "title": "Modals",
              "items": [],
              "id": "modals"
            },
            {
              "url": "notifications/popovers",
              "icon": "",
              "title": "Popovers",
              "items": [],
              "id": "popovers"
            },
            {
              "url": "notifications/sweet-alert-2",
              "icon": "",
              "title": "Sweet Alert 2",
              "items": [],
              "id": "sweet-alert-2"
            },
            {
              "url": "notifications/toastr",
              "icon": "",
              "title": "Toastr",
              "items": [],
              "id": "toastr"
            },
            {
              "url": "notifications/tooltips",
              "icon": "",
              "title": "Tooltips",
              "items": [],
              "id": "tooltips"
            }
          ],
          "id": "notifications"
        },
        {
          "url": "#",
          "icon": "sli-energy",
          "title": "Icons",
          "items": [
            {
              "url": "icons/flags",
              "icon": "",
              "title": "Flags",
              "items": [],
              "id": "flags"
            },
            {
              "url": "icons/font-awesome",
              "icon": "",
              "title": "Font awesome",
              "items": [],
              "id": "font-awesome"
            },
            {
              "url": "icons/ionicons",
              "icon": "",
              "title": "Ionicons",
              "items": [],
              "id": "ionicons"
            },
            {
              "url": "icons/material-design-icons",
              "icon": "",
              "title": "Material design icons",
              "items": [],
              "id": "material-design-icons"
            },
            {
              "url": "icons/simple-line-icons",
              "icon": "",
              "title": "Simple line icons",
              "items": [],
              "id": "simple-line-icons"
            },
            {
              "url": "icons/weather-icons",
              "icon": "",
              "title": "Weather icons",
              "items": [],
              "id": "weather-icons"
            }
          ],
          "id": "icons"
        },
        {
          "url": "#",
          "icon": "sli-layers",
          "title": "Forms",
          "items": [
            {
              "url": "forms/datepicker",
              "icon": "",
              "title": "Datepicker",
              "items": [],
              "id": "datepicker"
            },
            {
              "url": "forms/default-forms",
              "icon": "",
              "title": "Default forms",
              "items": [],
              "id": "default-forms"
            },
            {
              "url": "forms/file-uploads",
              "icon": "",
              "title": "File uploads",
              "items": [],
              "id": "file-uploads"
            },
            {
              "url": "forms/steps",
              "icon": "",
              "title": "Form steps",
              "items": [],
              "id": "form-steps"
            },
            {
              "url": "forms/validation",
              "icon": "",
              "title": "Form validation",
              "items": [],
              "id": "form-validation"
            },
            {
              "url": "forms/sliders",
              "icon": "",
              "title": "Sliders",
              "items": [],
              "id": "sliders"
            },
            {
              "url": "forms/typeahead",
              "icon": "",
              "title": "Typeahead",
              "items": [],
              "id": "typeahead"
            }
          ],
          "id": "forms"
        },
        {
          "url": "#",
          "icon": "sli-list",
          "title": "Tables",
          "items": [
            {
              "url": "tables/datatable",
              "icon": "",
              "title": "Datatable",
              "items": [],
              "id": "datatable"
            },
            {
              "url": "tables/default-tables",
              "icon": "",
              "title": "Default tables",
              "items": [],
              "id": "default-tables"
            },
            {
              "url": "tables/table-export",
              "icon": "",
              "title": "Table export",
              "items": [],
              "id": "table-export"
            },
            {
              "url": "tables/jquery-treegrid",
              "icon": "",
              "title": "jQuery treegrid",
              "items": [],
              "id": "jquery-treegrid"
            }
          ],
          "id": "tables"
        },
        {
          "url": "#",
          "icon": "sli-pie-chart",
          "title": "Charts",
          "items": [
            {
              "url": "charts/chartist",
              "icon": "",
              "title": "Chartist",
              "items": [],
              "id": "chartist"
            },
            {
              "url": "charts/easy-pie-chart",
              "icon": "",
              "title": "Easy pie chart",
              "items": [],
              "id": "easy-pie-chart"
            },
            {
              "url": "charts/morris-js",
              "icon": "",
              "title": "Morris.js",
              "items": [],
              "id": "morris.js"
            },
            {
              "url": "charts/nvd3",
              "icon": "",
              "title": "NVD3",
              "items": [],
              "id": "nvd3"
            },
            {
              "url": "charts/peity",
              "icon": "",
              "title": "Peity",
              "items": [],
              "id": "peity"
            }
          ],
          "id": "charts"
        },
        {
          "url": "pages/user-profile",
          "icon": "sli-user",
          "title": "User profile",
          "items": [],
          "id": "user-profile"
        }
      ],
      "id": "components"
    },
    {
      "title": "Other",
      "items": [
        {
          "url": "apps/calendar",
          "icon": "sli-calendar",
          "title": "Calendar",
          "items": [],
          "id": "calendar"
        },
        {
          "url": "#",
          "icon": "sli-location-pin",
          "title": "Maps",
          "items": [
            {
              "url": "maps/google-maps",
              "icon": "",
              "title": "Google maps",
              "items": [],
              "id": "google-maps"
            },
            {
              "url": "maps/vector-maps",
              "icon": "",
              "title": "Vector maps",
              "items": [],
              "id": "vector-maps"
            }
          ],
          "id": "maps"
        },
        {
          "url": "#",
          "icon": "sli-clock",
          "title": "Plugins",
          "items": [
            {
              "url": "plugins/moment-js",
              "icon": "",
              "title": "Date formatting",
              "items": [],
              "id": "date-formatting"
            },
            {
              "url": "plugins/accounting-js",
              "icon": "",
              "title": "Number formatting",
              "items": [],
              "id": "number-formatting"
            }
          ],
          "id": "plugins"
        },
        {
          "url": "#",
          "icon": "sli-book-open",
          "title": "Pages",
          "items": [
            {
              "url": "pages/coming-soon",
              "icon": "",
              "title": "Coming soon",
              "items": [],
              "id": "coming-soon"
            },
            {
              "url": "pages/contact-us",
              "icon": "",
              "title": "Contact us",
              "items": [],
              "id": "contact-us"
            },
            {
              "url": "pages/create-account",
              "icon": "",
              "title": "Create account",
              "items": [],
              "id": "create-account"
            },
            {
              "url": "pages/empty-page",
              "icon": "",
              "title": "Empty page",
              "items": [],
              "id": "empty-page"
            },
            {
              "url": "pages/error-page",
              "icon": "",
              "title": "Error page",
              "items": [],
              "id": "error-page"
            },
            {
              "url": "pages/login",
              "icon": "",
              "title": "Login",
              "items": [],
              "id": "login"
            },
            {
              "url": "pages/reset-password",
              "icon": "",
              "title": "Reset password",
              "items": [],
              "id": "reset-password"
            },
            {
              "url": "pages/subscribe",
              "icon": "",
              "title": "Subscribe",
              "items": [],
              "id": "subscribe"
            },
            {
              "url": "pages/under-maintenance",
              "icon": "",
              "title": "Under maintenance",
              "items": [],
              "id": "under-maintenance"
            },
            {
              "url": "pages/unlock-account",
              "icon": "",
              "title": "Unlock account",
              "items": [],
              "id": "unlock-account"
            }
          ],
          "id": "pages"
        }
      ],
      "id": "other"
    }
  ];

  getNavigation(): Array<Object> {
    return this.navigation;
  }

}
