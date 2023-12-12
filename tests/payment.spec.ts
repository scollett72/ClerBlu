import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { PaymentPage } from '../pages/payment-page';

  test('Can Make Payment - @smoke @nightly', async ({ page }) => {

    const loginPage = new LoginPage(page);
  
    await loginPage.login();

    const paymentPage = new PaymentPage(page);
  
    await paymentPage.makePayment();
  }
)