import { Angular4electronPage } from './app.po';

describe('angular4electron App', () => {
  let page: Angular4electronPage;

  beforeEach(() => {
    page = new Angular4electronPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
