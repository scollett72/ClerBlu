import { type Locator, type Page } from '@playwright/test';

export class BasePage {
    
    readonly page: Page;
    readonly loadingIndicator: Locator;

    constructor(page: Page) {
      this.page = page;
      this.loadingIndicator = page.locator('#loading');
    }

    async isLoading() {
      return await this.loadingIndicator.isVisible();
    }

    async waitUntilLoaded() {
      try
      {
        return await this.loadingIndicator.waitFor({state: "hidden", timeout: 0});
      } catch (error) {
        if (!error.message.includes('Target page, context or browser has been closed')) {
          throw error;
        }
      }
    }
}