#!/usr/bin/env node
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * A simplified direct generator that doesn't rely on plop.js
 * This makes debugging and output easier to track.
 */
async function generateNextPage() {
  console.log('\n🚀 Starting Direct Generator for Next.js pages');

  // Parse command line arguments
  const args = process.argv.slice(2);
  const params = {};

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i]?.replace(/^--/, '') ?? '';
    const value = args[i + 1];
    if (value) {
      // Only add if value exists
      params[key] = value;
    }
  }

  console.log('\n📋 Parameters:');
  console.log(params);

  // Validate required params
  const requiredParams = ['rootPath', 'path', 'name', 'urlPath', 'hookName'];
  const missingParams = requiredParams.filter((param) => !params[param]);

  if (missingParams.length > 0) {
    console.error(
      `❌ Error: Missing required parameters: ${missingParams.join(', ')}`
    );
    process.exit(1);
  }

  // After validation, we can safely assert these are strings
  const rootPath = params.rootPath;
  const pagePath = params.path;
  const name = params.name;
  const urlPath = params.urlPath;
  const hookName = params.hookName;

  console.log('\n📋 Generating page with the following parameters:');
  console.log(`   Root path: ${rootPath}`);
  console.log(`   Page path: ${pagePath}`);
  console.log(`   Page name: ${name}`);
  console.log(`   URL path for tests: ${urlPath}`);
  console.log(`   Hook name: ${hookName}`);

  // Validate that rootPath exists and is a Next.js app
  if (!fs.existsSync(rootPath)) {
    console.error(`❌ Error: Root directory does not exist: ${rootPath}`);
    process.exit(1);
  }

  const appDir = path.join(rootPath, 'app');
  if (!fs.existsSync(appDir)) {
    console.error(
      `❌ Error: No 'app' directory found in ${rootPath}. Is this a Next.js app?`
    );
    process.exit(1);
  }

  // Validate page path format
  if (pagePath.startsWith('/')) {
    console.error('❌ Error: Page path should not start with /');
    process.exit(1);
  }

  if (pagePath.endsWith('/')) {
    console.error('❌ Error: Page path should not end with /');
    process.exit(1);
  }

  // Validate template files exist
  const templateDir = path.join(__dirname, '../src/plop-templates');
  const pageTemplate = path.join(templateDir, 'page.hbs');
  const testTemplate = path.join(templateDir, 'page.test.hbs');
  const e2eTestTemplate = path.join(templateDir, 'page.e2e.test.hbs');

  console.log('\n📂 Template information:');
  console.log(`   Template directory: ${templateDir}`);
  console.log(`   Page template: ${pageTemplate}`);

  if (!fs.existsSync(pageTemplate)) {
    console.error(`❌ Error: Template file not found: ${pageTemplate}`);
    process.exit(1);
  }

  if (!fs.existsSync(testTemplate)) {
    console.error(`❌ Error: Template file not found: ${testTemplate}`);
    process.exit(1);
  }

  if (!fs.existsSync(e2eTestTemplate)) {
    console.error(`❌ Error: Template file not found: ${e2eTestTemplate}`);
    process.exit(1);
  }

  // Create target directory
  const targetPath = path.join(appDir, pagePath);
  console.log('\n📂 Directory information:');
  console.log(`   Web app directory: ${appDir} (✅ exists)`);
  console.log(
    `   Target directory: ${targetPath} (${fs.existsSync(targetPath) ? '⚠️ already exists' : '🆕 will be created'})`
  );

  try {
    console.log(`\n📁 Creating directory: ${targetPath}`);
    await execAsync(`mkdir -p "${targetPath}"`);
    console.log(`✅ Directory created: ${targetPath}`);
  } catch (error) {
    console.error(`❌ Error creating directory: ${targetPath}`, error);
    process.exit(1);
  }

  // Read template files
  let pageContent;
  let testContent;
  let e2eTestContent;

  try {
    pageContent = fs.readFileSync(pageTemplate, 'utf-8');
    testContent = fs.readFileSync(testTemplate, 'utf-8');
    e2eTestContent = fs.readFileSync(e2eTestTemplate, 'utf-8');
  } catch (error) {
    console.error('❌ Error reading template files:', error);
    process.exit(1);
  }

  // Helper function to convert to different case formats
  const pascalCase = (str) => {
    // Remove 'Page' suffix if it exists to avoid duplication
    const baseName = str.endsWith('Page') ? str.slice(0, -4) : str;
    return baseName
      .replace(/(?:^|\s)(.)/g, (_, $1) => $1.toUpperCase())
      .replace(/\s+/g, '');
  };

  const kebabCase = (str) => {
    // Remove 'Page' suffix if it exists to avoid duplication
    const baseName = str.endsWith('Page') ? str.slice(0, -4) : str;
    return baseName
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/\s+/g, '-')
      .toLowerCase();
  };

  // Simple template replacement (this is a basic version of what handlebars does)
  pageContent = pageContent
    .replace(/{{name}}/g, name)
    .replace(/{{pascalCase name}}/g, pascalCase(name))
    .replace(/{{kebabCase name}}/g, kebabCase(name))
    .replace(/{{hookname}}/g, hookName)
    .replace(/{{hookName}}/g, hookName);
  testContent = testContent
    .replace(/{{name}}/g, name)
    .replace(/{{pascalCase name}}/g, pascalCase(name))
    .replace(/{{kebabCase name}}/g, kebabCase(name))
    .replace(/{{hookname}}/g, hookName)
    .replace(/{{hookName}}/g, hookName);
  e2eTestContent = e2eTestContent
    .replace(/{{name}}/g, name)
    .replace(/{{pascalCase name}}/g, pascalCase(name))
    .replace(/{{kebabCase name}}/g, kebabCase(name))
    .replace(/{{urlPath}}/g, urlPath)
    .replace(/{{hookname}}/g, hookName)
    .replace(/{{hookName}}/g, hookName);

  // Write files
  const pageFile = path.join(targetPath, 'page.tsx');
  const testFile = path.join(targetPath, 'page.test.tsx');
  const e2eTestFile = path.join(targetPath, 'page.e2e.test.tsx');

  let pageSuccess = false;
  let testSuccess = false;
  let e2eTestSuccess = false;

  try {
    console.log(`\n🔧 Writing page.tsx to ${pageFile}`);
    fs.writeFileSync(pageFile, pageContent);
    pageSuccess = true;
  } catch (error) {
    console.error(`❌ Error writing file: ${pageFile}`, error);
  }

  try {
    console.log(`🔧 Writing page.test.tsx to ${testFile}`);
    fs.writeFileSync(testFile, testContent);
    testSuccess = true;
  } catch (error) {
    console.error(`❌ Error writing file: ${testFile}`, error);
  }

  try {
    console.log(`🔧 Writing page.e2e.test.tsx to ${e2eTestFile}`);
    fs.writeFileSync(e2eTestFile, e2eTestContent);
    e2eTestSuccess = true;
  } catch (error) {
    console.error(`❌ Error writing file: ${e2eTestFile}`, error);
  }

  // Summary
  console.log('\n✅ File generation summary:');
  console.log(
    `   📄 ${pageFile} (${pageSuccess ? '✅ created' : '❌ failed'})`
  );
  console.log(
    `   🧪 ${testFile} (${testSuccess ? '✅ created' : '❌ failed'})`
  );
  console.log(
    `   🧪 ${e2eTestFile} (${e2eTestSuccess ? '✅ created' : '❌ failed'})`
  );

  if (!pageSuccess || !testSuccess || !e2eTestSuccess) {
    console.log(
      '\n⚠️ Warning: Some files failed to generate. Check the paths and permissions.'
    );
    console.log(
      `\n⚠️ Generation partially complete! Some files may not have been created in: ${targetPath}`
    );
    process.exit(1);
  }

  console.log(
    `\n✨ Generation complete! All files created successfully in: ${targetPath}`
  );
}

// Run the generator
generateNextPage().catch((error) => {
  console.error('❌ Unhandled error:', error);
  process.exit(1);
});
