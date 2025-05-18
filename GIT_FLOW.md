# Git Flow Guide

This repository follows the Git Flow branching model. This document outlines the branch structure and workflow.

## 🌿 Branch Structure

- **`main` / `master`**: Production-ready code
- **`develop`**: Integration branch for feature development
- **`feature/*`**: New features
- **`improvement/*`**: Improvements to existing features
- **`release/*`**: Release preparation
- **`hotfix/*`**: Emergency production fixes

## 🚀 Workflow

### Feature Development

1. 🌱 Create a feature branch from `develop`:

   ```bash
   git checkout develop
   git checkout -b feature/your-feature-name
   ```

2. ✅ Work on your feature, commit changes with meaningful messages:

   ```bash
   git add .
   git commit -m "feat: your meaningful message"
   ```

3. 🔄 Regularly push your branch and keep it updated with `develop`:

   ```bash
   git push -u origin feature/your-feature-name
   git pull origin develop
   ```

4. 🔍 Create a Pull Request to merge your feature into `develop`

### Release Process

1. 🚢 Create a release branch from `develop`:

   ```bash
   git checkout develop
   git checkout -b release/1.0.0
   ```

2. 🐛 Make only bug fixes, documentation, and minor improvements

   ```bash
   git add .
   git commit -m "fix: your bug fix"
   ```

3. 📝 Update version numbers and metadata

4. ✅ Create Pull Requests to merge into:
   - `main` / `master`
   - `develop`

### Hotfixes

1. 🔥 Create a hotfix branch from `main` / `master`:

   ```bash
   git checkout main
   git checkout -b hotfix/critical-fix
   ```

2. 🔧 Fix the critical issue

   ```bash
   git add .
   git commit -m "fix: your critical fix"
   ```

3. ✅ Create Pull Requests to merge into:
   - `main` / `master`
   - `develop`

## 📋 Commit Message Convention

This repository follows [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code changes that neither fix bugs nor add features
- **perf**: Performance improvements
- **test**: Adding or fixing tests
- **chore**: Changes to the build process or auxiliary tools

## 🔄 CI/CD Pipeline

Our GitHub Actions workflow automatically runs for each branch:

- 🔍 **Validate**: Linting, type checking, and building
- 🧪 **Test**: Running E2E tests
- 📚 **Storybook**: Building Storybook (for develop and release branches)
- 🚀 **Deploy**: Deployment steps (for main branch)

## 📊 Branch Protection Rules

- **`main` / `master`**: Requires PR approvals and passing CI
- **`develop`**: Requires PR approvals and passing CI
- **`release/*`**: Requires PR approvals and passing CI
