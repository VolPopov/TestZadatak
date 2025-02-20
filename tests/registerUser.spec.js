import { test, expect } from '@playwright/test';
import { RegisterPage } from '../modules/register';
import { URLS } from '../fixtures/urls';
import { generateUserCredentials } from '../fixtures/validRegisterCredentials';

test.describe('Login test with UI', () => {
  let registerPage;
  const { username, email, password } = generateUserCredentials(5);

  test.beforeEach('Visit the login page', async ({ page }) => {
    registerPage = new RegisterPage(page);
    await page.goto(URLS['REGISTER_HEADER']);
    await expect(registerPage.usernameField).toBeVisible();
    await expect(registerPage.emailField).toBeVisible();
    await expect(registerPage.passwordField).toBeVisible();
    await expect(registerPage.submitButton).toBeVisible();
  });

  test('Register new user', async ({ page }) => {
    await registerPage.register(username, email, password);
    await page.waitForURL(URLS['DASHBOARD']);
    await expect(page).toHaveURL(URLS['DASHBOARD']);
  });
});
