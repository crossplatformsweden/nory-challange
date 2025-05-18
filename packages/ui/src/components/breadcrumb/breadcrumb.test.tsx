import { render, screen } from '@testing-library/react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from './index';

describe('Breadcrumb', () => {
  it('renders the root component correctly', () => {
    render(<Breadcrumb>Test Breadcrumb</Breadcrumb>);
    const breadcrumb = screen.getByRole('navigation');
    expect(breadcrumb).toBeInTheDocument();
    expect(breadcrumb).toHaveAttribute('aria-label', 'breadcrumb');
  });

  it('renders list with proper classes', () => {
    render(
      <BreadcrumbList data-testid="breadcrumb-list">
        List Content
      </BreadcrumbList>
    );
    const list = screen.getByTestId('breadcrumb-list');
    expect(list).toBeInTheDocument();
    expect(list.tagName).toBe('OL');
    expect(list).toHaveClass('flex', 'flex-wrap', 'items-center');
  });

  it('renders breadcrumb item correctly', () => {
    render(
      <BreadcrumbItem data-testid="breadcrumb-item">
        Item Content
      </BreadcrumbItem>
    );
    const item = screen.getByTestId('breadcrumb-item');
    expect(item).toBeInTheDocument();
    expect(item.tagName).toBe('LI');
    expect(item).toHaveClass('inline-flex', 'items-center');
  });

  it('renders breadcrumb link correctly', () => {
    render(
      <BreadcrumbLink href="#" data-testid="breadcrumb-link">
        Link Content
      </BreadcrumbLink>
    );
    const link = screen.getByTestId('breadcrumb-link');
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '#');
    expect(link).toHaveClass('hover:text-foreground');
  });

  it('renders breadcrumb page (current) correctly', () => {
    render(
      <BreadcrumbPage data-testid="breadcrumb-page">
        Current Page
      </BreadcrumbPage>
    );
    const page = screen.getByTestId('breadcrumb-page');
    expect(page).toBeInTheDocument();
    expect(page.tagName).toBe('SPAN');
    expect(page).toHaveAttribute('aria-current', 'page');
    expect(page).toHaveAttribute('aria-disabled', 'true');
    expect(page).toHaveClass('text-foreground');
  });

  it('renders separator with default chevron icon', () => {
    render(<BreadcrumbSeparator data-testid="separator" />);
    const separator = screen.getByTestId('separator');
    expect(separator).toBeInTheDocument();
    expect(separator.tagName).toBe('LI');
    expect(separator).toHaveAttribute('aria-hidden', 'true');
    
    // Should contain an SVG (the ChevronRight icon)
    const icon = separator.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('renders separator with custom content', () => {
    render(
      <BreadcrumbSeparator data-testid="separator">
        <span data-testid="custom-separator">/</span>
      </BreadcrumbSeparator>
    );
    const separator = screen.getByTestId('separator');
    expect(separator).toBeInTheDocument();
    
    const customContent = screen.getByTestId('custom-separator');
    expect(customContent).toBeInTheDocument();
    expect(customContent).toHaveTextContent('/');
  });

  it('renders ellipsis correctly', () => {
    render(<BreadcrumbEllipsis data-testid="ellipsis" />);
    const ellipsis = screen.getByTestId('ellipsis');
    expect(ellipsis).toBeInTheDocument();
    expect(ellipsis.tagName).toBe('SPAN');
    expect(ellipsis).toHaveAttribute('aria-hidden', 'true');
    
    // Should contain the MoreHorizontal icon
    const icon = ellipsis.querySelector('svg');
    expect(icon).toBeInTheDocument();
    
    // Should have a screen reader text
    const srOnly = ellipsis.querySelector('.sr-only');
    expect(srOnly).toBeInTheDocument();
    expect(srOnly).toHaveTextContent('More');
  });

  it('renders a complete breadcrumb navigation', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Product Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
    
    // Check if all components render correctly
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Product Details')).toBeInTheDocument();
    
    // Check current page has correct attributes
    const currentPage = screen.getByText('Product Details');
    expect(currentPage).toHaveAttribute('aria-current', 'page');
  });

  it('renders with custom classes', () => {
    render(
      <Breadcrumb className="custom-breadcrumb">
        <BreadcrumbList className="custom-list">
          <BreadcrumbItem className="custom-item">
            <BreadcrumbLink className="custom-link" href="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="custom-separator" />
          <BreadcrumbItem>
            <BreadcrumbPage className="custom-page">Page</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
    
    expect(screen.getByRole('navigation')).toHaveClass('custom-breadcrumb');
    expect(screen.getByRole('list')).toHaveClass('custom-list');
    expect(screen.getByText('Home').closest('li')).toHaveClass('custom-item');
    expect(screen.getByText('Home')).toHaveClass('custom-link');
    expect(screen.getByText('Page')).toHaveClass('custom-page');
  });
});