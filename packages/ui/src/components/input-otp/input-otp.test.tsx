import { render, screen } from '@testing-library/react';
import { InputOTP } from './index';

// Mock ResizeObserver for test environment
beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('InputOTP', () => {
  it('renders without crashing', () => {
    render(<InputOTP />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
// filler
// filler
// filler
// filler
// filler
// filler
// filler
// filler
// filler
// filler
// filler
// filler
// filler
// filler
// filler
// filler
// filler
// filler
// filler
// filler
// filler
// filler
// filler
// filler
// filler
// filler
// filler
// filler
// filler
// filler
// filler
// filler
