# GitHub Actions Workflows

This directory contains GitHub Actions workflows used for continuous integration and deployment of the Nory Inventory Management system.

## Backend TypeScript Workflows

### Backend Build & Verify (`backend-build.yml`)

This workflow builds and verifies the TypeScript backend code.

**Triggers:**

- Push to `main`, `develop`, or any `feature/*` branch (only when backend files change)
- Pull requests to `main` or `develop` (only when backend files change)
- Manual trigger (workflow_dispatch)

**Jobs:**

1. **build-and-verify**: Builds the TypeScript backend and verifies the output

   - Lints the code with ESLint
   - Type checks with TypeScript
   - Builds the backend code
   - Verifies essential files exist in the build output
   - Runs tests (if available)
   - Uploads build artifacts

2. **api-schema-validation**: Validates the OpenAPI schema
   - Checks that `openapi.yaml` conforms to the OpenAPI specification

### Backend Health Check (`backend-healthcheck.yml`)

This workflow performs regular health checks on the backend API.

**Triggers:**

- Daily at midnight UTC
- Manual trigger (workflow_dispatch)

**Jobs:**

- **health-check**: Starts the backend server and checks various endpoints
  - Builds and starts the backend server
  - Verifies API documentation is accessible
  - Checks OpenAPI spec availability
  - Tests basic API endpoints
  - Reports any failures

### Backend-Frontend Integration (`backend-integration.yml`)

This workflow tests the integration between the backend and frontend.

**Triggers:**

- Push to `main` or `develop` (only when backend or frontend files change)
- Pull requests to `main` or `develop` (only when backend or frontend files change)
- Manual trigger (workflow_dispatch)

**Jobs:**

- **integration-test**: Tests backend integration with frontend
  - Builds all required packages in the correct order
  - Starts the backend server
  - Configures the web app to use the real backend (no mocks)
  - Runs End-to-End tests with Playwright
  - Uploads test results and reports

## Usage

These workflows run automatically based on their triggers, but you can also run them manually:

1. Go to the "Actions" tab in the GitHub repository
2. Select the workflow you want to run
3. Click "Run workflow" button
4. Choose the branch to run the workflow on
5. Click "Run workflow" to start

## Troubleshooting

If a workflow fails, check the following:

1. **Build failures**: Check for TypeScript errors, ESLint warnings, or dependency issues
2. **Test failures**: Examine the Playwright reports for detailed error information
3. **Health check failures**: Verify the API endpoints are working as expected
4. **Integration failures**: Check both backend logs and frontend test outputs

## Additional Notes

- All workflows use caching to speed up builds
- Artifacts are retained for 7 days
- The backend server is always properly shut down at the end of workflows
- Environment variables are configured to disable API mocking during integration tests
