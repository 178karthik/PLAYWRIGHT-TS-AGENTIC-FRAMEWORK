# 1. Generate Test Plan
"Open browser and generate testplan for {spec-file.md} for {specific-scenario}"

# 2. Generate Test Script
"Open browser and generate playwright script as per {spec-file.md}, use {reference-test.spec.ts} for reference and don't use nth locator and don't hardcode anything, put the reusable methods and locators in fixtures and reuse locators and methods if it's already present"

# 3. Debug Failing Test
"Open browser and fix this testcase: {test-file.spec.ts}"(Copy the prompt from Playwright Report)

# 4. Make Production Ready
"Put the reusable methods and locators in fixtures and reuse locators and methods if it's already present, make it production ready: {test-file.spec.ts}"