import LoginComponent from '../../../components/login/login.po';
import Hooks from '../../../utilities/hooks';
import ToastComponent from '../../../components/toast/toast.po';

import OtherReportingPage from './reporting.po';

let hooks;
let loginComponent;
let page;
let toast;

describe('on "other reporting" page', () => {
  beforeEach(async () => {
    loginComponent = new LoginComponent();
    page = new OtherReportingPage();
    hooks = new Hooks();
    toast = new ToastComponent();
    await hooks.open('#/surveillance/other');
  });

  afterEach(() => {
    if (toast.toastContainer.isDisplayed()) {
      toast.clearAllToast();
    }
    loginComponent.logOut();
  });

  describe('When ONC user is logged in', () => {
    beforeEach(() => {
      loginComponent.logIn('onc');
      hooks.waitForSpinnerToDisappear();
    });

    it('should be able to download results based on year and quarter chosen', () => {
      page.year.click();
      page.chooseDropdownValue('2020');
      page.quarter.click();
      page.chooseDropdownValue('q1');
      page.downloadResultsButton.click();
      expect(toast.toastTitle.getText()).toBe('Success');
    });
  });
});
