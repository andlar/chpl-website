import CollectionPage from '../collection.async.po';

class BannedDevelopersPage extends CollectionPage {
  constructor() {
    super();
    this.elements = {
      header: 'h1=Developers Under Certification Ban',
      downloadRealWorldTesting: '#download-real-world-testing',
    };
  }

  async getBodyText() {
    return (await $(this.elements.header).parentElement()).nextElement();
  }
}

export default BannedDevelopersPage;
