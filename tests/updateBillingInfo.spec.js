import { test, expect } from '@playwright/test';
import { VALID_CREDENTIALS } from '../fixtures/validUserCredentials';
import { URLS } from '../fixtures/urls';
import { BillingInfo } from '../modules/billingInfo';
import { LoginAPI } from '../modules/loginAPI';
import { generateNewBillingInfo } from '../fixtures/validRegisterCredentials';

test.describe('Billing into tests', () => {
  let loginPage;
  let billinginfo;
  let bearerToken;
  const {
    customerID,
    cardholder,
    card_type,
    card_number,
    cvv,
    card_expiration_date,
  } = generateNewBillingInfo();

  test.beforeEach('Go to profile page', async ({ page }) => {
    loginPage = new LoginAPI(page);
    await page.goto(URLS['LOGIN_HEADER']);

    const response = await loginPage.login(
      VALID_CREDENTIALS['VALID_EMAIL'],
      VALID_CREDENTIALS['VALID_PASSWORD']
    );

    expect(response.status).toBe('Success');
    bearerToken = response.auth.token;
  });

  test('Change customer billing info', async ({ page }) => {
    billinginfo = new BillingInfo(page);

    const response = await billinginfo.updateBillingInfo(
      customerID,
      cardholder,
      card_type,
      card_number,
      cvv,
      card_expiration_date,
      bearerToken
    );
    console.log(response);
  });
});
