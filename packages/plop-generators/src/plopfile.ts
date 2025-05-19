import { NodePlopAPI } from 'plop';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function (plop: NodePlopAPI) {
  console.log('\n🚀 Starting Plop Generator for Next.js pages');
  
  // Helper to create directories recursively if they don't exist
  const ensureDirectoryExists = async (dirPath: string) => {
    // Use bash to create the directory to handle square brackets in paths
    try {
      console.log(`\n📁 Creating directory: ${dirPath}`);
      await execAsync(`mkdir -p "${dirPath}"`);
      console.log(`✅ Directory created: ${dirPath}`);
      return true;
    } catch (error) {
      console.error(`❌ Error creating directory: ${dirPath}`, error);
      return false;
    }
  };

  // Check if a file exists
  const checkFileExists = (filePath: string) => {
    try {
      return fs.existsSync(filePath);
    } catch (error) {
      console.error(`❌ Error checking if file exists: ${filePath}`, error);
      return false;
    }
  };

  plop.setActionType('createDirectory', async (answers, config) => {
    const dirPath = config.path;
    if (!dirPath) {
      throw new Error('Path is required for createDirectory action');
    }
    
    console.log(`\n🔍 Creating directory structure for: ${dirPath}`);
    const success = await ensureDirectoryExists(dirPath);
    return success ? '✅ Directory created successfully' : '❌ Failed to create directory';
  });

  plop.setGenerator('next-page', {
    description: 'Generate a new NextJS page with tests',
    prompts: [
      {
        type: 'input',
        name: 'rootPath',
        message: 'Enter the absolute path to the Next.js app (e.g., /Users/xemil/Source/nory-challange/apps/web):',
        validate: (input: string) => {
          if (!input) return 'Root path is required';
          
          // Check if the directory exists
          if (!fs.existsSync(input)) {
            return `Directory does not exist: ${input}`;
          }
          
          // Check if it's a Next.js app directory (look for app folder)
          const appDir = path.join(input, 'app');
          if (!fs.existsSync(appDir)) {
            return `No 'app' directory found in ${input}. Is this a Next.js app?`;
          }
          
          return true;
        },
      },
      {
        type: 'input',
        name: 'path',
        message: 'Enter the page path (e.g., locations/[locationId]/staff):',
        validate: (input: string) => {
          if (!input) return 'Path is required';
          if (input.startsWith('/')) return 'Path should not start with /';
          if (input.endsWith('/')) return 'Path should not end with /';
          return true;
        },
      },
      {
        type: 'input',
        name: 'name',
        message: 'Enter the page name:',
        validate: (input: string) => {
          if (!input) return 'Name is required';
          return true;
        },
      },
      {
        type: 'input',
        name: 'urlPath',
        message: 'Enter the URL path for E2E tests (e.g., locations/123/staff):',
        validate: (input: string) => {
          if (!input) return 'URL path is required';
          if (input.startsWith('/')) return 'URL path should not start with /';
          if (input.endsWith('/')) return 'URL path should not end with /';
          return true;
        },
      },
    ],
    actions: (data = {}) => {
      const rootPath = data.rootPath as string || '';
      const pagePath = data.path as string;
      const name = data.name as string;
      const urlPath = data.urlPath as string;
      
      console.log('\n📋 Generating page with the following parameters:');
      console.log(`   Root path: ${rootPath}`);
      console.log(`   Page path: ${pagePath}`);
      console.log(`   Page name: ${name}`);
      console.log(`   URL path for tests: ${urlPath}`);
      
      if (!rootPath) {
        throw new Error('❌ Root path is required');
      }
      
      if (!pagePath) {
        throw new Error('❌ Path is required');
      }
      
      if (pagePath.startsWith('/')) {
        throw new Error('❌ Path should not start with /');
      }
      
      if (pagePath.endsWith('/')) {
        throw new Error('❌ Path should not end with /');
      }
      
      // Validate all inputs a second time, for CLI usage
      if (!fs.existsSync(rootPath)) {
        throw new Error(`❌ Root directory does not exist: ${rootPath}`);
      }
      
      // Validate app directory exists
      const webAppPath = path.join(rootPath, 'app');
      if (!fs.existsSync(webAppPath)) {
        throw new Error(`❌ App directory not found: ${webAppPath}. Is this a Next.js app?`);
      }
      
      // Validate template files exist
      const pageTemplate = path.join(__dirname, 'plop-templates/page.hbs');
      const testTemplate = path.join(__dirname, 'plop-templates/page.test.hbs');
      const e2eTestTemplate = path.join(__dirname, 'plop-templates/page.e2e.test.hbs');
      
      if (!fs.existsSync(pageTemplate)) {
        throw new Error(`❌ Template file not found: ${pageTemplate}`);
      }
      
      if (!fs.existsSync(testTemplate)) {
        throw new Error(`❌ Template file not found: ${testTemplate}`);
      }
      
      if (!fs.existsSync(e2eTestTemplate)) {
        throw new Error(`❌ Template file not found: ${e2eTestTemplate}`);
      }
      
      // Create the target path
      const targetPath = path.join(webAppPath, pagePath);
      
      console.log('\n📂 Directory information:');
      console.log(`   Web app directory: ${webAppPath} (✅ exists)`);
      console.log(`   Target directory: ${targetPath} (${fs.existsSync(targetPath) ? '⚠️ already exists' : '🆕 will be created'})`);
      console.log(`   Page template: ${path.join(__dirname, 'plop-templates/page.hbs')} (✅ exists)`);
      console.log(`   Test template: ${path.join(__dirname, 'plop-templates/page.test.hbs')} (✅ exists)`);
      console.log(`   E2E test template: ${path.join(__dirname, 'plop-templates/page.e2e.test.hbs')} (✅ exists)`);
      
      const actions = [
        // Create the directory first using our custom action
        {
          type: 'createDirectory',
          path: targetPath,
        },
        // Then add the files
        {
          type: 'add',
          path: path.join(targetPath, 'page.tsx'),
          templateFile: path.join(__dirname, 'plop-templates/page.hbs'),
          force: true,
          transform: (template: string) => {
            console.log(`🔧 Generating page.tsx in ${path.join(targetPath, 'page.tsx')}`);
            return template;
          }
        },
        {
          type: 'add',
          path: path.join(targetPath, 'page.test.tsx'),
          templateFile: path.join(__dirname, 'plop-templates/page.test.hbs'),
          force: true,
          transform: (template: string) => {
            console.log(`🔧 Generating page.test.tsx in ${path.join(targetPath, 'page.test.tsx')}`);
            return template;
          }
        },
        {
          type: 'add',
          path: path.join(targetPath, 'page.e2e.test.tsx'),
          templateFile: path.join(__dirname, 'plop-templates/page.e2e.test.hbs'),
          data: {
            urlPath: data.urlPath,
          },
          force: true,
          transform: (template: string) => {
            console.log(`🔧 Generating page.e2e.test.tsx in ${path.join(targetPath, 'page.e2e.test.tsx')}`);
            return template;
          }
        },
        // Add a shell command to verify files were created
        {
          type: 'appendAction',
          description: 'Verifying files were created',
          // @ts-ignore - this is a custom action
          actionFn: () => {
            const pageFile = path.join(targetPath, 'page.tsx');
            const testFile = path.join(targetPath, 'page.test.tsx');
            const e2eTestFile = path.join(targetPath, 'page.e2e.test.tsx');
            
            const pageExists = checkFileExists(pageFile);
            const testExists = checkFileExists(testFile);
            const e2eTestExists = checkFileExists(e2eTestFile);
            
            console.log('\n✅ File generation summary:');
            console.log(`   📄 ${pageFile} (${pageExists ? '✅ created' : '❌ failed'})`);
            console.log(`   🧪 ${testFile} (${testExists ? '✅ created' : '❌ failed'})`);
            console.log(`   🧪 ${e2eTestFile} (${e2eTestExists ? '✅ created' : '❌ failed'})`);
            
            if (!pageExists || !testExists || !e2eTestExists) {
              console.log('\n⚠️ Warning: Some files failed to generate. Check the paths and permissions.');  
              return `\n⚠️ Generation partially complete! Some files may not have been created in: ${targetPath}`;
            }
            
            return `\n✨ Generation complete! All files created successfully in: ${targetPath}`;
          }
        }
      ];
      
      return actions;
    },
  });
  
  // Custom action to just run a function at the end
  plop.setActionType('appendAction', (answers, config) => {
    if (config.description) {
      console.log(`\n${config.description}`);
    }
    if (typeof config.actionFn === 'function') {
      return config.actionFn();
    }
    return 'appendAction complete';
  });
}