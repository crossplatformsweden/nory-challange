Write a unit test confirming all files under

Write file path to test:

have a corresponding test file.

1. with .ts

2. with .test.ts

total 1 test per file.

put it in backend folder.

make sure its green.

# TODO: Service Test Coverage

Below is a table of service files and whether they have corresponding test files:

Examine existing tests before writing a new test! Always source the file to test in context.

Verify end of file for latest test result. build-test-result.txt

All required tests are present and passing. ✅

Make sure all files are commited and pushed.

---

## Backend Build/Test/Lint/E2E Progress Log

### Plan

TODO: Change command to ui package. update commands list IMPORTANT!

1. Validate lint for backend: `pnpm lint --filter=./apps/backend`
2. Validate build for backend: `pnpm build --filter=./apps/backend`
3. Validate type checks for backend: `pnpm check-types --filter=./apps/backend`
4. Validate unit tests for backend: `pnpm test:unit --filter=./apps/backend`
5. Validate e2e tests for backend: `pnpm test:e2e --filter=./apps/backend`
6. Ensure all backend Services and Controllers have tests.
7. Validate all test ids in e2e tests (no navigation, use data-testid, 1.5s timeouts).
8. If all green, commit and push all changes.

### Progress

#### Next steps:
