import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { PaymentPage } from '../pages/payment-page';

  test('Can Make Payment - @smoke @nightly', async ({ page }) => {

    const loginPage = new LoginPage(page);
  
    await loginPage.login();

    const paymentPage = new PaymentPage(page);
  
    await paymentPage.makePayment();

    const balance = await paymentPage.getBalance();
    
    //How do I do the comparison here? I don't know where to declare the beforePayment variable to compare against afterPayment amount
    await expect(balance).toBe('');
  }
)