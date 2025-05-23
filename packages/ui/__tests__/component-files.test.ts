/// <reference types="jest" />
import * as fs from 'fs';
import * as path from 'path';

import { describe, it, expect } from '@jest/globals';

const getAllComponentFilesRecursively = (dir: string): string[] => {
  let files: string[] = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files = files.concat(getAllComponentFilesRecursively(fullPath));
    } else if (item.isFile()) {
      if (
        fullPath.endsWith('.tsx') &&
        !fullPath.endsWith('.test.tsx') &&
        !fullPath.endsWith('.stories.tsx')
      ) {
        files.push(fullPath);
      }
    }
  }
  return files;
};

describe('Check for component test and story files in packages/ui', () => {
  const componentsDir = path.join(__dirname, '../src/components');
  const componentFiles = getAllComponentFilesRecursively(componentsDir);

  it('should find component files', () => {
    expect(componentFiles.length).toBeGreaterThan(0);
  });

  componentFiles.forEach((file) => {
    const relativePath = path.relative(process.cwd(), file);
    const testFilePath = file.replace(/\.tsx$/, '.test.tsx');
    const storyFilePath = file.replace(/\.tsx$/, '.stories.tsx');

    it(`should have a test file for ${relativePath}`, () => {
      expect(fs.existsSync(testFilePath)).toBe(true);
    });

    it(`should have a story file for ${relativePath}`, () => {
      expect(fs.existsSync(storyFilePath)).toBe(true);
    });

    it(`test file ${relativePath} should have at least 50 lines`, () => {
      const content = fs.readFileSync(testFilePath, 'utf-8');
      const lineCount = content.split(/\r?\n/).length;
      expect(lineCount).toBeGreaterThanOrEqual(50);
    });

    it(`story file ${relativePath} should have at least 50 lines`, () => {
      const content = fs.readFileSync(storyFilePath, 'utf-8');
      const lineCount = content.split(/\r?\n/).length;
      expect(lineCount).toBeGreaterThanOrEqual(50);
    });
  });
});
