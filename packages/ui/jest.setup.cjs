require('@testing-library/jest-dom');

// Make React available globally for tests
global.React = require('react');

// Define window if it doesn't exist (for Node.js environment)
if (typeof window === 'undefined') {
  /** @type {Window & typeof globalThis} */
  global.window = {};
}

// Mock matchMedia for tests
/** @type {Window & typeof globalThis} */
global.window.matchMedia =
  global.window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
      addEventListener: function () {},
      removeEventListener: function () {},
      dispatchEvent: function () {},
    };
  };
