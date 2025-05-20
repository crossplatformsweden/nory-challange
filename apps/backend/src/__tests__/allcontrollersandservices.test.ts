// TODO using fs or similar or other library, important recursively!. Make sure there is corresponding test files for each ts file.

import fs from 'fs';
import path from 'path';

function getAllTsFilesRecursively(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach((file: string) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllTsFilesRecursively(filePath));
    } else if (file.endsWith('.ts') && !file.endsWith('.test.ts')) {
      results.push(filePath);
    }
  });
  return results;
}

describe('All controllers and services have corresponding test files (recursive)', () => {
  const baseDirs = [
    path.join(__dirname, '../controllers'),
    path.join(__dirname, '../services'),
  ];

  baseDirs.forEach((dir) => {
    if (!fs.existsSync(dir)) return;
    const files = getAllTsFilesRecursively(dir);
    files.forEach((file) => {
      const testFile = file.replace(/\.ts$/, '.test.ts');
      it(`${path.relative(process.cwd(), file)} should have a corresponding test file`, () => {
        expect(fs.existsSync(testFile)).toBe(true);
      });
    });
  });
});
