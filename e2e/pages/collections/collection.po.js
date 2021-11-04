const elements = {
  bodyText: '.makeStyles-content-3',
  listingTable: 'table',
  searchResultsHeader: 'h6=Search Results:',
  filterPanelToggle: '#filter-panel-toggle',
  resetAllFiltersButton: 'button=Reset All Filters',
};

class CollectionPage {
  constructor() {
    this.elements = elements;
  }

  get bodyText() {
    return $(elements.bodyText);
  }

  getListingTableHeaders() {
    return $(elements.listingTable).$('thead').$$('th');
  }

  getColumnText(rowNumber, columnNumber) {
    return $(elements.listingTable)
      .$('tbody')
      .$(`tr[${rowNumber}]`)
      .$(`td[${columnNumber}]`)
      .getText();
  }

  getListingTotalCount() {
    const data = $(elements.searchResultsHeader)
          .parentElement()
          .$('p')
          .getText()
          .split(' ');
    return parseInt(data[2], 10);
  }

  resetFilters() {
    const initialListingCount = this.getListingTotalCount();
    $(elements.filterPanelToggle).click();
    $(elements.resetAllFiltersButton).click();
    browser.keys('Escape');
    browser.waitUntil(() => this.getListingTotalCount() !== initialListingCount, {timeout: 1000});
  }

  removeFilter(category, value) {
    const initialListingCount = this.getListingTotalCount();
    $(`span=${category}: ${value}`)
      .parentElement()
      .$('svg')
      .click();
    browser.waitUntil(() => this.getListingTotalCount() !== initialListingCount, {timeout: 1000});
  }

  selectFilter(category, value) {
    const initialListingCount = this.getListingTotalCount();
    $(elements.filterPanelToggle).click();
    $(`#filter-panel-primary-items-${category}`).click();
    $(`#filter-panel-secondary-items-${value}`).click();
    browser.keys('Escape');
    try {
      browser.waitUntil(() => this.getListingTotalCount() !== initialListingCount, {timeout: 1000});
    } catch (err) {
      console.log(err);
    }
    browser.saveScreenshot(`test_reports/e2e/screenshot/selectfilter-final-${Date.now()}.png`);
  }
}

export default CollectionPage;
