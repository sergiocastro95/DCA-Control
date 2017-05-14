import { DCAControlPage } from './app.po';

describe('dcacontrol App', function() {
  let page: DCAControlPage;

  beforeEach(() => {
    page = new DCAControlPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
