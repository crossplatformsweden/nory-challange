import fs from 'fs';
import path from 'path';

// ARE YOU SURE THE PATHS ARE CORRECT? Verify in test that it finds some files. and array is noty empty. using a expect

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
    it(`should find at least one .ts file in ${path.relative(process.cwd(), dir)}`, () => {
      expect(files.length).toBeGreaterThan(0);
    });
    files.forEach((file) => {
      const testFile = file.replace(/\.ts$/, '.test.ts');
      it(`${path.relative(process.cwd(), file)} should have a corresponding test file`, () => {
        expect(fs.existsSync(testFile)).toBe(true);
        // FILE SHOULD EXIST
        const lineCount = fs.readFileSync(testFile, 'utf-8').split('\n').length;
        expect(lineCount).toBeGreaterThanOrEqual(50);
      });
    });
  });
});
