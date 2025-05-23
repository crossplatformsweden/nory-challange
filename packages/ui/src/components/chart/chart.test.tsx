import { render, screen } from '@testing-library/react';
import { Chart } from './index';

// Mock ResizeObserver for test environment
beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('Chart', () => {
  it('renders without crashing', () => {
    render(
      <Chart config={{}}>
        <div>Chart Content</div>
      </Chart>
    );
    expect(screen.getByTestId('chart-root')).toBeInTheDocument();
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
