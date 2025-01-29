# Playwright automated test development guide
[1. Install Playwright](#install-playwright)

[2. Run tests](#run-tests)

[3. Write tests](#write-tests)

[4. Recommendations](#recommendations)

[5. Resources](#resources)

### Install Playwright
```shell
cd velocloud.src/vco/src/client/ui/apps/vco-ui-playwright-e2e
npm install @playwright/test
npx playwright install --with-deps
```

### Run tests
Navigate to "src" subfolder of the playwright folder:
```shell
cd velocloud.src/vco/src/client/ui/apps/vco-ui-playwright-e2e/src
```
Run all tests:
```shell 
npx playwright test
```
Run selected tests:
```shell 
npx playwright test -g 'full or partial test name'
```
or
```shell
npx playwright test -g 'caseId1|caseId2|caseId3'
```

### Write tests
Use Playwright's `beforeAll` or `beforeEach` functions to add step(s) required for test setup.
Design a page object as a TypeScript class with page elements as class attributes and
methods required for interaction with those elements. Use Playwright's Inspector and a `codegen` feature for assistance.
Add necessary assertions.
```shell
npx playwright codegen
```

### Recommendations
1. It is preferred to isolate tests from each other as much as possible to be able to run tests in parallel.
2. Force your assertions for failures (expectations to fail), e.g. if a test verifies that a record in a table is present - 
   pause a test and remove that record or temporarily omit its creation and verify the error is caught.

### Resources
Playwright doc: https://playwright.dev/docs/intro

Playwright YouTube channel: https://www.youtube.com/@Playwrightdev
