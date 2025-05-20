import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuRadioGroup,
} from './index';

// Mock Radix UI Context Menu
jest.mock('@radix-ui/react-context-menu', () => {
  const Root = ({ children }) => (
    <div data-testid="context-menu-root">{children}</div>
  );

  const Trigger = React.forwardRef(({ children, ...props }, ref) => (
    <div ref={ref} data-testid="context-menu-trigger" {...props}>
      {children}
    </div>
  ));

  const Content = React.forwardRef(({ children, ...props }, ref) => (
    <div ref={ref} data-testid="context-menu-content" {...props}>
      {children}
    </div>
  ));

  const Item = React.forwardRef(({ children, ...props }, ref) => (
    <div ref={ref} data-testid="context-menu-item" role="menuitem" {...props}>
      {children}
    </div>
  ));

  const CheckboxItem = React.forwardRef(
    ({ children, checked, ...props }, ref) => (
      <div
        ref={ref}
        data-testid="context-menu-checkbox-item"
        role="menuitemcheckbox"
        aria-checked={checked}
        {...props}
      >
        {children}
      </div>
    )
  );

  const RadioItem = React.forwardRef(({ children, ...props }, ref) => (
    <div
      ref={ref}
      data-testid="context-menu-radio-item"
      role="menuitemradio"
      {...props}
    >
      {children}
    </div>
  ));

  const ItemIndicator = ({ children }) => (
    <div data-testid="context-menu-item-indicator">{children}</div>
  );

  const Label = React.forwardRef(({ children, ...props }, ref) => (
    <div ref={ref} data-testid="context-menu-label" {...props}>
      {children}
    </div>
  ));

  const Separator = React.forwardRef((props, ref) => (
    <div
      ref={ref}
      data-testid="context-menu-separator"
      role="separator"
      {...props}
    />
  ));

  const Sub = ({ children }) => (
    <div data-testid="context-menu-sub">{children}</div>
  );

  const SubTrigger = React.forwardRef(({ children, ...props }, ref) => (
    <div ref={ref} data-testid="context-menu-sub-trigger" {...props}>
      {children}
    </div>
  ));

  const SubContent = React.forwardRef(({ children, ...props }, ref) => (
    <div ref={ref} data-testid="context-menu-sub-content" {...props}>
      {children}
    </div>
  ));

  const RadioGroup = ({ children, ...props }) => (
    <div data-testid="context-menu-radio-group" role="group" {...props}>
      {children}
    </div>
  );

  const Portal = ({ children }) => (
    <div data-testid="context-menu-portal">{children}</div>
  );

  const Group = ({ children }) => (
    <div data-testid="context-menu-group">{children}</div>
  );

  return {
    Root,
    Trigger,
    Content,
    Item,
    CheckboxItem,
    RadioItem,
    ItemIndicator,
    Label,
    Separator,
    Sub,
    SubTrigger,
    SubContent,
    RadioGroup,
    Portal,
    Group,
  };
});

