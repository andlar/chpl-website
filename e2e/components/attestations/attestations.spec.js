import DevelopersPage from '../../pages/organizations/developers/developers.po';
import Hooks from '../../utilities/hooks';
import LoginComponent from '../login/login.po';
import SnackComponent from '../snack/snack.po';

import AttestationsComponent from './attestations.po';

let component;
let hooks;
let login;
let page;
let snack;

describe('the Attestations component', () => {
  beforeEach(async () => {
    component = new AttestationsComponent();
    hooks = new Hooks();
    login = new LoginComponent();
    page = new DevelopersPage();
    snack = new SnackComponent();
    await hooks.open('#/organizations/developers');
  });

  afterEach(() => {
    if (component.detailsAreDisplayed()) {
      component.closeAttestations();
    }
    snack.clearAllSnacks();
    login.logOut();
  });

  describe('for Plexus Information Systems, Inc.', () => {
    beforeEach(async () => {
      page.selectDeveloper('Plexus');
      login.logIn('onc');
      hooks.waitForSpinnerToDisappear();
    });

    it('should allow creation of an exception for an unattested period', () => {
      const periodStart = 'Jun 30, 2020';
      const initialSnacks = snack.snackCount;
      component.initiateUnattestedException(periodStart);
      component.createException();
      browser.waitUntil(() => snack.snackCount === initialSnacks + 1);
      expect(component.isCreatingException()).toBe(false);
      expect(snack.matchesText('You have re-opened the submission feature for Plexus Information Systems, Inc. until')).toBe(true);
    });
  });

  describe('for Ocuco Limited', () => {
    beforeEach(async () => {
      page.selectDeveloper('Ocuco Limited');
      login.logIn('onc');
      hooks.waitForSpinnerToDisappear();
    });

    it('should allow creation of an exception for an attested period', () => {
      const periodStart = 'Jun 30, 2020';
      const initialSnacks = snack.snackCount;
      component.viewAttestations(periodStart);
      component.createException();
      component.createException();
      browser.waitUntil(() => snack.snackCount === initialSnacks + 1);
      expect(component.isCreatingException()).toBe(false);
      expect(snack.matchesText('You have re-opened the submission feature for Ocuco Limited until')).toBe(true);
    });
  });
});
