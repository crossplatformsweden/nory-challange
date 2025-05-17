module.exports = {
  // Lint and format TypeScript and JavaScript files
  "**/*.{ts,tsx,js,jsx}": (files) => {
    // Get unique list of directories from changed files
    const directories = [...new Set(
      files.map(file => {
        // Extract the package directory (apps/web, packages/ui, etc.)
        const match = file.match(/^(apps\/[^/]+|packages\/[^/]+)/);
        return match ? match[0] : '';
      }).filter(Boolean)
    )];

    // Create commands for each affected directory
    const lintCommands = directories.map(dir => `pnpm --filter ./${dir} lint --fix`);
    const typeCheckCommands = directories.map(dir => `pnpm --filter ./${dir} check-types`);
    
    // Add root level checks if needed
    if (files.some(file => !file.startsWith('apps/') && !file.startsWith('packages/'))) {
      lintCommands.push('pnpm lint');
      typeCheckCommands.push('pnpm check-types');
    }
    
    return [...lintCommands, ...typeCheckCommands];
  },
  // Format JSON, CSS, MD, etc.
  "**/*.{json,css,md}": ["prettier --write"],
};