describe('ContextMenu', () => {
  it('renders basic context menu structure', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click me</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Item 1</ContextMenuItem>
          <ContextMenuItem>Item 2</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );

    // Verify the structure
    expect(screen.getByTestId('context-menu-root')).toBeInTheDocument();
    expect(screen.getByTestId('context-menu-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('context-menu-trigger')).toHaveTextContent(
      'Right click me'
    );
    expect(screen.getByTestId('context-menu-content')).toBeInTheDocument();

    // Check menu items
    const items = screen.getAllByTestId('context-menu-item');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Item 1');
    expect(items[1]).toHaveTextContent('Item 2');
  });

  it('renders checkbox items correctly', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click me</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuCheckboxItem checked={true}>
            Option 1
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem checked={false}>
            Option 2
          </ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
    );

    const checkboxItems = screen.getAllByTestId('context-menu-checkbox-item');
    expect(checkboxItems).toHaveLength(2);
    expect(checkboxItems[0]).toHaveTextContent('Option 1');
    expect(checkboxItems[0]).toHaveAttribute('aria-checked', 'true');
    expect(checkboxItems[1]).toHaveTextContent('Option 2');
    expect(checkboxItems[1]).toHaveAttribute('aria-checked', 'false');
  });

  it('renders radio items correctly', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click me</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuRadioGroup>
            <ContextMenuRadioItem value="option1">
              Option 1
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="option2">
              Option 2
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    );

    expect(screen.getByTestId('context-menu-radio-group')).toBeInTheDocument();
    const radioItems = screen.getAllByTestId('context-menu-radio-item');
    expect(radioItems).toHaveLength(2);
    expect(radioItems[0]).toHaveTextContent('Option 1');
    expect(radioItems[1]).toHaveTextContent('Option 2');
  });

  it('renders submenu structure', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click me</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Item 1</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>More Options</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Sub Item 1</ContextMenuItem>
              <ContextMenuItem>Sub Item 2</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    );

    expect(screen.getByTestId('context-menu-sub')).toBeInTheDocument();
    expect(screen.getByTestId('context-menu-sub-trigger')).toBeInTheDocument();
    expect(screen.getByTestId('context-menu-sub-trigger')).toHaveTextContent(
      'More Options'
    );
    expect(screen.getByTestId('context-menu-sub-content')).toBeInTheDocument();

    const allItems = screen.getAllByTestId('context-menu-item');
    expect(allItems).toHaveLength(3); // 1 main item + 2 sub items
    expect(allItems[1]).toHaveTextContent('Sub Item 1');
    expect(allItems[2]).toHaveTextContent('Sub Item 2');
  });

  it('renders separators and labels', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click me</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>Section 1</ContextMenuLabel>
          <ContextMenuItem>Item 1</ContextMenuItem>
          <ContextMenuItem>Item 2</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuLabel>Section 2</ContextMenuLabel>
          <ContextMenuItem>Item 3</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );

    const labels = screen.getAllByTestId('context-menu-label');
    expect(labels).toHaveLength(2);
    expect(labels[0]).toHaveTextContent('Section 1');
    expect(labels[1]).toHaveTextContent('Section 2');

    expect(screen.getByTestId('context-menu-separator')).toBeInTheDocument();
    expect(screen.getByTestId('context-menu-separator')).toHaveAttribute(
      'role',
      'separator'
    );
  });

  it('renders shortcuts', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click me</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>
            Copy
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Paste
            <ContextMenuShortcut>⌘V</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );

    const shortcuts = screen.getAllByText(/⌘[CV]/);
    expect(shortcuts).toHaveLength(2);
    expect(shortcuts[0]).toHaveTextContent('⌘C');
    expect(shortcuts[1]).toHaveTextContent('⌘V');

    // Check proper styling class
    expect(shortcuts[0]).toHaveClass(
      'ml-auto',
      'text-xs',
      'tracking-widest',
      'text-muted-foreground'
    );
  });

  it('applies custom classes to components', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger className="custom-trigger">
          Right click me
        </ContextMenuTrigger>
        <ContextMenuContent className="custom-content">
          <ContextMenuItem className="custom-item">Item 1</ContextMenuItem>
          <ContextMenuSeparator className="custom-separator" />
          <ContextMenuLabel className="custom-label">Section</ContextMenuLabel>
        </ContextMenuContent>
      </ContextMenu>
    );

    expect(screen.getByTestId('context-menu-trigger')).toHaveClass(
      'custom-trigger'
    );
    expect(screen.getByTestId('context-menu-content')).toHaveClass(
      'custom-content'
    );
    expect(screen.getByTestId('context-menu-item')).toHaveClass('custom-item');
    expect(screen.getByTestId('context-menu-separator')).toHaveClass(
      'custom-separator'
    );
    expect(screen.getByTestId('context-menu-label')).toHaveClass(
      'custom-label'
    );
  });

  it('handles inset prop correctly', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click me</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem inset>Inset Item</ContextMenuItem>
          <ContextMenuLabel inset>Inset Label</ContextMenuLabel>
          <ContextMenuSubTrigger inset>Inset Trigger</ContextMenuSubTrigger>
        </ContextMenuContent>
      </ContextMenu>
    );

    expect(
      screen
        .getByText('Inset Item')
        .closest('[data-testid="context-menu-item"]')
    ).toHaveClass('pl-8');
    expect(
      screen
        .getByText('Inset Label')
        .closest('[data-testid="context-menu-label"]')
    ).toHaveClass('pl-8');
    expect(
      screen
        .getByText('Inset Trigger')
        .closest('[data-testid="context-menu-sub-trigger"]')
    ).toHaveClass('pl-8');
  });
});
