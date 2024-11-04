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
    readonly drpExpMonth: Locator;
    readonly drpExpYear: Locator; 
    readonly txtBalance: string;
    readonly txtBalanceAmt: Locator;
    readonly txtNewBalance: string;
    readonly txtNewBalanceAmt: Locator;

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
      this.drpExpMonth = page.locator('#cboExpirationMonth');
      this.drpExpYear = page.locator('#cboExpirationYear');
      this.txtBalance = ("td[contains(text(),'$')]");
      this.txtBalanceAmt = page.locator(this.txtBalance);
      this.txtNewBalance = ("div[contains(text(),'$')]");
      this.txtNewBalanceAmt = page.locator(this.txtNewBalance);

    }

    async makePayment(amount: number) {
      await this.page.goto('/massanutten/portal#/payments/information');
      await this.waitUntilLoaded();
      await this.btnPay.click();
      await this.waitUntilLoaded();
      await this.txtOtherAmount.fill(amount.toString());
      await this.btnContinue.click();
      await this.page.waitForNavigation({timeout: 0}); 
      await this.txtCreditCard.fill('342877777777705');
      await this.txtCvv.fill('1234');
      await this.btnSecurePaySubmit.click();
      await this.page.waitForNavigation({timeout: 0}); 
      await this.waitUntilLoaded();  
      await this.btnMassanuttenSubmit.click();
    }
      
//Here I'm trying to get the original balance - prePayment
//Do I then also need a function to get the post payment balance? 
     async getBalance() {
      await this.waitUntilLoaded();
      await this.page.waitForSelector(this.txtBalance, {timeout: 0});
      //return await this.txtBalanceAmt.evaluate(element => (element as HTMLElement).innerText);

       }
//This could be the function to get the updated balance amount maybe?  
//But I'm stuck on comparing the two
       async getNewBalance() {
        await this.waitUntilLoaded();
        await this.page.waitForSelector(this.txtNewBalance, {timeout: 0});
       // return await this.txtNewBalanceAmt.evaluate(element => (element as HTMLElement).innerText);
  
         }
      // TODO: Confirm balance updated
    
}