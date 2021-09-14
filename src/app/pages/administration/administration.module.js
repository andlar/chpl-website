/* global MINUTES_BETWEEN_KEEPALIVE MINUTES_UNTIL_IDLE */
import 'ng-file-upload';
import { reactToAngularComponent } from '../../services/angular-react-helper';

import ChplCronGen from './jobs';
import ChplLogin from './login';

angular
  .module('chpl.administration', [
    'angular-confirm',
    'chpl.constants',
    'chpl.services',
    'feature-flags',
    'ngCsv',
    'ngFileUpload',
    'ngIdle',
    'ngSanitize',
    'smart-table',
    'toaster',
    'ui.bootstrap',
    'ui.router',
    'zxcvbn',
  ])
  .config((IdleProvider, KeepaliveProvider) => {
    // configure Idle settings
    IdleProvider.idle(60 * MINUTES_UNTIL_IDLE); // in seconds
    // This is required to be > 0 for the IdleProvider to broadcast IdleTimeout event
    IdleProvider.timeout(1); // in seconds
    KeepaliveProvider.interval(60 * MINUTES_BETWEEN_KEEPALIVE); // in seconds
  })
  .component('chplCronGenBridge', reactToAngularComponent(ChplCronGen))
  .component('chplLoginBridge', reactToAngularComponent(ChplLogin));
