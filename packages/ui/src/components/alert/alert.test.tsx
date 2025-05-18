import { render, screen } from '@testing-library/react';
import { Alert, AlertTitle, AlertDescription } from './index';

describe('Alert', () => {
  it('renders alert with default variant', () => {
    render(
      <Alert>
        <AlertTitle>Alert Title</AlertTitle>
        <AlertDescription>Alert Description</AlertDescription>
      </Alert>
    );
    
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('bg-background');
    expect(alert).toHaveClass('text-foreground');
    
    const title = screen.getByText('Alert Title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('mb-1');
    expect(title).toHaveClass('font-medium');
    
    const description = screen.getByText('Alert Description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-sm');
  });

  it('renders alert with destructive variant', () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>Destructive Alert</AlertTitle>
        <AlertDescription>Destructive Description</AlertDescription>
      </Alert>
    );
    
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('border-destructive/50');
    expect(alert).toHaveClass('text-destructive');
    
    const title = screen.getByText('Destructive Alert');
    expect(title).toBeInTheDocument();
    
    const description = screen.getByText('Destructive Description');
    expect(description).toBeInTheDocument();
  });

  it('applies custom className to Alert', () => {
    render(<Alert className="custom-alert">Alert Content</Alert>);
    
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('custom-alert');
  });

  it('applies custom className to AlertTitle', () => {
    render(<AlertTitle className="custom-title">Custom Title</AlertTitle>);
    
    const title = screen.getByText('Custom Title');
    expect(title).toHaveClass('custom-title');
  });

  it('applies custom className to AlertDescription', () => {
    render(<AlertDescription className="custom-description">Custom Description</AlertDescription>);
    
    const description = screen.getByText('Custom Description');
    expect(description).toHaveClass('custom-description');
  });

  it('forwards ref to Alert component', () => {
    const ref = jest.fn();
    render(<Alert ref={ref}>Alert with ref</Alert>);
    
    expect(ref).toHaveBeenCalled();
  });

  it('forwards ref to AlertTitle component', () => {
    const ref = jest.fn();
    render(<AlertTitle ref={ref}>Title with ref</AlertTitle>);
    
    expect(ref).toHaveBeenCalled();
  });

  it('forwards ref to AlertDescription component', () => {
    const ref = jest.fn();
    render(<AlertDescription ref={ref}>Description with ref</AlertDescription>);
    
    expect(ref).toHaveBeenCalled();
  });

  it('renders alert with icon correctly', () => {
    render(
      <Alert>
        <svg data-testid="test-icon" />
        <AlertTitle>Alert with Icon</AlertTitle>
        <AlertDescription>Description with Icon</AlertDescription>
      </Alert>
    );
    
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('[&>svg~*]:pl-7');
    expect(alert).toHaveClass('[&>svg+div]:translate-y-[-3px]');
    
    const icon = screen.getByTestId('test-icon');
    expect(icon).toBeInTheDocument();
  });
});