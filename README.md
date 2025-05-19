# Nory Challenge Monorepo

[![CI Status - Develop](https://github.com/your-org/your-repo/actions/workflows/develop.yml/badge.svg?branch=develop)](https://github.com/your-org/your-repo/actions/workflows/develop.yml)
[![CI Status - Feature](https://github.com/your-org/your-repo/actions/workflows/feature-branch.yml/badge.svg)](https://github.com/your-org/your-repo/actions/workflows/feature-branch.yml)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![OpenAPI Spec](https://img.shields.io/badge/OpenAPI-Spec-blue.svg?style=flat-square)](https://editor.swagger.io/?url=https://raw.githubusercontent.com/crossplatformsweden/nory-challange/main/utils/salad.yml)

This is a monorepo built with Turborepo, Next.js, and a collection of modern web technologies. It serves as a foundation for an inventory management system, demonstrating best practices in frontend development, API client integration, testing, and CI/CD.

## ✨ Features

- **Monorepo Structure:** Organized with Turborepo for efficient build management and code sharing.
- **Next.js Application:** A `web` application built with Next.js 14+, utilizing the App Router.
- **UI Component Library:** A shared `@repo/ui` package built with React, Tailwind CSS, and Radix UI primitives, documented with Storybook.
- **Type-Safe API Client:** `@nory/api-client` package generated using Orval from an OpenAPI specification (`salad.yml`), providing React Query hooks, MSW mocks, and Zod schemas.
- **Tailwind CSS & DaisyUI:** Centralized Tailwind configuration shared across packages, using DaisyUI for pre-built UI components.
- **TypeScript:** Strong static typing across the entire monorepo.
- **ESLint & Prettier:** Enforced code style and linting for consistent code quality.
- **Husky & lint-staged:** Git hooks to automate formatting, linting, and type checking on staged changes and before pushes.
- **Testing:** Comprehensive testing strategy including:
  - Unit tests with Jest and React Testing Library.
  - End-to-End tests with Playwright.
  - API mocking with Mock Service Worker (MSW) for isolated testing and development.
  - Automated test results visualization in GitHub PRs.
- **Automated Page Generation:** Custom Plop generators and utility scripts for quickly scaffolding new Next.js pages, including boilerplate for components, unit tests, and E2E tests, integrated with API hooks.
- **CI/CD:** GitHub Actions workflows for automated checks (linting, typing, building, testing) on pushes and pull requests.

## 🚀 Technologies

| Technology                    | Description                                                           |
| :---------------------------- | :-------------------------------------------------------------------- |
| **Turborepo**                 | High-performance build system for JavaScript/TypeScript monorepos.    |
| **Next.js**                   | React framework for production-ready web applications (App Router).   |
| **React**                     | JavaScript library for building user interfaces.                      |
| **TypeScript**                | Typed superset of JavaScript that compiles to plain JavaScript.       |
| **Tailwind CSS**              | Utility-first CSS framework.                                          |
| **DaisyUI**                   | Tailwind CSS component library.                                       |
| **pnpm**                      | Fast, disk space efficient package manager.                           |
| **Jest**                      | JavaScript testing framework for unit tests.                          |
| **React Testing Library**     | Library for testing React components.                                 |
| **Playwright**                | Framework for reliable end-to-end testing.                            |
| **Storybook**                 | UI development environment, playground, and documentation tool.       |
| **Husky**                     | Git hooks made easy.                                                  |
| **lint-staged**               | Run linters on git staged files.                                      |
| **Orval**                     | OpenAPI spec to client code generator (React Query hooks, MSW, Zod).  |
| **Mock Service Worker (MSW)** | Seamless API mocking via Service Worker.                              |
| **GitHub Actions**            | Automation workflows for CI/CD.                                       |
| **React Query**               | Hooks for fetching, caching, and updating asynchronous data in React. |
| **Zod**                       | TypeScript-first schema declaration and validation library.           |
| **Radix UI**                  | Low-level UI components for building design systems.                  |
| **Vaul**                      | Drawer component for React.                                           |
| **Recharts**                  | Composable charting library built with React.                         |

## 📚 Project Structure

```

.
├── .github/workflows/ # GitHub Actions workflows for CI/CD
├── .husky/ # Husky Git hooks configuration
├── apps/ # Next.js applications
│ └── web/ # The main Next.js application
│ └── app/ # Next.js App Router pages and API routes
│ └── ... # Application pages and routes
│ └── src/ # Source code, providers, mocks setup
│ └── public/ # Static assets including MSW worker
│ └── playwright/ # Playwright test setup and artifacts
├── packages/ # Shared packages / Libraries
│ ├── api-client/ # Generated API client, hooks, mocks, zod schemas
│ ├── eslint-config/ # Shared ESLint configurations
│ ├── jest-config/ # Shared Jest configurations
│ ├── plop-generators/ # Custom Plop generators for code scaffolding
│ ├── tailwind-config/ # Shared Tailwind CSS configuration and styles
│ └── ui/ # Shared React UI component library
│ └── src/components/ # UI components
│ └── .storybook/ # Storybook configuration
├── utils/ # Scripts and documentation related to development workflow
│ ├── nextjsroutes.md # Documentation on API endpoint to Next.js route mapping
│ ├── routegeneration.sh# Script to automate page generation based on routes
│ └── salad.yml # OpenAPI specification (source for Orval generation)
├── .gitignore # Global git ignore rules
├── .prettierrc # Global Prettier configuration
├── CLAUDE.md # Guidance for the Claude Code AI
├── GIT_FLOW.md # Documentation on the project's Git Flow strategy
├── package.json # Root pnpm workspace and Turborepo configuration
└── turbo.json # Turborepo task configuration

```

## 🚦 Git Workflow

This repository follows the [Git Flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) branching model. Please refer to [./GIT_FLOW.md](./GIT_FLOW.md) for detailed guidelines on branching, merging, and releases.

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18 or later) and [pnpm](https://pnpm.io/) installed.

```bash
# Install pnpm globally if you don't have it
npm install -g pnpm
```

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2.  **Install dependencies:**
    This will install dependencies for all packages and applications and set up Husky hooks.

    ```bash
    pnpm install
    ```

3.  **Generate API Client code:**
    The `api-client` package requires code generation from the OpenAPI spec. This is automatically run before `pnpm build` but you can run it manually:

    ```bash
    pnpm --filter @nory/api-client generate
    ```

4.  **Install Playwright Browsers:**
    Required for running E2E tests.

    ```bash
    pnpm install:playwright
    ```

### Running Locally

To start the development servers for all applications and packages:

```bash
pnpm dev
```

- The `web` application will be available at `http://localhost:3001`.
- Storybook for the `ui` package will be available at `http://localhost:6006`.

You can also run individual apps or packages:

```bash
pnpm --filter web dev       # Start only the web app
pnpm --filter @repo/ui dev  # Start only the ui package (watch mode for build)
pnpm storybook             # Start only Storybook
```

The `web` application is configured to use [Mock Service Worker (MSW)](https://mswjs.io/) in development mode (controlled by `NEXT_PUBLIC_API_MOCKING=enabled` in `apps/web/.env.local`) and testing environments.

## 📦 Available Scripts

These scripts are available from the root of the monorepo using `pnpm <script-name>` or `pnpm turbo run <task-name>`:

| Script                     | Description                                                                   |
| :------------------------- | :---------------------------------------------------------------------------- |
| `pnpm build`               | Builds all applications and packages.                                         |
| `pnpm dev`                 | Starts development servers for all relevant packages.                         |
| `pnpm lint`                | Runs ESLint on all packages.                                                  |
| `pnpm check-types`         | Runs TypeScript type checking on all packages.                                |
| `pnpm format`              | Formats code across the monorepo using Prettier.                              |
| `pnpm test`                | Runs unit tests for all packages.                                             |
| `pnpm test:watch`          | Runs unit tests in watch mode.                                                |
| `pnpm test:coverage`       | Runs unit tests with coverage reports.                                        |
| `pnpm e2e`                 | Runs E2E tests for the `web` app using Playwright.                            |
| `pnpm e2e:ui`              | Opens the Playwright UI for E2E tests.                                        |
| `pnpm storybook`           | Starts Storybook for the `@repo/ui` package.                                  |
| `pnpm build-storybook`     | Builds the Storybook static site for the `@repo/ui` package.                  |
| `pnpm install:playwright`  | Installs Playwright browsers required for E2E tests.                          |
| `pnpm generate:page`       | Interactively generate a new Next.js page with associated test files.         |
| `pnpm generate:page:force` | Same as `generate:page`, but forces overwriting existing files.               |
| `pnpm all`                 | Runs build, type check, lint, and test tasks across the monorepo in parallel. |

## 🧹 Code Quality & Contribution

### Linting and Formatting

ESLint and Prettier are configured to enforce code consistency. Run `pnpm lint` and `pnpm format` regularly.

### Git Hooks

[Husky](https://typicode.github.io/husky/) is used to automate quality checks via Git hooks:

- **`pre-commit`**: Runs `lint-staged` which executes `eslint --fix`, `prettier --write`, and `pnpm test:unit` on staged files. This ensures code is formatted and passes basic checks before committing.
- **`pre-push`**: Runs `pnpm build` and `pnpm test` across the monorepo. This prevents pushing code that fails the build or tests.

Refer to [./.husky/README.md](./.husky/README.md) for more details.

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages. This helps in generating changelogs and understanding the nature of changes.

## 🧪 Testing

### Unit Testing

Unit tests are written using [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/). Test files are located alongside the components/code they test (e.g., `*.test.tsx`).

Run unit tests with `pnpm test:unit`.

### End-to-End Testing

End-to-End tests are written using [Playwright](https://playwright.dev/). E2E test files for the web app are located in the `apps/web/app` directory alongside the pages they test (e.g., `*.e2e.test.tsx`).

Run E2E tests with `pnpm e2e`. You can view the interactive UI with `pnpm e2e:ui`.

Playwright reports and screenshots are uploaded as artifacts in GitHub Actions CI.

### API Mocking (MSW)

[Mock Service Worker (MSW)](https://mswjs.io/) is integrated into the `apps/web` application. It intercepts API calls and provides mock responses based on the generated handlers in `@nory/api-client`. This allows frontend development and testing to proceed independently of the backend API availability. MSW is enabled by default in development and testing environments.

### Test Visualization

The `.github/workflows/test-visualization.yml` workflow automatically downloads test artifacts (Playwright report, screenshots, Jest results) and creates/updates a comment on the corresponding Pull Request with a summary of the test results and links to the artifacts.

## 🔗 API Client

The `@nory/api-client` package provides a type-safe client for interacting with the Nory Inventory API. It is generated using [Orval](https://orval.dev/) based on the OpenAPI specification defined in [`utils/salad.yml`](./utils/salad.yml).

### Orval Generation

Orval generates:

- **React Query Hooks:** Custom hooks (e.g., `useListLocations`, `useGetIngredientById`) for data fetching.
- **MSW Handlers:** Mock service worker handlers based on the API schema for testing and development.
- **Zod Schemas:** Validation schemas for API data structures.
- **Plain Axios Client:** A basic client for direct API calls using a `customInstance.ts`.

Run `pnpm --filter @nory/api-client generate` to regenerate the client code.

### Custom Axios Instance

[`packages/api-client/src/custom-instance.ts`](./packages/api-client/src/custom-instance.ts) provides a custom Axios instance. This is where you would configure base URLs, request/response interceptors (e.g., for authentication, error handling), etc.

## 🎨 UI Library (`@repo/ui`)

The `@repo/ui` package is a shared React component library. It utilizes [Tailwind CSS](https://tailwindcss.com/) for styling, inheriting the shared configuration from `@repo/tailwind-config`. It leverages [Radix UI](https://www.radix-ui.com/primitives) primitives for accessibility and behavior.

Components are documented and showcased in [Storybook](https://storybook.js.org/). Run `pnpm storybook` to view the component library locally.

The build process compiles the shared Tailwind styles into `dist/index.css` and the TypeScript components into JavaScript, allowing them to be consumed by applications. Applications use `transpilePackages` in their `next.config.js` to consume the raw TSX files directly, enabling Tailwind CSS compilation within the application's build process.

Refer to [`packages/ui/COMPONENT_WORKFLOW.md`](./packages/ui/COMPONENT_WORKFLOW.md) for guidelines on developing new UI components.

## 🗺️ Routing & Page Generation

The `web` application uses the [Next.js App Router](https://nextjs.org/docs/app). Pages are organized within the `apps/web/app` directory following the file-system based routing convention. Dynamic routes (e.g., `[locationId]`) are fully supported.

### Automated Page Generation

To streamline the creation of new pages, a custom generator package `@repo/plop-generators` is available. It uses [Plop](https://plopjs.com/) and a direct node script to scaffold new page components along with their corresponding Jest unit tests and Playwright E2E tests, pre-configured with test IDs and basic structure.

Refer to [`packages/plop-generators/readme.md`](./packages/plop-generators/readme.md) for detailed usage instructions.

A helper script `utils/routegeneration.sh` is provided to generate multiple pages based on definitions in [`utils/nextjsroutes.md`](./utils/nextjsroutes.md). This script maps the API routes and associated hooks defined in `nextjsroutes.md` to the corresponding Next.js App Router paths and calls the generator script for each.

Run the generation script with:

```bash
./utils/routegeneration.sh
```

### API Route to Frontend Mapping

[`utils/nextjsroutes.md`](./utils/nextjsroutes.md) contains documentation outlining the mapping between the API endpoints defined in `salad.yml` and the planned Next.js App Router paths. It also notes the relevant Orval-generated Tanstack Query hooks (`use...`) intended for data fetching on each page and lists potential query parameters.

## 🤖 CI/CD Pipeline

The repository is configured with GitHub Actions to automate checks:

- [`develop.yml`](./.github/workflows/develop.yml): Triggers on pushes to `develop`. Runs linting, type checking, building, unit tests, E2E tests, and builds Storybook.
- [`feature-branch.yml`](./.github/workflows/feature-branch.yml): Triggers on pushes to `feature/*` and `improvement/*` branches, and on pull requests targeting `develop`. Runs linting, type checking, building, and unit/E2E tests. Uploads test artifacts.
- [`test-visualization.yml`](./.github/workflows/test-visualization.yml): Triggers on completion of `feature-branch.yml` workflow. Downloads test artifacts and posts a summary comment to the relevant Pull Request.

Branch protection rules are configured on `main`, `develop`, and `release/*` to require passing CI checks and PR reviews before merging.

## ☁️ Deployment

This monorepo is well-suited for deployment on platforms like [Vercel](https://vercel.com), which has native support for Next.js and Turborepo. Refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment) and [Vercel's documentation](https://vercel.com/docs/concepts/monorepos/turborepo) for more details.

## ❓ Troubleshooting

- If you encounter issues with `pnpm install`, try running `pnpm clean` in the root and then `pnpm install` again.
- For Jest or Playwright test failures, check the detailed output and uploaded artifacts in the GitHub Actions run.
- If generated code seems outdated, run `pnpm --filter @nory/api-client generate`.
- Ensure your Node.js version meets the engine requirements specified in the root `package.json`.
- If encountering file permission issues during generation, verify the `ROOT_PATH` in `utils/routegeneration.sh` is correct and you have write access.

```

```
