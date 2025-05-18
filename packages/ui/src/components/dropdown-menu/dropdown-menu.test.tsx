import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
} from './index';

// Mock @radix-ui/react-dropdown-menu
jest.mock('@radix-ui/react-dropdown-menu', () => {
  const React = require('react');
  
  const DropdownMenuContext = React.createContext({
    open: false,
    onOpenChange: () => {},
  });
  
  const SubMenuContext = React.createContext({
    open: false,
    onOpenChange: () => {},
  });
  
  const Root = ({ children, open, onOpenChange }) => {
    const [isOpen, setIsOpen] = React.useState(open || false);
    
    React.useEffect(() => {
      if (open !== undefined) {
        setIsOpen(open);
      }
    }, [open]);
    
    const handleOpenChange = (newOpen) => {
      setIsOpen(newOpen);
      onOpenChange?.(newOpen);
    };
    
    return (
      <DropdownMenuContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
        <div data-testid="dropdown-menu-root">{children}</div>
      </DropdownMenuContext.Provider>
    );
  };
  
  const Trigger = React.forwardRef(({ children, ...props }, ref) => {
    const { onOpenChange } = React.useContext(DropdownMenuContext);
    
    return (
      <button
        ref={ref}
        type="button"
        data-testid="dropdown-menu-trigger"
        onClick={() => onOpenChange(true)}
        {...props}
      >
        {children}
      </button>
    );
  });
  
  const Portal = ({ children }) => <div data-testid="dropdown-menu-portal">{children}</div>;
  
  const Content = React.forwardRef(({ children, className, ...props }, ref) => {
    const { open } = React.useContext(DropdownMenuContext);
    
    if (!open) return null;
    
    return (
      <div
        ref={ref}
        role="menu"
        data-testid="dropdown-menu-content"
        data-state={open ? 'open' : 'closed'}
        className={className}
        {...props}
      >
        {children}
      </div>
    );
  });
  
  const Item = React.forwardRef(({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      role="menuitem"
      data-testid="dropdown-menu-item"
      className={className}
      {...props}
    >
      {children}
    </div>
  ));
  
  const CheckboxItem = React.forwardRef(({ children, className, checked, ...props }, ref) => (
    <div
      ref={ref}
      role="menuitemcheckbox"
      aria-checked={checked}
      data-testid="dropdown-menu-checkbox-item"
      className={className}
      {...props}
    >
      {children}
    </div>
  ));
  
  const ItemIndicator = ({ children }) => (
    <div data-testid="dropdown-menu-item-indicator">
      {children}
    </div>
  );
  
  const RadioItem = React.forwardRef(({ children, className, value, ...props }, ref) => (
    <div
      ref={ref}
      role="menuitemradio"
      data-testid="dropdown-menu-radio-item"
      data-value={value}
      className={className}
      {...props}
    >
      {children}
    </div>
  ));
  
  const RadioGroup = ({ children, value, onValueChange, ...props }) => {
    return (
      <div 
        role="group" 
        data-testid="dropdown-menu-radio-group"
        data-value={value}
        {...props}
      >
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              onClick: () => onValueChange?.(child.props.value),
            });
          }
          return child;
        })}
      </div>
    );
  };
  
  const Label = React.forwardRef(({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      data-testid="dropdown-menu-label"
      className={className}
      {...props}
    >
      {children}
    </div>
  ));
  
  const Separator = React.forwardRef(({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      data-testid="dropdown-menu-separator"
      className={className}
      {...props}
    />
  ));
  
  const Sub = ({ children }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    const handleOpenChange = (open) => {
      setIsOpen(open);
    };
    
    return (
      <SubMenuContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
        <div data-testid="dropdown-menu-sub">{children}</div>
      </SubMenuContext.Provider>
    );
  };
  
  const SubTrigger = React.forwardRef(({ children, className, ...props }, ref) => {
    const { onOpenChange } = React.useContext(SubMenuContext);
    
    return (
      <div
        ref={ref}
        role="menuitem"
        aria-haspopup="menu"
        data-testid="dropdown-menu-sub-trigger"
        className={className}
        onClick={() => onOpenChange(true)}
        {...props}
      >
        {children}
      </div>
    );
  });
  
  const SubContent = React.forwardRef(({ children, className, ...props }, ref) => {
    const { open } = React.useContext(SubMenuContext);
    
    if (!open) return null;
    
    return (
      <div
        ref={ref}
        role="menu"
        data-testid="dropdown-menu-sub-content"
        data-state={open ? 'open' : 'closed'}
        className={className}
        {...props}
      >
        {children}
      </div>
    );
  });
  
  const Group = React.forwardRef(({ children, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      data-testid="dropdown-menu-group"
      {...props}
    >
      {children}
    </div>
  ));
  
  return {
    Root,
    Trigger,
    Portal,
    Content,
    Item,
    CheckboxItem,
    ItemIndicator,
    RadioItem,
    RadioGroup,
    Label,
    Separator,
    Sub,
    SubTrigger,
    SubContent,
    Group,
  };
});

describe('DropdownMenu', () => {
  it('renders dropdown with trigger button', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    // Trigger should be visible
    const trigger = screen.getByTestId('dropdown-menu-trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Open Menu');
    
    // Content should not be visible initially
    expect(screen.queryByTestId('dropdown-menu-content')).not.toBeInTheDocument();
  });

  it('opens dropdown when trigger is clicked', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    const trigger = screen.getByTestId('dropdown-menu-trigger');
    
    // Click to open dropdown
    const user = userEvent.setup();
    await user.click(trigger);
    
    // Content should now be visible
    const content = screen.getByTestId('dropdown-menu-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute('data-state', 'open');
    
    // Check if menu items are rendered
    const items = screen.getAllByTestId('dropdown-menu-item');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Item 1');
    expect(items[1]).toHaveTextContent('Item 2');
  });

  it('renders checkbox items correctly', async () => {
    const onCheckedChange = jest.fn();
    
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked={true} onCheckedChange={onCheckedChange}>
            Option 1
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={false} onCheckedChange={onCheckedChange}>
            Option 2
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    const checkboxItems = screen.getAllByTestId('dropdown-menu-checkbox-item');
    expect(checkboxItems).toHaveLength(2);
    
    // First item should be checked
    expect(checkboxItems[0]).toHaveAttribute('aria-checked', 'true');
    expect(checkboxItems[0]).toHaveTextContent('Option 1');
    
    // Second item should not be checked
    expect(checkboxItems[1]).toHaveAttribute('aria-checked', 'false');
    expect(checkboxItems[1]).toHaveTextContent('Option 2');
    
    // Check for indicator
    const indicators = screen.getAllByTestId('dropdown-menu-item-indicator');
    expect(indicators.length).toBeGreaterThan(0);
  });

  it('renders radio items correctly', async () => {
    const onValueChange = jest.fn();
    
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="option1" onValueChange={onValueChange}>
            <DropdownMenuRadioItem value="option1">Option 1</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="option2">Option 2</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    // Radio group should be present
    const radioGroup = screen.getByTestId('dropdown-menu-radio-group');
    expect(radioGroup).toBeInTheDocument();
    expect(radioGroup).toHaveAttribute('data-value', 'option1');
    
    // Radio items should be present
    const radioItems = screen.getAllByTestId('dropdown-menu-radio-item');
    expect(radioItems).toHaveLength(2);
    expect(radioItems[0]).toHaveTextContent('Option 1');
    expect(radioItems[0]).toHaveAttribute('data-value', 'option1');
    expect(radioItems[1]).toHaveTextContent('Option 2');
    expect(radioItems[1]).toHaveAttribute('data-value', 'option2');
  });

  it('renders submenu structure', async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Sub Menu</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
              <DropdownMenuItem>Sub Item 2</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    // Content and sub menu should be present
    const content = screen.getByTestId('dropdown-menu-content');
    expect(content).toBeInTheDocument();
    
    const subMenu = screen.getByTestId('dropdown-menu-sub');
    expect(subMenu).toBeInTheDocument();
    
    // Sub trigger should be present
    const subTrigger = screen.getByTestId('dropdown-menu-sub-trigger');
    expect(subTrigger).toBeInTheDocument();
    expect(subTrigger).toHaveTextContent('Sub Menu');
    expect(subTrigger).toHaveAttribute('aria-haspopup', 'menu');
    
    // Sub content should not be visible initially
    expect(screen.queryByTestId('dropdown-menu-sub-content')).not.toBeInTheDocument();
    
    // Click sub trigger to open sub menu
    const user = userEvent.setup();
    await user.click(subTrigger);
    
    // Sub content should now be visible
    const subContent = screen.getByTestId('dropdown-menu-sub-content');
    expect(subContent).toBeInTheDocument();
    expect(subContent).toHaveAttribute('data-state', 'open');
    
    // Check sub menu items
    const items = screen.getAllByTestId('dropdown-menu-item');
    expect(items.length).toBeGreaterThanOrEqual(3); // 1 main item + 2 sub items
    
    // Check that sub menu items are present
    expect(screen.getByText('Sub Item 1')).toBeInTheDocument();
    expect(screen.getByText('Sub Item 2')).toBeInTheDocument();
  });

  it('renders separators and labels', () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Section 1</DropdownMenuLabel>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Section 2</DropdownMenuLabel>
          <DropdownMenuItem>Item 3</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    // Labels should be present
    const labels = screen.getAllByTestId('dropdown-menu-label');
    expect(labels).toHaveLength(2);
    expect(labels[0]).toHaveTextContent('Section 1');
    expect(labels[1]).toHaveTextContent('Section 2');
    
    // Separator should be present
    const separator = screen.getByTestId('dropdown-menu-separator');
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute('role', 'separator');
  });

  it('renders shortcuts', () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            Copy
            <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Paste
            <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    const shortcuts = screen.getAllByText(/⌘[CV]/);
    expect(shortcuts).toHaveLength(2);
    expect(shortcuts[0]).toHaveTextContent('⌘C');
    expect(shortcuts[1]).toHaveTextContent('⌘V');
    
    // Should have proper class for styling
    expect(shortcuts[0]).toHaveClass('ml-auto', 'text-xs', 'tracking-widest');
  });

  it('applies custom classes to components', () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger className="custom-trigger">
          Open Menu
        </DropdownMenuTrigger>
        <DropdownMenuContent className="custom-content">
          <DropdownMenuItem className="custom-item">
            Item with custom class
          </DropdownMenuItem>
          <DropdownMenuSeparator className="custom-separator" />
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    expect(screen.getByTestId('dropdown-menu-trigger')).toHaveClass('custom-trigger');
    expect(screen.getByTestId('dropdown-menu-content')).toHaveClass('custom-content');
    expect(screen.getByTestId('dropdown-menu-item')).toHaveClass('custom-item');
    expect(screen.getByTestId('dropdown-menu-separator')).toHaveClass('custom-separator');
  });

  it('handles inset prop correctly', () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem inset>Inset Item</DropdownMenuItem>
          <DropdownMenuLabel inset>Inset Label</DropdownMenuLabel>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger inset>Inset Trigger</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Sub Item</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    expect(screen.getByText('Inset Item').closest('[data-testid="dropdown-menu-item"]')).toHaveClass('pl-8');
    expect(screen.getByText('Inset Label').closest('[data-testid="dropdown-menu-label"]')).toHaveClass('pl-8');
    expect(screen.getByText('Inset Trigger').closest('[data-testid="dropdown-menu-sub-trigger"]')).toHaveClass('pl-8');
  });
});