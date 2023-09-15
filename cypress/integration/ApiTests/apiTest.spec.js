/// <reference types="cypress" />

import '@shelex/cypress-allure-plugin';
import apiPageObject from "../../support/page-objects/publicApi/api";

describe("API Test with Cypress", () => {
  it("should perform API test", () => {
    apiPageObject.getEntries().then((response) => {
      expect(response.status).to.eq(200);

      const authEntries = apiPageObject.filterEntriesByCategory(
        response,
        "Authentication & Authorization"
      );

      expect(authEntries.length).to.be.greaterThan(0);
      cy.log(
        `Found ${authEntries.length} items in the Authentication & Authorization category`
      );

      console.log(authEntries);
      cy.log("Found objects:", authEntries);

      authEntries.forEach((entry, index) => {
        cy.log(`Entry ${index + 1}:`);
        console.log(`Entry ${index + 1}:`);
        for (const [key, value] of Object.entries(entry)) {
          cy.log(`${key}: ${value}`);
          console.log(`${key}: ${value}`);
        }
      });
    });
  });

  it("should handle invalid URL", () => {
    apiPageObject.getInvalidUrlEntries().then((invalidUrlResponse) => {
      expect(invalidUrlResponse.status).to.eq(404);
    });
  });

  it("should handle nonexistent category", () => {
    apiPageObject
      .getNonExistentCategoryEntries()
      .then((nonExistentCategoryResponse) => {
        expect(nonExistentCategoryResponse).to.be.empty;
      });
  });
});
