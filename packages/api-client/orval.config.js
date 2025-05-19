module.exports = {
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
        enabled: true,
        format: 'msw',
        output: './src/generated/msw.ts',
        exportAll: true,
        delay: 1000,
        formatOptions: {
          exportAll: true,
          exportHandlers: true,
          mswVersion: 2,
        },
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
      hooks: {
        queries: true,
        mutations: true,
        reactQuery: {
          version: 5,
        },
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
};
