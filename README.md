# Useful stuff
---
## Links
**Website:** https://www.cypress.io/
**Documentation:** https://docs.cypress.io/guides/overview/why-cypress
**Dashboard:** https://dashboard.cypress.io/

## npm packages
**Cypress:** `npm install cypress`
**Mochawesome reporter:** `npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator`

## Custom scripts
**Reporter script sequence**
```
{
    scripts": {
        "cleanup": "rm -rf ./mochawesome.json && rm -rf ./mochawesome-report && rm -rf ./cypress/results",
        "report-merge": "npx mochawesome-merge \"cypress/results/*.json\" > mochawesome.json",
        "report-marge": "npx marge mochawesome.json",
        "prereport": "npm run cleanup",
        "report": "npx cypress run --spec \"cypress/integration/3-sde-examples/**\" || npm run postreport",
        "postreport": "npm run report-merge && npm run report-marge",
        "recorded": "npx cypress run --record --key <KEY>"
      },
  }
```
