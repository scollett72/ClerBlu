import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { ReservationPage } from '../pages/reservation-page';

test('Can Make Reservation - @smoke @nightly', async ({ page }) => {

  const loginPage = new LoginPage(page);
 
  await loginPage.login();


  const reservationPage = new ReservationPage(page);
 
  await reservationPage.makeReservation();
  const confirmation = await reservationPage.getConfirmationText();
  await expect(confirmation).toBe('RESERVATION CONFIRMED');

  await reservationPage.cancelLatestReservation();
  }
)