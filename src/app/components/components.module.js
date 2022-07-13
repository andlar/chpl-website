import IndexWrapper from '../index-wrapper';

import { ChplAnnouncementsWrapper } from './announcement';
import { ChplApiKeyConfirm } from './api-key';
import ChplChangeRequestsWrapper from './change-request/change-requests-wrapper';
import {
  ChplAttestationCreateWrapper,
  ChplAttestationEditWrapper,
  ChplAttestationsViewWrapper,
} from './attestation';
import { ChplDeveloper } from './developer';
import { ChplFuzzyType } from './fuzzy-type';
import {
  ChplConfirmDeveloperWrapper,
  ChplConfirmListingsWrapper,
  ChplConfirmProduct,
  ChplConfirmProgress,
  ChplConfirmVersion,
} from './listing/confirm';
import { ChplCriteria } from './listing/details/criteria';
import ChplSurveillanceView from './listing/details/surveillance/surveillance-view';
import {
  ChplComplaintEdit,
  ChplComplaintView,
  ChplComplaintsWrapper,
} from './surveillance/complaints';
import { ChplSurveillanceActivityReportingDateSelector } from './surveillance/manage';
import {
  ChplUploadPromotingInteroperability,
  ChplUploadSurveillance,
  ChplUploadWrapper,
} from './upload';
import { ChplUsers } from './user';
import {
  ChplConfirmation,
  ChplEllipsis,
  ChplLink,
  ChplNonProdIndicator,
} from './util';
import { ChplActionBar, ChplActionBarWrapper } from './action-bar';
import { UserWrapper } from './login';

import { reactToAngularComponent } from 'services/angular-react-helper';

angular
  .module('chpl.components', [
    'angulartics',
    'chpl.services',
    'feature-flags',
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
  .component('chplActionBarBridge', reactToAngularComponent(ChplActionBar))
  .component('chplActionBarWrapperBridge', reactToAngularComponent(ChplActionBarWrapper))
  .component('chplApiKeyConfirmBridge', reactToAngularComponent(ChplApiKeyConfirm))
  .component('chplAttestationCreateWrapperBridge', reactToAngularComponent(ChplAttestationCreateWrapper))
  .component('chplAttestationEditWrapperBridge', reactToAngularComponent(ChplAttestationEditWrapper))
  .component('chplAttestationsViewWrapperBridge', reactToAngularComponent(ChplAttestationsViewWrapper))
  .component('chplAnnouncementsWrapperBridge', reactToAngularComponent(ChplAnnouncementsWrapper))
  .component('chplChangeRequestsWrapperBridge', reactToAngularComponent(ChplChangeRequestsWrapper))
  .component('chplComplaintEditBridge', reactToAngularComponent(ChplComplaintEdit))
  .component('chplComplaintViewBridge', reactToAngularComponent(ChplComplaintView))
  .component('chplComplaintsWrapperBridge', reactToAngularComponent(ChplComplaintsWrapper))
  .component('chplConfirmDeveloperWrapperBridge', reactToAngularComponent(ChplConfirmDeveloperWrapper))
  .component('chplConfirmListingsWrapperBridge', reactToAngularComponent(ChplConfirmListingsWrapper))
  .component('chplConfirmProductBridge', reactToAngularComponent(ChplConfirmProduct))
  .component('chplConfirmProgressBridge', reactToAngularComponent(ChplConfirmProgress))
  .component('chplConfirmVersionBridge', reactToAngularComponent(ChplConfirmVersion))
  .component('chplConfirmationBridge', reactToAngularComponent(ChplConfirmation))
  .component('chplCriteriaBridge', reactToAngularComponent(ChplCriteria))
  .component('chplDeveloperBridge', reactToAngularComponent(ChplDeveloper))
  .component('chplEllipsisBridge', reactToAngularComponent(ChplEllipsis))
  .component('chplFuzzyTypeBridge', reactToAngularComponent(ChplFuzzyType))
  .component('chplLinkBridge', reactToAngularComponent(ChplLink))
  .component('chplNonProdIndicatorBridge', reactToAngularComponent(ChplNonProdIndicator))
  .component('chplSurveillanceActivityReportingDateSelectorBridge', reactToAngularComponent(ChplSurveillanceActivityReportingDateSelector))
  .component('chplSurveillanceViewBridge', reactToAngularComponent(ChplSurveillanceView))
  .component('chplUploadPromotingInteroperabilityBridge', reactToAngularComponent(ChplUploadPromotingInteroperability))
  .component('chplUploadSurveillanceBridge', reactToAngularComponent(ChplUploadSurveillance))
  .component('chplUploadWrapperBridge', reactToAngularComponent(ChplUploadWrapper))
  .component('chplUsersBridge', reactToAngularComponent(ChplUsers))
  .component('indexWrapperBridge', reactToAngularComponent(IndexWrapper))
  .component('userWrapperBridge', reactToAngularComponent(UserWrapper));
