require('@testing-library/jest-dom');

// Add TextEncoder and TextDecoder polyfills
const { TextEncoder, TextDecoder } = require('util');
require('whatwg-fetch');

// Mock BroadcastChannel
class MockBroadcastChannel {
  constructor() {}
  postMessage() {}
  close() {}
}

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.BroadcastChannel = MockBroadcastChannel;
