interface Login {
  username: string;
  password: string;
}

interface Logins {
  testUser: Login;

}

interface Config {
  logins: Logins;
}

import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';
import fs from 'fs/promises';

async function getConfig(): Promise<Config> {
  const configPath = ('./config.json');
  const configFile = await fs.readFile(configPath, 'utf8');
  return JSON.parse(configFile) as Config;
}
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

    async login() {
      const config = await getConfig();
      const login = config.logins;
      await this.page.goto('https://d32vetlwn56zps.cloudfront.net/dashboard');

      await this.waitUntilLoaded();
      
      await this.txtUserName.type(login.testUser.username);
      await this.txtPassword.type(login.testUser.password);

      await this.btnLogin.click();

      await this.page.waitForNavigation({timeout: 0});
    }

   
}