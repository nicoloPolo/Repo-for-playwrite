class SignUpForm {
  constructor(page) {
    this._page = page;
    this._nameField = page.locator("#signupName");
    this._lastNameField = page.locator("#signupLastName");
    this._emailField = page.locator('[name="email"]');
    this._passwordField = page.getByLabel("Password", { exact: true });
    this._repeatPasswordField = page.getByLabel("Re-enter password");
    this._registerButton = page.getByRole("button", { name: "Register" });
  }

  async enterName(name) {
    await this._nameField.fill(name);
  }

  async enterLastName(lastName) {
    await this._lastNameField.fill(lastName);
  }

  async enterEmail(email) {
    await this._emailField.fill(email);
  }

  async enterPassword(password) {
    await this._passwordField.fill(password);
  }

  async enterRePassword(rePassword) {
    await this._repeatPasswordField.fill(rePassword);
  }

  async fillinRegistrationForm(name, lastName, email, password, rePassword) {
    await this.enterName(name);
    await this.enterLastName(lastName);
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.enterRePassword(rePassword);
    await this._registerButton.click();
  }
}

export default SignUpForm;
