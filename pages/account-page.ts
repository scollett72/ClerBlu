import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class AccountPage extends BasePage {
    
    readonly page: Page;
    readonly lblOwnerName: Locator;
    readonly lblOwnerNameSelector: string;

    constructor(page: Page) {
      super(page);
      this.page = page;
      this.lblOwnerNameSelector = 'span[ng-bind="owner.FullNameFirstNameFirst"].ng-binding';
      this.lblOwnerName = page.locator(this.lblOwnerNameSelector);
    }

    async getOwnerName() {
      await this.waitUntilLoaded();
      await this.page.waitForSelector(this.lblOwnerNameSelector, {timeout: 0});
      return await this.lblOwnerName.evaluate(element => (element as HTMLElement).innerText);
    }
}