import { test, expect } from '@playwright/test';

test('Can Login', async ({ page }) => {
  await page.goto('/massanutten/portal#/portaluser/login/0/0?returnUrl=%2Faccount%2Finformation');

  await page.fill('#txtUserName', 'test+Automation@techdynamism.com');
  await page.fill('#pwdPassword', 'Password123%');

  await page.click('#loginButton');

  await page.waitForSelector('.acct-quick-view', {timeout: 99000});

  const selector = 'span[ng-bind="owner.FullNameFirstNameFirst"].ng-binding';

  await page.waitForSelector(selector, { state: 'visible' });
  const ownerName = await page.$eval(selector, element => (element as HTMLElement).innerText);

  await expect(ownerName).toBe('Vincent M Ellsworth');

});
