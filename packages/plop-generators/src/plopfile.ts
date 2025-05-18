import { NodePlopAPI } from 'plop';
import path from 'path';

export default function (plop: NodePlopAPI) {
  plop.setGenerator('next-page', {
    description: 'Generate a new NextJS page with tests',
    prompts: [
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
    ],
    actions: [
      {
        type: 'add',
        path: 'apps/web/app/{{path}}/page.tsx',
        templateFile: path.join(__dirname, 'plop-templates/page.hbs'),
      },
      {
        type: 'add',
        path: 'apps/web/app/{{path}}/page.test.tsx',
        templateFile: path.join(__dirname, 'plop-templates/page.test.hbs'),
      },
      {
        type: 'add',
        path: 'apps/web/app/{{path}}/page.e2e.test.tsx',
        templateFile: path.join(__dirname, 'plop-templates/page.e2e.test.hbs'),
      },
    ],
  });
} 