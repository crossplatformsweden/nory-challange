import { defineConfig } from 'orval';

export default defineConfig({
  noryApiClient: {
    input: {
      target: '../../utils/salad.yml',
    },
    output: {
      target: './src/generated',
      schemas: './src/generated/model',
      client: 'axios',
      clean: true,
      mode: 'split',
      mock: {
        type: 'msw',
        delay: 1000,
        useExamples: true,
      },
      override: {
        mutator: {
          path: './src/custom-instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
  noryApiHooks: {
    input: {
      target: '../../utils/salad.yml',
    },
    output: {
      mode: 'tags-split',
      target: './src/generated/hooks',
      client: 'react-query',
      clean: true,
      prettier: true,
      mock: {
        type: 'msw',
        delay: 1000,
        useExamples: true,
      },
    },
  },
  noryApiZodSchemas: {
    input: {
      target: '../../utils/salad.yml',
    },
    output: {
      mode: 'tags-split',
      target: './src/generated',
      client: 'zod',
      fileExtension: '.zod.ts',
      clean: false,
    },
  },
}) as any;
