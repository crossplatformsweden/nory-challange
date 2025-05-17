# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a Turborepo monorepo with the following structure:

- **apps/web** - Next.js application with Tailwind CSS
- **packages/ui** - React component library with Tailwind CSS shared by applications
- **packages/eslint-config** - ESLint configurations
- **packages/typescript-config** - TypeScript configurations
- **packages/tailwind-config** - Tailwind CSS configuration and shared styles
- **packages/e2e-tests** - Playwright E2E testing setup for the web app
- **packages/ui/.storybook** - Storybook configuration for the UI components

## Common Commands

### Development

Start the development server:

```bash
# Start all packages in development mode
pnpm dev

# Start just the web app
pnpm --filter web dev

# Start Storybook for UI components
pnpm storybook
```

The web app will be available at http://localhost:3001.
Storybook will be available at http://localhost:6006.

### Build

Build all packages and applications:

```bash
pnpm build

# Build specific app/package
pnpm --filter web build
pnpm --filter @repo/ui build

# Build Storybook
pnpm build-storybook
```

### Testing

Run E2E tests:

```bash
# Install Playwright browsers (first time only)
pnpm install:playwright

# Run E2E tests
pnpm e2e

# Run E2E tests with UI
pnpm e2e:ui
```

### Linting

Run ESLint on all packages:

```bash
pnpm lint

# Lint specific app/package
pnpm --filter web lint
pnpm --filter @repo/ui lint
```

### Type Checking

Run TypeScript type checking:

```bash
pnpm check-types

# Type check specific app/package
pnpm --filter web check-types
pnpm --filter @repo/ui check-types
```

### Formatting

Format all code with Prettier:

```bash
pnpm format
```

## Git Flow

This repository follows the Git Flow branching model. See [GIT_FLOW.md](./GIT_FLOW.md) for detailed workflow instructions.

### Branch Structure

- **`main` / `master`**: Production-ready code
- **`develop`**: Integration branch for feature development
- **`feature/*`**: New features
- **`improvement/*`**: Improvements to existing features
- **`release/*`**: Release preparation
- **`hotfix/*`**: Emergency production fixes

### Creating a New Feature

```bash
# Start from develop branch
git checkout develop

# Create and switch to a new feature branch
git checkout -b feature/your-feature-name

# After making changes, push to remote
git push -u origin feature/your-feature-name

# Create a PR to merge back to develop
```

## CI/CD Pipeline

This repository uses GitHub Actions for CI/CD:

- Feature branches: Validate and test
- Develop branch: Validate, test, and build Storybook
- Release branches: Validate, test, and build Storybook
- Main branch: Validate, test, and deploy
- Hotfix branches: Validate and test

## Git Hooks

This repository uses Husky and lint-staged to enforce code quality:

- **pre-commit**: Automatically runs linting, type checking, and formatting on staged files
- **pre-push**: Runs a full build to ensure everything compiles before pushing to remote

The hooks are automatically set up when running `pnpm install` due to the prepare script.

## Architecture

This Turborepo uses:

- [Next.js](https://nextjs.org/) for the web application
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [pnpm](https://pnpm.io/) for package management
- [Playwright](https://playwright.dev/) for end-to-end testing
- [Storybook](https://storybook.js.org/) for UI component development and documentation
- [Husky](https://typicode.github.io/husky/) for Git hooks
- [lint-staged](https://github.com/lint-staged/lint-staged) for running linters on staged files
- [GitHub Actions](https://github.com/features/actions) for CI/CD

The UI components package (`@repo/ui`) is configured to be consumed directly by Next.js applications. The component `.tsx` files are consumed directly using `transpilePackages` in `next.config.ts`.

The repository appears to be a starting point for building an inventory management system with specific requirements around inventory tracking, sales, waste management, and reporting. The README outlines detailed backend logic for inventory movements, sales processing, and report generation.
