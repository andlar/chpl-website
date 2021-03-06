import ManagePage from './manage.po';
import LoginComponent from '../../../components/login/login.po';
import Hooks from '../../../utilities/hooks';
import ToastComponent from '../../../components/toast/toast.po';

let hooks; let loginComponent; let manage; let toast;

describe('on manage surveillance page', () => {
  beforeEach(async () => {
    loginComponent = new LoginComponent();
    manage = new ManagePage();
    hooks = new Hooks();
    toast = new ToastComponent();
    await hooks.open('#/surveillance/manage');
  });

  describe('When ONC user is logged in', () => {
    beforeEach(() => {
      loginComponent.logIn('onc');
    });

    afterEach(() => {
      loginComponent.logOut();
    });

    it('should see reporting tab', () => {
      hooks.waitForSpinnerToDisappear();
      expect(manage.reportingTab.isDisplayed()).toBe(true);
    });

    describe('When on reporting tab', () => {
      beforeEach(() => {
        manage.reportingTab.click();
      });

      it('should be able to download results based on year and quarter chosen', () => {
        manage.year.click();
        manage.chooseDropdownValue('2020');
        manage.quarter.click();
        manage.chooseDropdownValue('q1');
        manage.downloadResultsButton.click();
        expect(toast.toastTitle.getText()).toBe('Success');
      });
    });
  });

  describe('When ACB user is logged in', () => {
    beforeEach(() => {
      loginComponent.logIn('drummond');
    });

    afterEach(() => {
      loginComponent.logOut();
    });

    it('should not see reporting tab', () => {
      hooks.waitForSpinnerToDisappear();
      expect(manage.reportingTab.isDisplayed()).toBe(false);
    });
  });
});
