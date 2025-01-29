import {
  Reporter,
  FullConfig,
  Suite,
  FullResult
} from '@playwright/test/reporter'
import * as fs from 'fs'

class MyReporter implements Reporter {
  onBegin(config: FullConfig<{}, {}>, suite: Suite) {
    console.log(`Execution of ${suite.allTests().length} tests`)
  }

  onEnd(result: FullResult) {
    console.log(`Execution finished with status of ${result.status}`)
  }

  onTestBegin(test) {
    console.log(`Execution of ${test.title} started.`)
  }

  onTestEnd(test, result) {
    const execTime = result.duration

    const data = {
      test: test.title,
      status: result.status,
      executionTime: execTime,
      errors: result.errors
    }

    const dataToString = JSON.stringify(data, null, 2)
    console.log(dataToString)

    fs.writeFileSync('test-result.json', dataToString)
  }
}

export default MyReporter

// npx playwright test --reporter=custom-reporter.ts
// npx playwright test e2e/e2e-login.spec.ts --reporter=custom-reporter.ts
