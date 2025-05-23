/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-ignore
const { testStories } = require('@storybook/test');

testStories({
  configDir: `${__dirname}/../.storybook`,
});
