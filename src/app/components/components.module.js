import { ChplApiKeyConfirm, ChplApiKeyRegistration } from './api-key';
import { ChplConfirmDeveloper, ChplConfirmListings } from './listing/confirm';
import { ChplCriteria } from './listing/details/criteria';
import { ChplEllipsis, ChplLink } from './util';
import { ChplFuzzyType } from './fuzzy-type';
import { ChplUploadListings } from './upload';
import { reactToAngularComponent } from '../services/angular-react-helper.jsx';

angular
  .module('chpl.components', [
    'angularMoment',
    'angulartics',
    'chpl.services',
    'feature-flags',
    'ngAvatar',
    'ngCytoscape',
    'ngFileUpload',
    'ngIdle',
    'ngResource',
    'ngStorage',
    'smart-table',
    'toaster',
    'ui.bootstrap',
    'ui.router',
  ])
  .component('chplApiKeyConfirmBridge', reactToAngularComponent(ChplApiKeyConfirm))
  .component('chplApiKeyRegistrationBridge', reactToAngularComponent(ChplApiKeyRegistration))
  .component('chplConfirmDeveloperBridge', reactToAngularComponent(ChplConfirmDeveloper))
  .component('chplConfirmListingsBridge', reactToAngularComponent(ChplConfirmListings))
  .component('chplCriteriaBridge', reactToAngularComponent(ChplCriteria))
  .component('chplEllipsisBridge', reactToAngularComponent(ChplEllipsis))
  .component('chplFuzzyTypeBridge', reactToAngularComponent(ChplFuzzyType))
  .component('chplLinkBridge', reactToAngularComponent(ChplLink))
  .component('chplUploadListingsBridge', reactToAngularComponent(ChplUploadListings));
