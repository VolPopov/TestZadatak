export class RegisterPage {
  constructor(page) {
    this.usernameField = page.locator('#username');
    this.emailField = page.locator('#email');
    this.passwordField = page.locator('#password');
    this.submitButton = page.locator('button');
  }

  async register(username, email, password) {
    await this.usernameField.fill(username);
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.submitButton.click();
  }
}
