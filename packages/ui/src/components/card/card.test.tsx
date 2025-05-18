import { render, screen } from '@testing-library/react';
import { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from './index';

describe('Card', () => {
  it('renders card with base styles', () => {
    render(<Card data-testid="card">Card Content</Card>);
    
    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('rounded-lg');
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('bg-card');
    expect(card).toHaveClass('text-card-foreground');
    expect(card).toHaveClass('shadow-sm');
    expect(card).toHaveTextContent('Card Content');
  });

  it('renders CardHeader with correct styles', () => {
    render(<CardHeader data-testid="card-header">Header Content</CardHeader>);
    
    const header = screen.getByTestId('card-header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('flex');
    expect(header).toHaveClass('flex-col');
    expect(header).toHaveClass('space-y-1.5');
    expect(header).toHaveClass('p-6');
    expect(header).toHaveTextContent('Header Content');
  });

  it('renders CardTitle with correct styles', () => {
    render(<CardTitle data-testid="card-title">Card Title</CardTitle>);
    
    const title = screen.getByTestId('card-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-2xl');
    expect(title).toHaveClass('font-semibold');
    expect(title).toHaveClass('leading-none');
    expect(title).toHaveClass('tracking-tight');
    expect(title).toHaveTextContent('Card Title');
  });

  it('renders CardDescription with correct styles', () => {
    render(<CardDescription data-testid="card-description">Card Description</CardDescription>);
    
    const description = screen.getByTestId('card-description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-sm');
    expect(description).toHaveClass('text-muted-foreground');
    expect(description).toHaveTextContent('Card Description');
  });

  it('renders CardContent with correct styles', () => {
    render(<CardContent data-testid="card-content">Content</CardContent>);
    
    const content = screen.getByTestId('card-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass('p-6');
    expect(content).toHaveClass('pt-0');
    expect(content).toHaveTextContent('Content');
  });

  it('renders CardFooter with correct styles', () => {
    render(<CardFooter data-testid="card-footer">Footer</CardFooter>);
    
    const footer = screen.getByTestId('card-footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('flex');
    expect(footer).toHaveClass('items-center');
    expect(footer).toHaveClass('p-6');
    expect(footer).toHaveClass('pt-0');
    expect(footer).toHaveTextContent('Footer');
  });

  it('applies custom className to Card', () => {
    render(<Card className="custom-card" data-testid="card">Card</Card>);
    
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('custom-card');
  });

  it('applies custom className to CardHeader', () => {
    render(<CardHeader className="custom-header" data-testid="header">Header</CardHeader>);
    
    const header = screen.getByTestId('header');
    expect(header).toHaveClass('custom-header');
  });

  it('applies custom className to CardTitle', () => {
    render(<CardTitle className="custom-title" data-testid="title">Title</CardTitle>);
    
    const title = screen.getByTestId('title');
    expect(title).toHaveClass('custom-title');
  });

  it('applies custom className to CardDescription', () => {
    render(<CardDescription className="custom-desc" data-testid="desc">Description</CardDescription>);
    
    const desc = screen.getByTestId('desc');
    expect(desc).toHaveClass('custom-desc');
  });

  it('applies custom className to CardContent', () => {
    render(<CardContent className="custom-content" data-testid="content">Content</CardContent>);
    
    const content = screen.getByTestId('content');
    expect(content).toHaveClass('custom-content');
  });

  it('applies custom className to CardFooter', () => {
    render(<CardFooter className="custom-footer" data-testid="footer">Footer</CardFooter>);
    
    const footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('custom-footer');
  });

  it('renders a full card with all components', () => {
    render(
      <Card data-testid="full-card">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    );
    
    const card = screen.getByTestId('full-card');
    expect(card).toBeInTheDocument();
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
    expect(screen.getByText('Card Footer')).toBeInTheDocument();
  });

  it('forwards ref to Card component', () => {
    const ref = jest.fn();
    render(<Card ref={ref}>Card with ref</Card>);
    expect(ref).toHaveBeenCalled();
  });

  it('forwards ref to CardHeader component', () => {
    const ref = jest.fn();
    render(<CardHeader ref={ref}>Header with ref</CardHeader>);
    expect(ref).toHaveBeenCalled();
  });

  it('forwards ref to CardTitle component', () => {
    const ref = jest.fn();
    render(<CardTitle ref={ref}>Title with ref</CardTitle>);
    expect(ref).toHaveBeenCalled();
  });

  it('forwards ref to CardDescription component', () => {
    const ref = jest.fn();
    render(<CardDescription ref={ref}>Description with ref</CardDescription>);
    expect(ref).toHaveBeenCalled();
  });

  it('forwards ref to CardContent component', () => {
    const ref = jest.fn();
    render(<CardContent ref={ref}>Content with ref</CardContent>);
    expect(ref).toHaveBeenCalled();
  });

  it('forwards ref to CardFooter component', () => {
    const ref = jest.fn();
    render(<CardFooter ref={ref}>Footer with ref</CardFooter>);
    expect(ref).toHaveBeenCalled();
  });
});