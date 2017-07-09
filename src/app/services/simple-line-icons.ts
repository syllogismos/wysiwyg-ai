import { Injectable } from '@angular/core';

@Injectable()
export class SimpleLineIconsService {

  icons: Array<string> = [
    'sli-user',
    'sli-people',
    'sli-user-female',
    'sli-user-follow',
    'sli-user-following',
    'sli-user-unfollow',
    'sli-login',
    'sli-logout',
    'sli-emotsmile',
    'sli-phone',
    'sli-call-end',
    'sli-call-in',
    'sli-call-out',
    'sli-map',
    'sli-location-pin',
    'sli-direction',
    'sli-directions',
    'sli-compass',
    'sli-layers',
    'sli-menu',
    'sli-list',
    'sli-options-vertical',
    'sli-options',
    'sli-arrow-down',
    'sli-arrow-left',
    'sli-arrow-right',
    'sli-arrow-up',
    'sli-arrow-up-circle',
    'sli-arrow-left-circle',
    'sli-arrow-right-circle',
    'sli-arrow-down-circle',
    'sli-check',
    'sli-clock',
    'sli-plus',
    'sli-minus',
    'sli-close',
    'sli-event',
    'sli-exclamation',
    'sli-organization',
    'sli-trophy',
    'sli-screen-smartphone',
    'sli-screen-desktop',
    'sli-plane',
    'sli-notebook',
    'sli-mustache',
    'sli-mouse',
    'sli-magnet',
    'sli-energy',
    'sli-disc',
    'sli-cursor',
    'sli-cursor-move',
    'sli-crop',
    'sli-chemistry',
    'sli-speedometer',
    'sli-shield',
    'sli-screen-tablet',
    'sli-magic-wand',
    'sli-hourglass',
    'sli-graduation',
    'sli-ghost',
    'sli-game-controller',
    'sli-fire',
    'sli-eyeglass',
    'sli-envelope-open',
    'sli-envelope-letter',
    'sli-bell',
    'sli-badge',
    'sli-anchor',
    'sli-wallet',
    'sli-vector',
    'sli-speech',
    'sli-puzzle',
    'sli-printer',
    'sli-present',
    'sli-playlist',
    'sli-pin',
    'sli-picture',
    'sli-handbag',
    'sli-globe-alt',
    'sli-globe',
    'sli-folder-alt',
    'sli-folder',
    'sli-film',
    'sli-feed',
    'sli-drop',
    'sli-drawer',
    'sli-docs',
    'sli-doc',
    'sli-diamond',
    'sli-cup',
    'sli-calculator',
    'sli-bubbles',
    'sli-briefcase',
    'sli-book-open',
    'sli-basket-loaded',
    'sli-basket',
    'sli-bag',
    'sli-action-undo',
    'sli-action-redo',
    'sli-wrench',
    'sli-umbrella',
    'sli-trash',
    'sli-badge',
    'sli-support',
    'sli-frame',
    'sli-size-fullscreen',
    'sli-size-actual',
    'sli-shuffle',
    'sli-share-alt',
    'sli-share',
    'sli-rocket',
    'sli-question',
    'sli-pie-chart',
    'sli-pencil',
    'sli-note',
    'sli-loop',
    'sli-home',
    'sli-grid',
    'sli-graph',
    'sli-microphone',
    'sli-music-tone-alt',
    'sli-music-tone',
    'sli-earphones-alt',
    'sli-earphones',
    'sli-equalizer',
    'sli-like',
    'sli-dislike',
    'sli-control-start',
    'sli-control-rewind',
    'sli-control-play',
    'sli-control-pause',
    'sli-control-forward',
    'sli-control-end',
    'sli-volume-1',
    'sli-volume-2',
    'sli-volume-off',
    'sli-calendar',
    'sli-bulb',
    'sli-chart',
    'sli-ban',
    'sli-bubble',
    'sli-camrecorder',
    'sli-camera',
    'sli-cloud-download',
    'sli-cloud-upload',
    'sli-envelope',
    'sli-eye',
    'sli-flag',
    'sli-heart',
    'sli-info',
    'sli-key',
    'sli-link',
    'sli-lock',
    'sli-lock-open',
    'sli-magnifier',
    'sli-magnifier-add',
    'sli-magnifier-remove',
    'sli-paper-clip',
    'sli-paper-plane',
    'sli-power',
    'sli-refresh',
    'sli-reload',
    'sli-settings',
    'sli-star',
    'sli-symbol-female',
    'sli-symbol-male',
    'sli-target',
    'sli-credit-card',
    'sli-paypal',
    'sli-social-tumblr',
    'sli-social-twitter',
    'sli-social-facebook',
    'sli-social-instagram',
    'sli-social-linkedin',
    'sli-social-pinterest',
    'sli-social-github',
    'sli-social-google',
    'sli-social-reddit',
    'sli-social-skype',
    'sli-social-dribbble',
    'sli-social-behance',
    'sli-social-foursqare',
    'sli-social-soundcloud',
    'sli-social-spotify',
    'sli-social-stumbleupon',
    'sli-social-youtube',
    'sli-social-dropbox',
    'sli-social-vkontakte',
    'sli-social-steam'
  ];

  getIcons(): Array<string> {
    return this.icons;
  }

}
