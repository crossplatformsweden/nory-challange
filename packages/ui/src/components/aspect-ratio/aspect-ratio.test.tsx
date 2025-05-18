import { render, screen } from '@testing-library/react';
import { AspectRatio } from './index';

// Mock the Radix UI AspectRatio component
jest.mock('@radix-ui/react-aspect-ratio', () => {
  const React = require('react');
  return {
    Root: React.forwardRef(({ ratio = 1, children, ...props }, ref) => (
      <div 
        ref={ref}
        data-ratio={ratio}
        style={{ 
          position: 'relative',
          paddingBottom: `${(1 / ratio) * 100}%` 
        }}
        {...props}
      >
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
          {children}
        </div>
      </div>
    )),
  };
});

describe('AspectRatio', () => {
  it('renders with default ratio of 1:1', () => {
    render(
      <AspectRatio data-testid="aspect-ratio">
        <div data-testid="child">Content</div>
      </AspectRatio>
    );
    
    const aspectRatioDiv = screen.getByTestId('aspect-ratio');
    expect(aspectRatioDiv).toHaveAttribute('data-ratio', '1');
    expect(aspectRatioDiv).toHaveStyle('padding-bottom: 100%');
  });

  it('renders with custom ratio of 16:9', () => {
    render(
      <AspectRatio ratio={16 / 9} data-testid="aspect-ratio">
        <div data-testid="child">Content</div>
      </AspectRatio>
    );
    
    const aspectRatioDiv = screen.getByTestId('aspect-ratio');
    expect(aspectRatioDiv).toHaveAttribute('data-ratio', (16 / 9).toString());
    
    // 16:9 ratio results in padding-bottom of approximately 56.25%
    const paddingBottom = (1 / (16 / 9)) * 100;
    expect(aspectRatioDiv).toHaveStyle(`padding-bottom: ${paddingBottom}%`);
  });

  it('renders children correctly', () => {
    render(
      <AspectRatio data-testid="aspect-ratio">
        <div data-testid="child">Content</div>
      </AspectRatio>
    );
    
    const child = screen.getByTestId('child');
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent('Content');
  });

  it('accepts and applies additional props', () => {
    render(
      <AspectRatio data-testid="aspect-ratio" className="custom-class">
        <div>Content</div>
      </AspectRatio>
    );
    
    const aspectRatioDiv = screen.getByTestId('aspect-ratio');
    expect(aspectRatioDiv).toHaveClass('custom-class');
  });
});