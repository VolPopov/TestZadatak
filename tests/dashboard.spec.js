import { test, expect } from '@playwright/test';
import { Dashboard } from '../modules/dashboard';
import { VALID_CREDENTIALS } from '../fixtures/validUserCredentials';
import { URLS } from '../fixtures/urls';
import { LoginPage } from '../modules/login';
import { Header } from '../modules/header';

test.describe('dashboard tests', () => {
  let dashboard;
  let loginPage;
  let header;

  test.beforeEach('Visit the dashboard page', async ({ page }) => {
    dashboard = new Dashboard(page);
    header = new Header(page);

    loginPage = new LoginPage(page);
    await page.goto(URLS['LOGIN_HEADER']);

    await loginPage.login(
      VALID_CREDENTIALS['VALID_EMAIL'],
      VALID_CREDENTIALS['VALID_PASSWORD']
    );

    await page.waitForURL(URLS['DASHBOARD']);
    await expect(page).toHaveURL(URLS['DASHBOARD']);
    await expect(dashboard.searchBar).toBeEditable();
  });

  test('Add a product to the cart on page 1', async ({ page }) => {
    let broj = 8;
    await expect(dashboard.addToCartButton.nth(broj)).toBeEnabled();
    await dashboard.addAnItemToCart(broj);
    await header.button.nth(0).click();
    const ime = await page.textContent(
      '[test-data="product-container"] >> h1 >> nth=' + broj,
      { strict: true }
    );
    await expect(dashboard.cartMenu).toBeVisible();
    await expect(dashboard.cartMenu).toContainText(ime);
  });

  test('Add 2 instances of a product on page 2', async ({ page }) => {
    let broj = 2;
    await dashboard.switchPage(2);
    await page.waitForTimeout(8000);
    await expect(dashboard.addToCartButton.nth(broj)).toBeEnabled();
    await dashboard.addAnItemToCart(broj);
    await page.waitForTimeout(8000);
    await dashboard.addAnItemToCart(broj);
    await page.waitForTimeout(5000);
    await header.button.nth(0).click();
    const ime = await page.textContent(
      '[test-data="product-container"] >> h1 >> nth=' + broj,
      { strict: true }
    );
    await expect(dashboard.cartMenu).toBeVisible();
    await expect(dashboard.cartMenu).toContainText(ime);
  });

  test('Delete all products from cart', async ({ page }) => {
    let broj = 14;
    let cartID = 119;
    await expect(dashboard.addToCartButton.nth(broj)).toBeEnabled();
    await dashboard.addAnItemToCart(broj);
    await header.button.nth(0).click();
    await expect(dashboard.clearButton).toBeVisible();
    const responsePromise = page.waitForResponse(`/api/v1/cart/${cartID}`);
    await dashboard.deleteAllItemsFromCart();
    const response = await responsePromise;
    const responseBody = await response.json();
    expect(responseBody.status).toBe('Success');
    expect(responseBody.cart).toStrictEqual([]);
    await expect(
      page.locator(
        "div[class='z-10 text-3xl font-semibold sm:mt-12 md:mt-12 lg:mt-16']"
      )
    ).toHaveText('No items in cart. Add some!');
  });
});
