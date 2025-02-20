import { test, expect } from '@playwright/test';
import { LoginPage } from '../modules/login';
import { URLS } from '../fixtures/urls';
import { VALID_CREDENTIALS } from '../fixtures/validUserCredentials';

test.describe('Login test with UI', () => {
  let loginPage;

  test.beforeEach('Visit the login page', async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto(URLS['LOGIN_HEADER']);
    await expect(loginPage.emailField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
  });

  test('Log in with valid credentials', async ({ page }) => {
    await loginPage.login(
      VALID_CREDENTIALS['VALID_EMAIL'],
      VALID_CREDENTIALS['VALID_PASSWORD']
    );

    await page.waitForURL(URLS['DASHBOARD']);
    await expect(page).toHaveURL(URLS['DASHBOARD']);
  });
});
