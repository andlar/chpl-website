class ComplaintsComponent {
  constructor() {
    this.elements = {
      certificationBody: '#certification-body',
      receivedDate: '#received-date',
      acbComplaintId: '#acb-complaint-id',
      complainantType: '#complainant-type',
      summary: '#summary',
      saveComplaint: '#action-bar-save',
      closedDate: '#closed-date',
      filter: '#data-filter',
      downloadResultsButton: '#download-results',
      newComplaint: '//*[text()="Add New Complaint"]',
      editButton: '//*[text()="Edit"]/parent::button',
      actions: '#actions',
      oncId: '#onc-complaint-id',
      criterion: '#criteria',
      listings: '#listings',
      surveillance: '#surveillances',
      complainantContacted: '#complainant-contacted',
      developerContacted: '#developer-contacted',
      oncAtlContacted: '#onc-atl-contacted',
      informedOnc: '#flag-for-onc-review',
    };
  }

  get editButton() {
    return $(this.elements.editButton);
  }

  async complaintsBody() {
    return (await $('.MuiCardContent-root')).getText();
  }

  get viewButton() {
    return $('//span[text()="View"]');
  }

  async selectSurveillance(surveillance) {
    await (await $(this.elements.surveillance)).click();
    await (await $(`//li[contains(text(),"${surveillance}")]`)).click();
  }

  async selectListing(listings) {
    await (await $(this.elements.listings)).click();
    await (await $(this.elements.listings)).addValue(listings);
    await (await $(`//li[contains(text(),"${listings}")]`)).click();
  }

  async set(fields) {
    await (await $(this.elements.certificationBody)).click();
    await (await $(`//li[text()="${fields.body}"]`)).click();
    await (await $(this.elements.receivedDate)).addValue(fields.receivedDate);
    await (await $(this.elements.acbComplaintId)).addValue(fields.acbId);
    await (await $(this.elements.summary)).addValue(fields.summary);
    await (await $(this.elements.complainantType)).scrollIntoView();
    await (await $(this.elements.complainantType)).click();
    await (await $(`//li[text()="${fields.type}"]`)).click();
  }

  async setOptionalFields(fields) {
    await (await $(this.elements.oncId)).addValue(fields.oncId);
    await (await $(this.elements.actions)).addValue(fields.actions);
    await (await $(this.elements.criterion)).click();
    await (await $(`//li[text()="${fields.criterion}"]`)).click();
    await (await $(this.elements.listings)).click();
    await (await $(this.elements.listings)).addValue(fields.listings);
    await (await $(`//li[contains(text(),"${fields.listings}")]`)).click();
    await (await $(this.elements.surveillance)).click();
    await (await $(`//li[contains(text(),"${fields.surveillance}")]`)).click();
    await (await $(this.elements.complainantContacted)).click();
    await (await $(this.elements.developerContacted)).click();
    await (await $(this.elements.oncAtlContacted)).click();
    await (await $(this.elements.informedOnc)).click();
  }

  async saveComplaint() {
    return (await $(this.elements.saveComplaint)).click();
  }

  get closedDate() {
    return $(this.elements.closedDate);
  }

  async setActions(actions) {
    return (await $(this.elements.actions)).addValue(actions);
  }

  async fieldError(fieldName) {
    return (await $(`#${fieldName}-helper-text`)).getText();
  }

  get downloadResultsButton() {
    return $(this.elements.downloadResultsButton);
  }

  get newComplaintButton() {
    return $(this.elements.newComplaint);
  }

  async addNewComplaint() {
    return (await $(this.elements.newComplaint)).click();
  }

  get filter() {
    return $(this.elements.filter);
  }

  async editComplaint(id) {
    await this.viewComplaint(id);
    await (await $('//*[text()="Edit"]/parent::button')).click();
  }

  async viewComplaint(id) {
    await (this.searchFilter(id));
    await browser.waitUntil(async () => (await (await (await (await $('chpl-surveillance-complaints')).$('table')).$('tbody')).$$('tr')).length - 1 === 1);
    await (await $('//span[text()="View"]/parent::button')).click();
  }

  async waitForUpdatedTableRowCount() {
    const start = (await (await (await $('table')).$('tbody')).$$('tr')).length;
    await browser.waitUntil(async () => (await (await (await $('table')).$('tbody')).$$('tr')).length !== start);
  }

  async advancedSearch() {
    await (await $('//button[text()="Advanced Search"]')).click();
  }

  async searchFilter(value) {
    await (await $(this.elements.filter)).clearValue();
    await (await $(this.elements.filter)).addValue(value);
  }

  async advanceFilterOptions(value) {
    await (await $(`#filter-list-${value}`)).click();
  }

  async chooseAdvanceSearchOption(option) {
    await (await $(`//button[text()="${option}"]`)).click();
  }
}

export default ComplaintsComponent;
