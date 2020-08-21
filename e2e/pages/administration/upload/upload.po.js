const uploadElements = {
    chooseUploadListing: '//*[@id="ngf-label-upload-button-listing"]/input[@id="ngf-upload-button-listing"]',
    uploadButton: '.btn.btn-ai-success',
    listingUploadText: '//chpl-upload/div/div/chpl-upload-listings/div/div[2]/div',
    chooseUploadAPIDocumentation: '//*[@id="ngf-label-upload-button-api"]/input[@id="ngf-upload-button-api"]',
    uploadAPIDoc: 'chpl-upload-api-documentation',
    uploadMessages: '.upload-messages',
    uploadMessagesText: 'div.ng-binding.ng-scope',
    uploadSuccessfulText: '//*[@id="main-content"]/div/ui-view/chpl-upload/div/div/chpl-upload-listings/div/div[2]/div',
};
const path = require('path');

class UploadPage {
    constructor () { }

    get chooseUploadListingButton () {
        return $(uploadElements.chooseUploadListing);
    }

    get uploadButton () {
        return $(uploadElements.uploadButton);
    }

    get uploadSuccessfulText () {
        return $(uploadElements.uploadSuccessfulText);
    }

    get listingUploadText () {
        return $(uploadElements.listingUploadText);
    }

    get chooseUploadAPIDocumentation () {
        return $(uploadElements.chooseUploadAPIDocumentation);
    }

    get apiDocUploadText () {
        return $(uploadElements.uploadAPIDoc).$(uploadElements.uploadMessages).$(uploadElements.uploadMessagesText);
    }

    uploadListing (uploadfilePath) {
        const filePath = path.join(__dirname, uploadfilePath);
        this.chooseUploadListingButton.addValue(browser.uploadFile(filePath));
        this.uploadButton.waitAndClick();
        browser.waitUntil( () => this.listingUploadText.isDisplayed())
    }

    uploadAPIDocFile (uploadfilePath) {
        const filePath = path.join(__dirname, uploadfilePath);
        this.chooseUploadAPIDocumentation.addValue(browser.uploadFile(filePath));
        this.uploadButton.scrollIntoView();
        this.uploadButton.click();
        browser.waitUntil( () => this.apiDocUploadText.isDisplayed());
    }
}

export default UploadPage;
