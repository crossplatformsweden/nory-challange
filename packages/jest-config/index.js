// Export the Jest configurations
const baseConfig = require('./base');
const reactConfig = require('./react');
const nextConfig = require('./next');

module.exports = {
  base: baseConfig,
  react: reactConfig,
  next: nextConfig
};