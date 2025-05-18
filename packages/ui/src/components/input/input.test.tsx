import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './index';

describe('Input', () => {
  it('renders input correctly', () => {
    render(<Input data-testid="input" />);
    
    const input = screen.getByTestId('input');
    expect(input).toBeInTheDocument();
  });

  it('renders input with specified type', () => {
    render(<Input data-testid="input" type="email" />);
    
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('applies base styling', () => {
    render(<Input data-testid="input" />);
    
    const input = screen.getByTestId('input');
    expect(input).toHaveClass('flex');
    expect(input).toHaveClass('h-10');
    expect(input).toHaveClass('w-full');
    expect(input).toHaveClass('rounded-md');
    expect(input).toHaveClass('border');
    expect(input).toHaveClass('border-input');
    expect(input).toHaveClass('bg-background');
  });

  it('handles placeholder text', () => {
    render(<Input placeholder="Enter text..." />);
    
    const input = screen.getByPlaceholderText('Enter text...');
    expect(input).toBeInTheDocument();
  });

  it('accepts and displays a value', () => {
    render(<Input data-testid="input" value="Test value" readOnly />);
    
    const input = screen.getByTestId('input');
    expect(input).toHaveValue('Test value');
  });

  it('handles typing text', async () => {
    render(<Input data-testid="input" />);
    
    const input = screen.getByTestId('input');
    await userEvent.type(input, 'Hello World');
    
    expect(input).toHaveValue('Hello World');
  });

  it('disables the input when disabled prop is true', () => {
    render(<Input data-testid="input" disabled />);
    
    const input = screen.getByTestId('input');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:cursor-not-allowed');
    expect(input).toHaveClass('disabled:opacity-50');
  });

  it('applies custom className', () => {
    render(<Input data-testid="input" className="custom-class" />);
    
    const input = screen.getByTestId('input');
    expect(input).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(<Input ref={ref} />);
    
    expect(ref).toHaveBeenCalled();
  });

  it('passes additional props to the input element', () => {
    render(
      <Input 
        data-testid="input" 
        aria-label="test input" 
        name="test-input" 
        required
      />
    );
    
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('aria-label', 'test input');
    expect(input).toHaveAttribute('name', 'test-input');
    expect(input).toBeRequired();
  });

  it('handles number input', async () => {
    render(<Input data-testid="input" type="number" />);
    
    const input = screen.getByTestId('input');
    await userEvent.type(input, '123');
    
    expect(input).toHaveValue(123);
  });

  it('handles file input', () => {
    render(<Input data-testid="input" type="file" />);
    
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('type', 'file');
    expect(input).toHaveClass('file:border-0');
    expect(input).toHaveClass('file:bg-transparent');
  });

  it('handles onChange events', async () => {
    const handleChange = jest.fn();
    render(<Input data-testid="input" onChange={handleChange} />);
    
    const input = screen.getByTestId('input');
    await userEvent.type(input, 'a');
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('handles focus styles', async () => {
    render(<Input data-testid="input" />);
    
    const input = screen.getByTestId('input');
    expect(input).toHaveClass('focus-visible:outline-none');
    expect(input).toHaveClass('focus-visible:ring-2');
    expect(input).toHaveClass('focus-visible:ring-ring');
    expect(input).toHaveClass('focus-visible:ring-offset-2');
    
    // Focus the input
    input.focus();
    expect(input).toHaveFocus();
  });
});