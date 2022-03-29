import { ChplApiDocumentationCollectionPage } from './api-documentation';
import { ChplRealWorldTestingCollectionPage } from './real-world-testing';

import { reactToAngularComponent } from 'services/angular-react-helper';

export default angular
  .module('chpl.collections', [
    'angulartics',
    'feature-flags',
    'ngStorage',
    'chpl.services',
    'chpl.constants',
    'ui.bootstrap',
  ])
  .component('chplApiDocumentationCollectionPageBridge', reactToAngularComponent(ChplApiDocumentationCollectionPage))
  .component('chplRealWorldTestingCollectionPageBridge', reactToAngularComponent(ChplRealWorldTestingCollectionPage));
