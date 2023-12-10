import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base-page';


export class ReservationPage extends BasePage {
    readonly page: Page;
    readonly btnNextStep: Locator;
    readonly btnMakeReservation: Locator;
    readonly boxAcknowledge: Locator;
    readonly txtRequests: Locator;
    readonly lblConfirmation: Locator;
    readonly lblConfirmationText: string; 
    readonly btnDetails: Locator;
    readonly btnCancel: Locator;

    constructor(page: Page) {
      super(page);
      this.page = page;
      this.btnNextStep = page.locator("[ng-click='next()']");
      this.btnMakeReservation = page.locator("button[ng-click='next()']");
      this.boxAcknowledge = page.locator("[ng-model='reservationConfirmationAcknowledged']");
      this.txtRequests = page.locator("#accessbilityRequestsInput");
      this.lblConfirmationText = ('h4.page-header.rsvp');
      this.lblConfirmation = page.locator(this.lblConfirmationText);
      this.btnDetails = page.locator('i.glyphicon.glyphicon-triangle-right');
      this.btnCancel = page.locator("[ng-click='cancelReservation(reservation.ReservationID)']");

    }


    async makeReservation() {
     await this.waitUntilLoaded();
     await this.page.goto('massanutten/#/reservations/make');
     await this.waitUntilLoaded();    
     await this.btnNextStep.click();
     await this.boxAcknowledge.click();
     await this.btnMakeReservation.click();


    }

    async getConfirmationText() {
      await this.waitUntilLoaded();
      await this.page.waitForSelector(this.lblConfirmationText, {timeout: 0});
      return await this.lblConfirmation.evaluate(element => (element as HTMLElement).innerText);
      
      }

    async cancelReservation(){
      await this.page.goto('massanutten/#/reservations/information');
      await this.btnDetails.click();
      await this.btnCancel.click();
    }
}