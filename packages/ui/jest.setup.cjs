require('@testing-library/jest-dom');

// Make React available globally for tests
global.React = require('react');

// Mock matchMedia for tests
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {},
    addEventListener: function() {},
    removeEventListener: function() {},
    dispatchEvent: function() {},
  };
};