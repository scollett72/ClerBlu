import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';


export class  PaymentPage extends BasePage {
    readonly page: Page;
    readonly btnPay: Locator;
    readonly btnSubmit: Locator;
    readonly btnContinue: Locator;
    readonly txtCreditCard: Locator;
    readonly txtCvv: Locator;
    readonly btnPaySubmit: Locator;

    constructor(page: Page) {
      super(page);
      this.page = page;
      this.btnPay = page.locator("a[ui-sref='payments.details']");
      this.btnContinue = page.locator("[ng-click='submitBalance()']");
      this.btnSubmit = page.locator('#register .mass-cta-btn-alt a[form-validation-button]');
      this.txtCreditCard = page.locator('#textCardNumber');
      this.txtCvv = page.locator('#txtCVVCode');
      this.btnPaySubmit = page.locator('#btnSubmit');
    }

    async makePayment() {
      await this.page.goto('/massanutten/portal#/payments/information');
      await this.waitUntilLoaded();
      await this.btnPay.click();
      await this.btnContinue.click();
      await this.waitUntilLoaded();
      await this.txtCreditCard.fill('4111111111111111');
      await this.txtCvv.fill('123');
      await this.btnPaySubmit.click();
      await this.waitUntilLoaded();
    
    }
}