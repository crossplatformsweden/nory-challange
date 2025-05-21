import fs from 'fs';
import path from 'path';

// ARE YOU SURE THE PATHS ARE CORRECT? Verify in test that it finds some files. and array is not empty. using a expect and that each components has a story file.

function getAllComponentFilesRecursively(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach((file: string) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllComponentFilesRecursively(filePath));
    } else if (file === 'index.tsx') {
      results.push(filePath);
    }
  });
  return results;
}

describe('All UI components have corresponding test files (recursive)', () => {
  const baseDir = path.join(__dirname, '../components');

  if (!fs.existsSync(baseDir)) return;
  const files = getAllComponentFilesRecursively(baseDir);
  it(`should find at least one component (index.tsx) file in ${path.relative(process.cwd(), baseDir)}`, () => {
    expect(files.length).toBeGreaterThan(0);
  });
  files.forEach((file) => {
    const dirName = path.basename(path.dirname(file));
    const testFile = path.join(path.dirname(file), `${dirName}.test.tsx`);
    const storiesFile = path.join(path.dirname(file), `${dirName}.stories.tsx`);
    it(`${path.relative(process.cwd(), file)} should have a corresponding test file`, () => {
      expect(fs.existsSync(testFile)).toBe(true);
      // FILE SHOULD EXIST
      const lineCount = fs.readFileSync(testFile, 'utf-8').split('\n').length;
      expect(lineCount).toBeGreaterThanOrEqual(50);
    });
    it(`${path.relative(process.cwd(), file)} should have a corresponding stories file`, () => {
      expect(fs.existsSync(storiesFile)).toBe(true);
    });
  });
}); 