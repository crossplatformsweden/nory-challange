export default {
  noryApiZodSchemas: {
    input: {
      target: '../../utils/salad.yml',
    },
    output: {
      mode: 'tags-split',
      target: './src/generated',
      client: 'zod',
      fileExtension: '.zod.ts',
      clean: true,
    },
  },
};
