import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './index';

// Mock Radix UI Collapsible
jest.mock('@radix-ui/react-collapsible', () => {
  const React = require('react');
  
  const CollapsibleContext = React.createContext({ open: false, onOpenChange: () => {} });
  
  const Root = ({ children, open, defaultOpen = false, onOpenChange, ...props }) => {
    const [isOpen, setIsOpen] = React.useState(open !== undefined ? open : defaultOpen);
    
    React.useEffect(() => {
      if (open !== undefined) {
        setIsOpen(open);
      }
    }, [open]);
    
    const handleOpenChange = (value) => {
      setIsOpen(value);
      onOpenChange?.(value);
    };
    
    return (
      <CollapsibleContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
        <div data-state={isOpen ? 'open' : 'closed'} data-testid="collapsible-root" {...props}>
          {children}
        </div>
      </CollapsibleContext.Provider>
    );
  };
  
  const CollapsibleTrigger = React.forwardRef(({ children, ...props }, ref) => {
    const { open, onOpenChange } = React.useContext(CollapsibleContext);
    
    return (
      <button 
        ref={ref} 
        data-testid="collapsible-trigger"
        data-state={open ? 'open' : 'closed'}
        onClick={() => onOpenChange(!open)}
        {...props}
      >
        {children}
      </button>
    );
  });
  
  const CollapsibleContent = React.forwardRef(({ children, ...props }, ref) => {
    const { open } = React.useContext(CollapsibleContext);
    
    if (!open) {
      return null;
    }
    
    return (
      <div 
        ref={ref} 
        data-testid="collapsible-content"
        data-state={open ? 'open' : 'closed'}
        {...props}
      >
        {children}
      </div>
    );
  });
  
  return {
    Root,
    CollapsibleTrigger,
    CollapsibleContent,
  };
});

describe('Collapsible', () => {
  it('renders closed by default', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );

    // Trigger should be visible
    const trigger = screen.getByTestId('collapsible-trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Toggle');
    expect(trigger).toHaveAttribute('data-state', 'closed');

    // Content should not be visible
    const content = screen.queryByTestId('collapsible-content');
    expect(content).not.toBeInTheDocument();
  });

  it('renders open when defaultOpen is true', () => {
    render(
      <Collapsible defaultOpen={true}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );

    // Trigger should be visible and in open state
    const trigger = screen.getByTestId('collapsible-trigger');
    expect(trigger).toHaveAttribute('data-state', 'open');

    // Content should be visible
    const content = screen.getByTestId('collapsible-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Content');
  });

  it('toggles open state when the trigger is clicked', async () => {
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );

    const trigger = screen.getByTestId('collapsible-trigger');

    // Initial state - closed
    expect(trigger).toHaveAttribute('data-state', 'closed');
    expect(screen.queryByTestId('collapsible-content')).not.toBeInTheDocument();

    // Click to open
    const user = userEvent.setup();
    await user.click(trigger);

    // Check open state
    expect(trigger).toHaveAttribute('data-state', 'open');
    expect(screen.getByTestId('collapsible-content')).toBeInTheDocument();
    expect(screen.getByTestId('collapsible-content')).toHaveTextContent('Content');

    // Click to close
    await user.click(trigger);

    // Check closed state
    expect(trigger).toHaveAttribute('data-state', 'closed');
    expect(screen.queryByTestId('collapsible-content')).not.toBeInTheDocument();
  });

  it('calls onOpenChange when state changes', async () => {
    const onOpenChangeMock = jest.fn();

    render(
      <Collapsible onOpenChange={onOpenChangeMock}>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Content</CollapsibleContent>
      </Collapsible>
    );

    const trigger = screen.getByTestId('collapsible-trigger');

    // Click to open
    const user = userEvent.setup();
    await user.click(trigger);

    // Check onOpenChange was called with true
    expect(onOpenChangeMock).toHaveBeenCalledWith(true);

    // Click to close
    await user.click(trigger);

    // Check onOpenChange was called with false
    expect(onOpenChangeMock).toHaveBeenCalledWith(false);
  });

  it('controlled component works properly', async () => {
    const TestComponent = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <div>
          <button data-testid="external-control" onClick={() => setOpen(!open)}>
            External Control
          </button>
          <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger>Toggle</CollapsibleTrigger>
            <CollapsibleContent>Content</CollapsibleContent>
          </Collapsible>
        </div>
      );
    };

    render(<TestComponent />);

    const externalControl = screen.getByTestId('external-control');
    const trigger = screen.getByTestId('collapsible-trigger');

    // Initial state - closed
    expect(trigger).toHaveAttribute('data-state', 'closed');
    expect(screen.queryByTestId('collapsible-content')).not.toBeInTheDocument();

    // Click external control to open
    const user = userEvent.setup();
    await user.click(externalControl);

    // Check open state
    expect(trigger).toHaveAttribute('data-state', 'open');
    expect(screen.getByTestId('collapsible-content')).toBeInTheDocument();

    // Click trigger to close
    await user.click(trigger);

    // Check closed state
    expect(trigger).toHaveAttribute('data-state', 'closed');
    expect(screen.queryByTestId('collapsible-content')).not.toBeInTheDocument();
  });
});