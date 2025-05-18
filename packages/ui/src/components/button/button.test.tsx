import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './index';

describe('Button', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button', { name: 'Click Me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
  });

  it('renders correctly with destructive variant', () => {
    render(<Button variant="destructive">Destructive</Button>);
    const button = screen.getByRole('button', { name: 'Destructive' });
    expect(button).toHaveClass('bg-destructive');
  });

  it('renders correctly with outline variant', () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole('button', { name: 'Outline' });
    expect(button).toHaveClass('border-input');
    expect(button).toHaveClass('bg-background');
  });

  it('renders correctly with secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button', { name: 'Secondary' });
    expect(button).toHaveClass('bg-secondary');
  });

  it('renders correctly with ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole('button', { name: 'Ghost' });
    expect(button).toHaveClass('hover:bg-accent');
  });

  it('renders correctly with link variant', () => {
    render(<Button variant="link">Link</Button>);
    const button = screen.getByRole('button', { name: 'Link' });
    expect(button).toHaveClass('text-primary');
    expect(button).toHaveClass('hover:underline');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Button size="default">Default Size</Button>);
    const defaultButton = screen.getByRole('button', { name: 'Default Size' });
    expect(defaultButton).toHaveClass('h-10');
    expect(defaultButton).toHaveClass('px-4');
    
    rerender(<Button size="sm">Small Size</Button>);
    const smallButton = screen.getByRole('button', { name: 'Small Size' });
    expect(smallButton).toHaveClass('h-9');
    expect(smallButton).toHaveClass('px-3');
    
    rerender(<Button size="lg">Large Size</Button>);
    const largeButton = screen.getByRole('button', { name: 'Large Size' });
    expect(largeButton).toHaveClass('h-11');
    expect(largeButton).toHaveClass('px-8');
    
    rerender(<Button size="icon">Icon</Button>);
    const iconButton = screen.getByRole('button', { name: 'Icon' });
    expect(iconButton).toHaveClass('h-10');
    expect(iconButton).toHaveClass('w-10');
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole('button', { name: 'Click Me' });
    
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('respects disabled state', async () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    const button = screen.getByRole('button', { name: 'Disabled' });
    
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
    
    await userEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom Class</Button>);
    const button = screen.getByRole('button', { name: 'Custom Class' });
    expect(button).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(<Button ref={ref}>Ref Button</Button>);
    expect(ref).toHaveBeenCalled();
  });

  it('renders as a different element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="#">Link Button</a>
      </Button>
    );
    
    const link = screen.getByRole('link', { name: 'Link Button' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#');
    expect(link).toHaveClass('bg-primary'); // Should still have button classes
  });
});