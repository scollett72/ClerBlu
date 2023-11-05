import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class RegisterPage extends BasePage {
    
    readonly page: Page;
    readonly txtUserName: Locator;
    readonly txtPassword: Locator;
    readonly txtConfirmPassword: Locator;
    readonly txtLastName: Locator;
    readonly txtOwnerNumber: Locator;
    readonly txtZipCode: Locator;
    readonly btnSubmit: Locator;

    constructor(page: Page) {
      super(page);
      this.page = page;
      this.txtUserName = page.locator('#register #txtUserName');
      this.txtPassword = page.locator("#register [name='password']");
      this.txtConfirmPassword = page.locator("#register [name='confirmPassword']");
      this.txtLastName = page.locator("#register [name='lastname']");
      this.txtOwnerNumber = page.locator("#register [name='ownernumber']");
      this.txtZipCode = page.locator("#register [name='zipcode']");
      this.btnSubmit = page.locator('#register .mass-cta-btn-alt a[form-validation-button]');
    }

    async register(username, password, lastname, ownernumber, zipcode) {
      await this.page.goto('/massanutten/portal#/portaluser/login/1');

      await this.waitUntilLoaded();
      
      await this.txtUserName.type(username);
      await this.txtPassword.type(password);
      await this.txtConfirmPassword.type(password);
      await this.txtLastName.type(lastname);
      await this.txtOwnerNumber.type(ownernumber);
      await this.txtZipCode.type(zipcode);

      await this.btnSubmit.click({noWaitAfter: true});

      await this.page.waitForNavigation({timeout: 0});
    }
}