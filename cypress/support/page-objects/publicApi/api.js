import devConfig from '../../../../dev.json';

class ApiPageObject {
  getBaseUrl() {
    return devConfig.apiBaseUrl;
  }

  getEntries() {
    return cy.request(`${this.getBaseUrl()}`);
  }

  filterEntriesByCategory(response, category) {
    return response.body.entries.filter(entry => entry.Category === category);
  }

  getInvalidUrlEntries() {
    return cy.request({
      url: `${this.getBaseUrl()}/nonexistent`,
      failOnStatusCode: false,
    });
  }

  getNonExistentCategoryEntries() {
    return this.getEntries().then((response) => {
      const nonExistentCategory = 'NonExistentCategory';
      return this.filterEntriesByCategory(response, nonExistentCategory);
    });
  }

  interceptAndIgnore429(url) {
    cy.intercept({
      method: 'GET',
      url,
    }).as('apiRequest');
  
    return cy.wait('@apiRequest', { timeout: 15000 }).then((interception) => {
      const response = interception.response;
  
      if (response && response.statusCode === 429) {
        cy.log('Request with status code 429 was intercepted and ignored.');
      } else {
        cy.log(`Request completed with status code: ${response ? response.statusCode : 'unknown'}`);
      }
    });
  }
  

}


export default new ApiPageObject();
