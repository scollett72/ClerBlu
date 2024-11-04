import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { PaymentPage } from '../pages/payment-page';

  test('Can Make Payment - @smoke @nightly', async ({ page }) => {

    const loginPage = new LoginPage(page);
  
    await loginPage.login();

    const paymentPage = new PaymentPage(page);
    const originalBalance = await paymentPage.getBalance();
    const amount = 1;
    await paymentPage.makePayment(amount);

    const newBalance = await paymentPage.getNewBalance();
    
    //How do I do the comparison here? I don't know where to declare the beforePayment variable to compare against afterPayment amount
    await expect(newBalance).toBe(originalBalance - amount);
  }
)