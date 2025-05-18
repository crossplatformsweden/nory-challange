import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Button } from './button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click Me');
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-blue-500');
    
    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-teal-500');
    
    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-blue-200');
    
    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-transparent');
    
    rerender(<Button variant="link">Link</Button>);
    expect(screen.getByRole('button')).toHaveClass('hover:underline');
    
    rerender(<Button variant="danger">Danger</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-red-500');
  });

  it('renders different sizes', () => {
    const { rerender } = render(<Button size="xs">Extra Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-7');
    
    rerender(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-9');
    
    rerender(<Button size="md">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-10');
    
    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-11');
    
    rerender(<Button size="xl">Extra Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-12');
  });

  it('renders full width button', () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  it('renders loading state', () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-transparent');
    expect(screen.getByRole('button')).toContainElement(screen.getByText('Loading'));
    
    // Should have SVG spinner
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('animate-spin');
  });

  it('renders with start icon', () => {
    render(
      <Button startIcon={<span data-testid="start-icon">→</span>}>
        With Start Icon
      </Button>
    );
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByTestId('start-icon').parentElement).toHaveClass('mr-2');
  });

  it('renders with end icon', () => {
    render(
      <Button endIcon={<span data-testid="end-icon">→</span>}>
        With End Icon
      </Button>
    );
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    expect(screen.getByTestId('end-icon').parentElement).toHaveClass('ml-2');
  });

  it('is disabled when disabled prop is true', async () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
    
    await userEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies additional className', () => {
    render(<Button className="custom-class">Custom Class</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});