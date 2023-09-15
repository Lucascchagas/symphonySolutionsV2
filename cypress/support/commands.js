// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import '@shelex/cypress-allure-plugin';

import { el } from '../support/page-objects/login/elements';

Cypress.Commands.add("loginWithValidCredentials", () => {
  cy.get(el.username).type(Cypress.config().username);
  cy.get(el.password).type(Cypress.config().password);
  cy.get(el.loginButton).click();
  cy.url().should("be.equal", `${Cypress.config().baseUrl}/inventory.html`);
});

