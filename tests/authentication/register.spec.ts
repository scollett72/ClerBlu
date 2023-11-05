import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/register-page';
import { AccountPage } from '../../pages/account-page';

test('Can Register - @smoke @nightly', async ({ page }) => {
  const regPage = new RegisterPage(page);

  await regPage.register(
    `test+${generateGuid()}@techdynamism.com`,
    'Password1234%',
    'Ellsworth',
    '39846',
    '21228'
  )

  const accountPage = new AccountPage(page);

  const ownerName = await accountPage.getOwnerName();

  await expect(ownerName).toBe('Vincent M Ellsworth');

});

// TODO: Move to common library
function generateGuid() {
  let result, i, j;
  result = '';
  for(j=0; j<32; j++) {
    if( j == 8 || j == 12 || j == 16 || j == 20)
      result = result + '-';
    i = Math.floor(Math.random()*16).toString(16).toUpperCase();
    result = result + i;
  }
  return result;
}
