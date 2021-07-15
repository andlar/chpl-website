const urls = require('../config/urls');
class Hooks {
  constructor () { }

  open (path) {
    browser.maximizeWindow();
    browser.setWindowSize(1600, 1024);
    browser.url(path);
  }

  waitForSpinnerToDisappear () {
    browser.waitUntil( () => !$('#loading-bar-spinner').isDisplayed());
  }

  waitForSpinnerToAppear () {
    browser.waitUntil( () => $('#loading-bar-spinner').isDisplayed());
  }

  getCellValue(row, col) {
    return $(`//tbody/tr[${row}]/td[${col}]`).getText();
  }

  getTableHeaders() {
    return $('table').$('thead').$$('th');
  }

  getTableRows() {
    return $('table').$('tbody').$$('tr');
  }

  getFlagState(flagName){
    const foundFlag = flagObj.find(flag => flag.key === flagName);
    return foundFlag?.active;
  }

}

export default Hooks;
