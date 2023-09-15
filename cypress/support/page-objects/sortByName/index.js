import { el } from "./elements";

class SortByName {
  SortByAToZ() {
    cy.get(el.filtering).should("have.value", "az");
    cy.get(el.products).then(($items) => {
      let sorted = $items.map((index, el) => Cypress.$(el).text()).get();
      let original = [...sorted];
      sorted = sorted.sort();
      expect(original).to.deep.eq(sorted);
    });
  }

  SortByZToA() {
    cy.get(el.products).then(($items) => {
      let sorted = $items.map((index, el) => Cypress.$(el).text()).get();
      let original = [...sorted];
      sorted = sorted.sort().reverse();
      expect(original).to.deep.eq(sorted);
    });
  }

  ChangeTheFilterOrder() {
    cy.get(el.filtering).select("za");
  }
}

export default new SortByName
