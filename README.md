# Symphony Solutions Automation 🚀

## Minimum Project Information 📄
This project has been developed to automate API and UI tests for the Symphony Solutions application. We use the end-to-end testing framework Cypress to write and execute our test cases. For a detailed and presentable view of the test results, we use Allure Report.

## Dependencies 📦

- Cypress ^9.7.0
- Allure-commandline ^2.24.0
- More dependencies in package.json

## Requirements 🛠️

- Node.js
- NPM

## Test Plan and Strategy 🧪

### API Testing 🌐

- Basic CRUD tests for all endpoints.
- Schema validation.
- Authentication and authorization tests.

### UI Testing 🖥️

- Form tests.
- Navigation tests.
- Visual elements validations (using screenshots).

## Strategy 🗺️
We use the test pyramid strategy, focusing more on unit and API tests and less on UI level tests. For test data, we use the Faker library.

## How to Run 🚀

### Install Dependencies
npm install

Run Tests in Development Environment
npm run cy:run:dev

Run Tests in Staging Environment
npm run cy:run:hom

How to Generate Allure Report 📊
After running your tests, you can generate an Allure report using the following commands:

For Development Environment
npm run cy:run:dev:report
allure generate allure-results --clean -o allure-report-dev
allure open allure-report-dev

For Staging Environment
npm run cy:run:hom:report
allure generate allure-results --clean -o allure-report-hom
allure open allure-report-hom

Continuous Integration (CI) 🔄
This project can be easily integrated into continuous integration (CI) pipelines for automated testing. We recommend using GitLab CI/CD, but you can adapt the settings for other CI/CD tools.

Example GitLab CI/CD Configuration

stages:
  - install_dependencies
  - test_dev
  - test_staging
  - generate_report
  - cleanup

variables:
  DOCKER_DRIVER: overlay2
  DOCKER_IMAGE: node:16

# Install dependencies
install_dependencies:
  stage: install_dependencies
  image: $DOCKER_IMAGE
  cache:
    paths:
      - node_modules/
  script:
    - npm install
  artifacts:
    paths:
      - node_modules/

# Run tests in the development environment
test_dev:
  stage: test_dev
  image: $DOCKER_IMAGE
  script:
    - mkdir -p results  # Ensure the 'results' folder exists
    - npm run cy:run:dev
  artifacts:
    paths:
      - results/allure-results
      - results/allure-report-dev

# Run tests in the staging environment (homologation)
test_staging:
  stage: test_staging
  image: $DOCKER_IMAGE
  script:
    - mkdir -p results  # Ensure the 'results' folder exists
    - npm run cy:run:hom
  artifacts:
    paths:
      - results/allure-results
      - results/allure-report-hom

# Generate Allure report for the development environment
generate_report_dev:
  stage: generate_report
  image: $DOCKER_IMAGE
  script:
    - npm run allure:generate:dev
  only:
    - master

# Generate Allure report for the staging environment
generate_report_staging:
  stage: generate_report
  image: $DOCKER_IMAGE
  script:
    - npm run allure:generate:hom
  only:
    - staging

# Cleanup stage (new stage)
cleanup:
  stage: cleanup
  script:
    - rm -rf results  # Remove the 'results' folder and its contents