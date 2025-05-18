import { render, screen } from '@testing-library/react';
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from './index';

// Mock recharts
jest.mock('recharts', () => {
  const React = require('react');
  return {
    ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,
    Tooltip: ({ children, ...props }) => <div data-testid="tooltip" {...props}>{children}</div>,
    Legend: ({ children, ...props }) => <div data-testid="legend" {...props}>{children}</div>,
    LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
    BarChart: ({ children }) => <div data-testid="bar-chart">{children}</div>,
    Line: (props) => <div data-testid="line" {...props} />,
    Bar: (props) => <div data-testid="bar" {...props} />,
    XAxis: (props) => <div data-testid="x-axis" {...props} />,
    YAxis: (props) => <div data-testid="y-axis" {...props} />,
    CartesianGrid: (props) => <div data-testid="cartesian-grid" {...props} />,
  };
});

describe('Chart', () => {
  const mockConfig = {
    visits: {
      label: 'Visits',
      color: '#3498db',
    },
    revenue: {
      label: 'Revenue',
      color: '#2ecc71',
    }
  };

  it('renders ChartContainer with default props', () => {
    render(
      <ChartContainer config={mockConfig}>
        {({ width, height }) => (
          <div data-testid="chart-content">Chart Content</div>
        )}
      </ChartContainer>
    );
    
    const container = screen.getByText('Chart Content').closest('[data-chart]');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('flex aspect-video justify-center text-xs');
    
    const responsiveContainer = screen.getByTestId('responsive-container');
    expect(responsiveContainer).toBeInTheDocument();
  });

  it('renders ChartContainer with custom class', () => {
    render(
      <ChartContainer config={mockConfig} className="custom-chart-class">
        {({ width, height }) => (
          <div data-testid="chart-content">Chart Content</div>
        )}
      </ChartContainer>
    );
    
    const container = screen.getByText('Chart Content').closest('[data-chart]');
    expect(container).toHaveClass('custom-chart-class');
  });

  it('renders ChartTooltipContent when active and has payload', () => {
    const mockPayload = [
      {
        name: 'Visits',
        dataKey: 'visits',
        value: 1000,
        color: '#3498db',
        payload: { visits: 1000 }
      }
    ];
    
    render(
      <ChartContainer config={mockConfig}>
        {({ width, height }) => (
          <ChartTooltipContent active={true} payload={mockPayload} />
        )}
      </ChartContainer>
    );
    
    // Check if the tooltip renders the value
    const valueElement = screen.getByText('1,000');
    expect(valueElement).toBeInTheDocument();
    
    // Check if the tooltip renders the label
    const labelElement = screen.getByText('Visits');
    expect(labelElement).toBeInTheDocument();
  });

  it('does not render ChartTooltipContent when not active', () => {
    const mockPayload = [
      {
        name: 'Visits',
        dataKey: 'visits',
        value: 1000,
        color: '#3498db',
        payload: { visits: 1000 }
      }
    ];
    
    render(
      <ChartContainer config={mockConfig}>
        {({ width, height }) => (
          <ChartTooltipContent active={false} payload={mockPayload} />
        )}
      </ChartContainer>
    );
    
    // The tooltip should not render anything
    const tooltip = screen.queryByText('Visits');
    expect(tooltip).not.toBeInTheDocument();
  });

  it('renders ChartLegendContent with payload', () => {
    const mockPayload = [
      {
        value: 'Visits',
        color: '#3498db',
        dataKey: 'visits'
      },
      {
        value: 'Revenue',
        color: '#2ecc71',
        dataKey: 'revenue'
      }
    ];
    
    render(
      <ChartContainer config={mockConfig}>
        {({ width, height }) => (
          <ChartLegendContent payload={mockPayload} />
        )}
      </ChartContainer>
    );
    
    // Check if legend items are rendered
    const visitLabel = screen.getByText('Visits');
    const revenueLabel = screen.getByText('Revenue');
    
    expect(visitLabel).toBeInTheDocument();
    expect(revenueLabel).toBeInTheDocument();
  });

  it('does not render ChartLegendContent without payload', () => {
    render(
      <ChartContainer config={mockConfig}>
        {({ width, height }) => (
          <ChartLegendContent payload={[]} />
        )}
      </ChartContainer>
    );
    
    // The legend should not render anything
    const legendContainer = screen.queryByText('Visits');
    expect(legendContainer).not.toBeInTheDocument();
  });
});