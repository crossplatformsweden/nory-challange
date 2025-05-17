# Todo List for New Packages (Completed)

## Playwright E2E Testing ✅

1. Create a new package `e2e-tests` in the packages directory ✅
   - Initialize with proper package.json ✅
   - Add playwright dependencies ✅
   - Configure playwright.config.ts ✅

2. Set up minimal test examples ✅
   - Create a simple test for the web app ✅
   - Configure tests to run against the dev server ✅

3. Update root package.json ✅
   - Add e2e test scripts ✅

## Storybook for UI Library ✅

1. Add Storybook to the existing UI package ✅
   - Add storybook dependencies ✅
   - Configure .storybook directory ✅
   - Update UI package.json scripts ✅

2. Create minimal stories ✅
   - Add story examples for existing components ✅
   - Set up proper Tailwind integration ✅

3. Update root package.json ✅
   - Add storybook scripts ✅
   - Configure turbo for new scripts ✅

## Root Package Updates ✅

1. Ensure all scripts are accessible from root ✅
2. Update turbo.json for new tasks ✅

## Next Steps

1. Run `pnpm install` to install the new dependencies
2. Run `pnpm install:playwright` to install Playwright browsers
3. Try the new commands:
   - `pnpm storybook` - Start Storybook
   - `pnpm e2e` - Run E2E tests