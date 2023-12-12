class ComparePage {
  constructor() {
    this.elements = {
      criteriaRow: (id) => `#criterion-${id}`,
      cqmRow: (id) => `#cqm-${id}`,
      chplProductNumber: (number) => `td*=${number}`,
    };
  }

  async getCellWithCriteriaId(id) {
    return $(this.elements.criteriaRow(id)).$$('td')[0];
  }

  async getCellWithCqmId(id) {
    return $(this.elements.cqmRow(id)).$$('td')[0];
  }

  async isListingLoaded(chplProductNumber) {
    return $(this.elements.chplProductNumber(chplProductNumber)).isDisplayed();
  }

  async findColumnIndex(chplProductNumber) {
    return $(this.elements.chplProductNumber(chplProductNumber))
      .parentElement()
      .$$('td')
      .findIndex(async (ele) => await(ele.getText()) === chplProductNumber);
  }
}

export default ComparePage;
