/// <reference types="cypress" />

import '@shelex/cypress-allure-plugin';
import LoginAcess from "../../support/page-objects/login/index";

describe("Login Functionality", () => {
    beforeEach(() => {
    LoginAcess.go();
    cy.wait(2000);
  });

  afterEach(() => {
    cy.screenshot();
  });

  it("Then it must log in successfully", () => {
    LoginAcess.fillValidLogin();
    LoginAcess.performLogin();
    LoginAcess.validateLoginRealized();
  });
  it("Then it should display an error message when entering an invalid username and password", () => {
    LoginAcess.fillInvalidLoginUsernamePassword();
    LoginAcess.performLogin();
    LoginAcess.validateLoginErrorMessage();
  });
  it("Then it should display an error message when entering an invalid user", () => {
    LoginAcess.fillUserLoginInvalid();
    LoginAcess.performLogin();
    LoginAcess.validateLoginErrorMessage();
  });
  it("Then it should display an error message when entering an invalid password", () => {
    LoginAcess.fillInvalidPasswordLogin();
    LoginAcess.performLogin();
    LoginAcess.validateLoginErrorMessage();
  });
});
