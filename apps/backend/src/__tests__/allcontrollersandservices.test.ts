// TODO using fs or similar or other library, important recursively!. Make sure there is corresponding test files for each ts file.

import fs from 'fs';
import path from 'path';

describe('All controllers and services have corresponding test files', () => {
  const baseDirs = [
    path.join(__dirname, '../controllers'),
    path.join(__dirname, '../services'),
  ];

  baseDirs.forEach((dir) => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && !f.endsWith('.test.ts'));
    files.forEach((file) => {
      const testFile = path.join(dir, file.replace(/\.ts$/, '.test.ts'));
      it(`${file} should have a corresponding test file`, () => {
        expect(fs.existsSync(testFile)).toBe(true);
      });
    });
  });
});
