import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
    
    readonly page: Page;
    readonly txtUserName: Locator;
    readonly txtPassword: Locator;
    readonly btnLogin: Locator;
    readonly lblLoginInfo: Locator;

    constructor(page: Page) {
      super(page);
      this.page = page;
      this.txtUserName = page.locator('#login #txtUserName');
      this.txtPassword = page.locator('#login #pwdPassword');
      this.btnLogin = page.locator('#login #loginButton');
      this.lblLoginInfo = page.locator('.acct-quick-view-content');
    }

    async login(username, password) {
      await this.page.goto('/massanutten/portal#/portaluser/login/0/0?returnUrl=%2Faccount%2Finformation');

      await this.waitUntilLoaded();
      
      await this.txtUserName.type(username);
      await this.txtPassword.type(password);

      await this.btnLogin.click();

      await this.page.waitForNavigation({timeout: 0});
    }
}