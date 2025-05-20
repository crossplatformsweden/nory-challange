const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../src/components');

// Get all TSX files in the components directory
const files = fs
  .readdirSync(componentsDir)
  .filter((file) => file.endsWith('.tsx'));

// Process each file
files.forEach((file) => {
  const componentName = path.basename(file, '.tsx');
  const componentDir = path.join(componentsDir, componentName);

  // Create directory if it doesn't exist
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir);
  }

  // Move file to new directory and rename to index.tsx
  const oldPath = path.join(componentsDir, file);
  const newPath = path.join(componentDir, 'index.tsx');

  fs.renameSync(oldPath, newPath);
});
