import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';
import { AccountPage } from '../../pages/account-page';


test('Can Login - @smoke @nightly', async ({ page }) => {
  const loginPage = new LoginPage(page);


  await loginPage.login();
  const accountPage = new AccountPage(page);

  const ownerName = await accountPage.getOwnerName();

  await expect(ownerName).toBe('Vincent M Ellsworth');


});
