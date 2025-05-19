# Next.js Page Generator

This package provides tools to generate Next.js pages with corresponding test files.

## Direct Generator (Recommended)

For the most reliable experience, use our direct generator script:

```bash
# From the root of the project
pnpm --filter @repo/plop-generators generate:direct --rootPath "/path/to/apps/web" --path "locations/[locationId]/staff" --name "StaffPage" --urlPath "locations/123/staff"

# Or from the plop-generators package directory
cd packages/plop-generators
pnpm generate:direct --rootPath "/path/to/apps/web" --path "locations/[locationId]/staff" --name "StaffPage" --urlPath "locations/123/staff"
```

### Parameters

- `--rootPath`: Absolute path to the Next.js app (required)
- `--path`: Page path within the app directory (required)
- `--name`: Component name for the page (required)
- `--urlPath`: URL path for E2E tests (required)

### Example

```bash
pnpm --filter @repo/plop-generators generate:direct --rootPath "/Users/xemil/Source/nory-challange/apps/web" --path "locations/[locationId]/staff" --name "StaffPage" --urlPath "locations/123/staff"
```

This will generate:

- `apps/web/app/locations/[locationId]/staff/page.tsx` - The Next.js page
- `apps/web/app/locations/[locationId]/staff/page.test.tsx` - Jest unit tests
- `apps/web/app/locations/[locationId]/staff/page.e2e.test.tsx` - Playwright E2E tests

## Plop Generator (Alternative)

You can also use the interactive plop generator, which will prompt for the necessary parameters:

```bash
# From the root of the project
pnpm generate:page

# Or directly from the plop-generators package
cd packages/plop-generators
pnpm plop next-page
```

When generating a page interactively, you'll be prompted for:

- **The root path** (e.g., `/Users/xemil/Source/nory-challange/apps/web`)
- **The page path** (e.g., `locations/[locationId]/staff`)
- **The page name** (e.g., `StaffPage`)
- **The URL path for E2E tests** (e.g., `locations/123/staff`)

### Forcing file overwrite

If you need to overwrite existing files, add the `--force` flag when using plop:

```bash
pnpm generate:page:force
```

## Working with dynamic routes

Routes with parameters in square brackets (like `[locationId]`) are fully supported:

```bash
# Example with dynamic route parameter
pnpm --filter @repo/plop-generators generate:direct --rootPath "/Users/xemil/Source/nory-challange/apps/web" --path "locations/[locationId]/staff" --name "StaffPage" --urlPath "locations/123/staff"
```

## Troubleshooting

If you encounter any issues:

1. Make sure all paths are correct and the Next.js app directory exists
2. Verify that the `app` directory exists in your Next.js root path
3. Use the direct generator for more detailed error messages
4. Check that you have write permissions to the target directory

## Adding new generators

To add a new generator:

1. Add your template files in `src/plop-templates/`
2. Update the `src/plopfile.ts` file or create a new direct generator script
