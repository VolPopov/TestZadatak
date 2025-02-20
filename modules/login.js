export class LoginPage {
  constructor(page) {
    this.emailField = page.locator('#email');
    this.passwordField = page.locator('#password');
    this.submitButton = page.locator('button');
  }

  async login(email, password) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.submitButton.click();
  }
}
