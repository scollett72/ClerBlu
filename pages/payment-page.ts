import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class  PaymentPage extends BasePage {
    readonly page: Page;
    readonly btnPay: Locator;
    readonly btnMassanuttenSubmit: Locator;
    readonly btnContinue: Locator;
    readonly txtOtherAmount: Locator;
    readonly txtCreditCard: Locator;
    readonly txtCvv: Locator;
    readonly btnSecurePaySubmit: Locator;

    constructor(page: Page) {
      super(page);
      this.page = page;
      this.btnPay = page.locator("a[ui-sref='payments.details']");
      this.btnContinue = page.locator("[ng-click='submitBalance()']");
      this.btnMassanuttenSubmit = page.locator("[ng-click='submitConfirmation()']");
      this.txtOtherAmount = page.locator('#amount_actual');
      this.txtCreditCard = page.locator('#txtCardNumber');
      this.txtCvv = page.locator('#txtCVVCode');
      this.btnSecurePaySubmit = page.locator('#btnSubmit');
    }

    async makePayment() {
      await this.page.goto('/massanutten/portal#/payments/information');
      await this.waitUntilLoaded();
      await this.btnPay.click();
      await this.waitUntilLoaded();
      await this.txtOtherAmount.fill('1');
      await this.btnContinue.click();
      await this.page.waitForNavigation({timeout: 0}); 
      await this.txtCreditCard.fill('4111111111111111');
      await this.txtCvv.fill('123');
      await this.btnSecurePaySubmit.click();
      await this.page.waitForNavigation({timeout: 0}); 
      await this.waitUntilLoaded();  
      await this.btnMassanuttenSubmit.click();
      // TODO: Submit payment
      // TODO: Confirm balance updated
    }
}