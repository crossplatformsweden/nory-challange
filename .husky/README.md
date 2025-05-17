# Git Hooks

This directory contains Git hooks managed by [Husky](https://typicode.github.io/husky/).

## Available Hooks

### pre-commit

The pre-commit hook runs before each commit and performs the following tasks:

- Lints the staged files with ESLint (with autofix when possible)
- Type-checks the staged files with TypeScript
- Formats the staged files with Prettier

This hook uses lint-staged to only run these checks on the files that are being committed.

### pre-push

The pre-push hook runs before pushing to the remote repository and performs the following tasks:

- Runs a full build of the entire monorepo to ensure everything compiles

## Bypassing Hooks

In rare cases, you may need to bypass these hooks. You can do so with:

```bash
# Bypass pre-commit hook
git commit --no-verify

# Bypass pre-push hook
git push --no-verify
```

However, please use these sparingly and only when absolutely necessary.
