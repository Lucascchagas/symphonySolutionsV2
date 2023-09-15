/// <reference types="cypress" />

import '@shelex/cypress-allure-plugin';
import LoginAcess from "../../support/page-objects/login/index";
import SortByName from "../../support/page-objects/sortByName/index";

describe("Sort by name Functionality", () => {
  beforeEach(() => {
    LoginAcess.go();
    cy.wait(2000);
  });

    afterEach(() => {
      cy.screenshot();
    });

  it("Then it must filter the products from Z to A", () => {
    cy.loginWithValidCredentials();
    SortByName.SortByAToZ();
    SortByName.ChangeTheFilterOrder();
    SortByName.SortByZToA();
  });

  it("Then it must validate that the products are filtered from A to Z", () => {
    cy.loginWithValidCredentials();
    SortByName.SortByAToZ();
  });
});
