import { render, screen } from '@testing-library/react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from './index';
import React from 'react';

// Mock the Radix UI NavigationMenu components
jest.mock('@radix-ui/react-navigation-menu', () => ({
  Root: ({ className, children, ...props }: any) => (
    <div data-testid="navigation-menu-root" className={className} {...props}>
      {children}
    </div>
  ),
  List: ({ className, children, ...props }: any) => (
    <ul data-testid="navigation-menu-list" className={className} {...props}>
      {children}
    </ul>
  ),
  Item: ({ className, children, ...props }: any) => (
    <li data-testid="navigation-menu-item" className={className} {...props}>
      {children}
    </li>
  ),
  Trigger: ({ className, children, ...props }: any) => (
    <button
      data-testid="navigation-menu-trigger"
      className={className}
      {...props}
    >
      {children}
    </button>
  ),
  Content: ({ className, children, ...props }: any) => (
    <div data-testid="navigation-menu-content" className={className} {...props}>
      {children}
    </div>
  ),
  Link: ({ className, children, ...props }: any) => (
    <a data-testid="navigation-menu-link" className={className} {...props}>
      {children}
    </a>
  ),
  Indicator: ({ className, children, ...props }: any) => (
    <div
      data-testid="navigation-menu-indicator"
      className={className}
      {...props}
    >
      {children}
    </div>
  ),
  Viewport: ({ className, children, ...props }: any) => (
    <div
      data-testid="navigation-menu-viewport"
      className={className}
      {...props}
    >
      {children}
    </div>
  ),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ChevronDown: () => <span data-testid="chevron-down">ChevronDown</span>,
}));

describe('NavigationMenu', () => {
  it('renders NavigationMenu with default classes', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu Item</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    const root = screen.getByTestId('navigation-menu-root');
    expect(root).toHaveClass(
      'relative',
      'z-10',
      'flex',
      'max-w-max',
      'flex-1',
      'items-center',
      'justify-center'
    );
  });

  it('renders NavigationMenuList with default classes', () => {
    render(
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Menu Item</NavigationMenuTrigger>
        </NavigationMenuItem>
      </NavigationMenuList>
    );

    const list = screen.getByTestId('navigation-menu-list');
    expect(list).toHaveClass(
      'group',
      'flex',
      'flex-1',
      'list-none',
      'items-center',
      'justify-center',
      'space-x-1'
    );
  });

  it('renders NavigationMenuTrigger with default classes and ChevronDown icon', () => {
    render(<NavigationMenuTrigger>Menu Item</NavigationMenuTrigger>);

    const trigger = screen.getByTestId('navigation-menu-trigger');
    const chevron = screen.getByTestId('chevron-down');

    expect(trigger).toHaveClass('group');
    expect(trigger).toHaveTextContent('Menu Item');
    expect(chevron).toBeInTheDocument();
  });

  it('applies custom class to NavigationMenu', () => {
    const customClass = 'custom-nav-menu';
    render(<NavigationMenu className={customClass} />);

    const root = screen.getByTestId('navigation-menu-root');
    expect(root).toHaveClass(customClass);
  });

  it('applies custom class to NavigationMenuList', () => {
    const customClass = 'custom-nav-list';
    render(<NavigationMenuList className={customClass} />);

    const list = screen.getByTestId('navigation-menu-list');
    expect(list).toHaveClass(customClass);
  });

  it('renders NavigationMenuContent with default classes', () => {
    render(<NavigationMenuContent>Content</NavigationMenuContent>);

    const content = screen.getByTestId('navigation-menu-content');
    expect(content).toHaveClass(
      'left-0',
      'top-0',
      'w-full',
      'data-[motion^=from-]:animate-in',
      'data-[motion^=to-]:animate-out'
    );
    expect(content).toHaveTextContent('Content');
  });

  it('renders NavigationMenuIndicator with default classes', () => {
    render(<NavigationMenuIndicator />);

    const indicator = screen.getByTestId('navigation-menu-indicator');
    expect(indicator).toHaveClass(
      'top-full',
      'z-[1]',
      'flex',
      'h-1.5',
      'items-end',
      'justify-center',
      'overflow-hidden'
    );

    // Should have a child div for the indicator arrow
    const arrow = indicator.querySelector('div');
    expect(arrow).toHaveClass(
      'relative',
      'top-[60%]',
      'h-2',
      'w-2',
      'rotate-45',
      'rounded-tl-sm',
      'bg-border',
      'shadow-md'
    );
  });

  it('renders NavigationMenuViewport with default classes', () => {
    render(
      <NavigationMenu>
        <NavigationMenuViewport data-testid="test-viewport" />
      </NavigationMenu>
    );

    // The viewport wrapper and viewport are now properly identified with test IDs
    const viewport = screen.getByTestId('test-viewport');
    expect(viewport).toBeInTheDocument();
    expect(viewport).toHaveClass(
      'origin-top-center',
      'relative',
      'mt-1.5',
      'overflow-hidden',
      'rounded-md',
      'border'
    );
  });

  it('renders NavigationMenuLink', () => {
    const href = '/example';
    render(<NavigationMenuLink href={href}>Link Text</NavigationMenuLink>);

    const link = screen.getByTestId('navigation-menu-link');
    expect(link).toHaveAttribute('href', href);
    expect(link).toHaveTextContent('Link Text');
  });

  it('renders a complete navigation menu structure', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item 1</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="/link1">Link 1</NavigationMenuLink>
              <NavigationMenuLink href="/link2">Link 2</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/direct">Direct Link</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuIndicator />
      </NavigationMenu>
    );

    expect(screen.getByTestId('navigation-menu-root')).toBeInTheDocument();
    expect(screen.getByTestId('navigation-menu-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('navigation-menu-item')).toHaveLength(2);
    expect(screen.getByTestId('navigation-menu-trigger')).toHaveTextContent(
      'Item 1'
    );
    expect(screen.getByTestId('navigation-menu-content')).toBeInTheDocument();
    expect(screen.getAllByTestId('navigation-menu-link')).toHaveLength(3);
    expect(screen.getByTestId('navigation-menu-indicator')).toBeInTheDocument();
    expect(screen.getByTestId('navigation-menu-viewport')).toBeInTheDocument();
  });
});
