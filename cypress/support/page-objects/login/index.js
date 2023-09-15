import { el } from './elements';
import { faker } from '@faker-js/faker';

let emailFaker = faker.internet.email();
let passwordFaker = faker.internet.password();

class LoginAcess {
go() {
cy.visit('/')
}

performLogin() {
cy.get(el.loginButton).click()
}

clearForm() {
cy.get(el.username).clear()
cy.get(el.password).clear()
}

fillValidLogin() {
cy.get(el.username).type(Cypress.config().username);
cy.get(el.password).type(Cypress.config().password);
}
fillInvalidLoginUsernamePassword() {
cy.get(el.username).type(emailFaker)
cy.get(el.password).type(passwordFaker, {log: false})
}
fillUserLoginInvalid() {
cy.get(el.username).type(emailFaker)
cy.get(el.password).type(Cypress.config().password, {log: false})
}
fillInvalidPasswordLogin() {
cy.get(el.username).type(Cypress.config().username)
cy.get(el.password).type(passwordFaker, {log: false})
}

validateLoginErrorMessage() {
cy.get(el.errorMessage).should('contain', 'Epic sadface: Username and password do not match any user in this service')
}

validateLoginRealized() {
cy.url().should('be.equal', `${Cypress.config().baseUrl}/inventory.html`)
}
}

export default new LoginAcess
