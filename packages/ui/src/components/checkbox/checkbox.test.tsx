import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './index';

describe('Checkbox', () => {
  it('renders unchecked checkbox by default', () => {
    render(<Checkbox data-testid="checkbox" />);
    
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('data-state', 'unchecked');
  });

  it('renders checked checkbox when checked prop is true', () => {
    render(<Checkbox data-testid="checkbox" checked />);
    
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toHaveAttribute('data-state', 'checked');
  });

  it('renders disabled checkbox when disabled prop is true', () => {
    render(<Checkbox data-testid="checkbox" disabled />);
    
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveClass('disabled:opacity-50');
  });

  it('calls onCheckedChange handler when clicked', async () => {
    const handleCheckedChange = jest.fn();
    render(<Checkbox data-testid="checkbox" onCheckedChange={handleCheckedChange} />);
    
    const checkbox = screen.getByTestId('checkbox');
    await userEvent.click(checkbox);
    
    expect(handleCheckedChange).toHaveBeenCalledTimes(1);
    expect(handleCheckedChange).toHaveBeenCalledWith(true);
  });

  it('applies custom className', () => {
    render(<Checkbox data-testid="checkbox" className="custom-class" />);
    
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toHaveClass('custom-class');
  });

  it('has a check icon when checked', () => {
    render(<Checkbox data-testid="checkbox" checked />);
    
    const checkbox = screen.getByTestId('checkbox');
    const checkIcon = checkbox.querySelector('svg');
    expect(checkIcon).toBeInTheDocument();
  });

  it('handles unchecked state', () => {
    render(<Checkbox data-testid="checkbox" />);
    
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toHaveAttribute('data-state', 'unchecked');
  });

  it('toggles checked state when clicked', async () => {
    render(<Checkbox data-testid="checkbox" />);
    
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toHaveAttribute('data-state', 'unchecked');
    
    await userEvent.click(checkbox);
    expect(checkbox).toHaveAttribute('data-state', 'checked');
    
    await userEvent.click(checkbox);
    expect(checkbox).toHaveAttribute('data-state', 'unchecked');
  });

  it('cannot be clicked when disabled', async () => {
    const handleCheckedChange = jest.fn();
    render(
      <Checkbox 
        data-testid="checkbox" 
        disabled 
        onCheckedChange={handleCheckedChange} 
      />
    );
    
    const checkbox = screen.getByTestId('checkbox');
    await userEvent.click(checkbox);
    
    expect(handleCheckedChange).not.toHaveBeenCalled();
  });

  it('works with label using htmlFor', async () => {
    const handleCheckedChange = jest.fn();
    render(
      <>
        <Checkbox id="test-checkbox" data-testid="checkbox" onCheckedChange={handleCheckedChange} />
        <label htmlFor="test-checkbox" data-testid="label">Test Label</label>
      </>
    );
    
    const label = screen.getByTestId('label');
    await userEvent.click(label);
    
    expect(handleCheckedChange).toHaveBeenCalledTimes(1);
    expect(handleCheckedChange).toHaveBeenCalledWith(true);
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(<Checkbox ref={ref} />);
    
    expect(ref).toHaveBeenCalled();
  });
});