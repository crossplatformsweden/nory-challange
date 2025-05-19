import '@testing-library/jest-dom';

// Add TextEncoder and TextDecoder polyfills
import { TextEncoder, TextDecoder } from 'util';
import { Response, Request, Headers } from 'node-fetch';

// Mock BroadcastChannel
class MockBroadcastChannel {
  constructor() {}
  postMessage() {}
  close() {}
}

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.Response = Response;
global.Request = Request;
global.Headers = Headers;
global.BroadcastChannel = MockBroadcastChannel;
