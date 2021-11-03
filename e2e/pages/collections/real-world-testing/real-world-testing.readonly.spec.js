import Hooks from '../../../utilities/hooks';

import RealWorldTestingPage from './real-world-testing.po';

const path = require('path');
const fs = require('fs');

const config = require('../../../config/mainConfig');

let hooks;
let page;

describe('the Real World Testing collection page', () => {
  beforeEach(async () => {
    page = new RealWorldTestingPage();
    hooks = new Hooks();
    hooks.open('#/collections/real-world-testing');
    await hooks.waitForSpinnerToDisappear();
  });

  it('should have body text', () => {
    expect(page.bodyText.getText()).toContain('This list includes all 2015 Edition, including Cures Update, health IT products that have been certified to at least one of the following API Criteria:');
    expect(page.bodyText.getText()).toContain('The Mandatory Disclosures URL is also provided for each health IT product in this list. This is a hyperlink to a page on the developer\'s official website that provides in plain language any limitations and/or additional costs associated with the implementation and/or use of the developer\'s certified health IT.');
  });

  it('should have table headers in a defined order', () => {
    const expectedHeaders = ['CHPL ID', 'Developer\nsorted ascending', 'Product', 'Version', 'Status/Edition', 'Real World Testing Plans URL', 'Real World Testing Results URL'];
    const actualHeaders = page.getListingTableHeaders();
    expect(actualHeaders.length).toBe(expectedHeaders.length, 'Found incorrect number of columns');
    actualHeaders.forEach((header, idx) => {
      expect(header.getText()).toBe(expectedHeaders[idx]);
    });
  });

  it('should have rwt download button', () => {
    expect(page.downloadAllRwtButton.isDisplayed()).toBe(true);
  });

  xdescribe('when filtering', () => {
    let countBefore;
    let countAfter;
    beforeEach(() => {
      countBefore = page.listingTotalCount();
    });

    afterEach(() => {
      page.clearFilters.click();
    });

    describe('when adding "withdrawn by developer"', () => {
      it('should filter listing results', () => {
        page.selectFilter('certificationStatus', 'Withdrawn_by_Developer');
        page.waitForUpdatedListingResultsCount();
        countAfter = page.listingTotalCount();
        expect(countAfter).toBeGreaterThan(countBefore);
      });
    });
  });

  xdescribe('when searching listing by developer', () => {
    const DEVELOPER_COL_IDX = 1;
    const developerName = 'MD Charts';
    it('should only show listings that match the developer', () => {
      page.searchForListing(developerName);
      page.waitForUpdatedListingResultsCount();
      const count = page.listingTotalCount();
      for (let i = 1; i <= count; i += 1) {
        expect(page.getColumnText(i, DEVELOPER_COL_IDX)).toContain(developerName);
      }
    });
  });

  xdescribe('when searching listing by version', () => {
    const VERSION_COL_IDX = 3;
    const versionName = '2018 R1';
    it('should only show listings that match the version', () => {
      page.searchForListing(versionName);
      page.waitForUpdatedListingResultsCount();
      const count = page.listingTotalCount();
      for (let i = 1; i <= count; i += 1) {
        expect(page.getColumnText(i, VERSION_COL_IDX)).toContain(versionName);
      }
    });
  });

  xdescribe('when searching listing by product', () => {
    const PRODUCT_COL_IDX = 2;
    const productName = 'Acumen EHR';
    it('should only show listings that match the product', () => {
      page.searchForListing(productName);
      page.waitForUpdatedListingResultsCount();
      const count = page.listingTotalCount();
      for (let i = 1; i <= count; i += 1) {
        expect(page.getColumnText(i, PRODUCT_COL_IDX)).toContain(productName);
      }
    });
  });

  xdescribe('when searching listing by CHPL ID', () => {
    const CHPLID_COL_IDX = 4;
    const chplIdName = '15.07.07.1582.HC01.03.00.1.200507';
    it('should only show listings that match the product', () => {
      page.searchForListing(chplIdName);
      page.waitForUpdatedListingResultsCount();
      const count = page.listingTotalCount();
      for (let i = 1; i <= count; i += 1) {
        expect(page.getColumnText(i, CHPLID_COL_IDX)).toContain(chplIdName);
      }
    });
  });

  xdescribe('when clicking on all RWT download button', () => {
    it('should download a file', () => {
      page.downloadAllRwtButton.click();
      const apiFileName = 'APIDocData';
      browser.pause(config.timeout);
      const files = fs.readdirSync(global.downloadDir);
      const fileName = files.filter((file) => file.match(new RegExp(`${apiFileName}.*.xlsx`))).toString();
      expect(fileName).toContain(apiFileName);
      const filePath = path.join(global.downloadDir, fileName);
      const stat = fs.statSync(filePath);
      expect(stat.size / 1000).toBeGreaterThan(10);
    });
  });
});
