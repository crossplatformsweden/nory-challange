import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './index';

// Mock @radix-ui/react-dialog
jest.mock('@radix-ui/react-dialog', () => {
  const React = require('react');
  
  const DialogContext = React.createContext({ open: false, onOpenChange: () => {} });
  
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
      <DialogContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
        {children}
      </DialogContext.Provider>
    );
  };
  
  const Trigger = React.forwardRef(({ children, ...props }, ref) => {
    const { onOpenChange } = React.useContext(DialogContext);
    
    return (
      <button
        type="button"
        ref={ref}
        data-testid="dialog-trigger"
        onClick={() => onOpenChange(true)}
        {...props}
      >
        {children}
      </button>
    );
  });
  
  const Portal = ({ children }) => <div data-testid="dialog-portal">{children}</div>;
  
  const Overlay = React.forwardRef(({ children, className, ...props }, ref) => (
    <div ref={ref} data-testid="dialog-overlay" className={className} {...props} />
  ));
  
  const Content = React.forwardRef(({ children, className, ...props }, ref) => {
    const { open } = React.useContext(DialogContext);
    
    if (!open) return null;
    
    return (
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        data-testid="dialog-content"
        data-state={open ? 'open' : 'closed'}
        className={className}
        {...props}
      >
        {children}
      </div>
    );
  });
  
  const Close = React.forwardRef(({ children, ...props }, ref) => {
    const { onOpenChange } = React.useContext(DialogContext);
    
    return (
      <button
        type="button"
        ref={ref}
        data-testid="dialog-close"
        onClick={() => onOpenChange(false)}
        {...props}
      >
        {children}
      </button>
    );
  });
  
  const Title = React.forwardRef(({ children, className, ...props }, ref) => (
    <h2 ref={ref} data-testid="dialog-title" className={className} {...props}>
      {children}
    </h2>
  ));
  
  const Description = React.forwardRef(({ children, className, ...props }, ref) => (
    <p ref={ref} data-testid="dialog-description" className={className} {...props}>
      {children}
    </p>
  ));
  
  return {
    Root,
    Trigger,
    Portal,
    Overlay,
    Content,
    Close,
    Title,
    Description,
  };
});

describe('Dialog', () => {
  it('renders dialog with trigger button', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>Dialog Content</DialogContent>
      </Dialog>
    );
    
    // Initially, the dialog should not be visible
    const trigger = screen.getByTestId('dialog-trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Open Dialog');
    
    // Content should not be in the document initially
    expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument();
  });

  it('opens dialog when trigger is clicked', async () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>Dialog Content</DialogContent>
      </Dialog>
    );
    
    const trigger = screen.getByTestId('dialog-trigger');
    
    // Click to open dialog
    const user = userEvent.setup();
    await user.click(trigger);
    
    // Content should now be visible
    const content = screen.getByTestId('dialog-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Dialog Content');
    expect(content).toHaveAttribute('data-state', 'open');
    expect(content).toHaveAttribute('aria-modal', 'true');
    
    // Portal and overlay should be rendered
    expect(screen.getByTestId('dialog-portal')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-overlay')).toBeInTheDocument();
  });

  it('closes dialog when close button is clicked', async () => {
    render(
      <Dialog defaultOpen>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          Dialog Content
          <DialogClose>Close</DialogClose>
        </DialogContent>
      </Dialog>
    );
    
    // Dialog should be open initially due to defaultOpen
    expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
    
    // Click close button
    const closeButton = screen.getByTestId('dialog-close');
    
    const user = userEvent.setup();
    await user.click(closeButton);
    
    // Content should be removed from DOM
    expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument();
  });

  it('renders dialog components with proper structure', () => {
    render(
      <Dialog defaultOpen>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>This is a dialog description</DialogDescription>
          </DialogHeader>
          <div>Some content</div>
          <DialogFooter>
            <button>Cancel</button>
            <button>Save</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
    
    // Check title and description
    const title = screen.getByTestId('dialog-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Dialog Title');
    expect(title).toHaveClass('text-lg font-semibold leading-none tracking-tight');
    
    const description = screen.getByTestId('dialog-description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent('This is a dialog description');
    expect(description).toHaveClass('text-sm text-muted-foreground');
    
    // Check header and footer
    const header = title.closest('div');
    expect(header).toHaveClass('flex flex-col space-y-1.5 text-center sm:text-left');
    
    const footer = screen.getByText('Cancel').closest('div');
    expect(footer).toHaveClass('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2');
    
    // Check content has close button with X icon
    const closeIcon = screen.getByText('Close').closest('button');
    expect(closeIcon).toBeInTheDocument();
  });

  it('applies custom classes to components', () => {
    render(
      <Dialog defaultOpen>
        <DialogTrigger className="custom-trigger">Open Dialog</DialogTrigger>
        <DialogContent className="custom-content">
          <DialogHeader className="custom-header">
            <DialogTitle className="custom-title">Dialog Title</DialogTitle>
            <DialogDescription className="custom-description">Description</DialogDescription>
          </DialogHeader>
          <DialogFooter className="custom-footer">
            <button>Action</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
    
    // Check custom classes
    expect(screen.getByTestId('dialog-trigger')).toHaveClass('custom-trigger');
    expect(screen.getByTestId('dialog-content')).toHaveClass('custom-content');
    expect(screen.getByTestId('dialog-title')).toHaveClass('custom-title');
    expect(screen.getByTestId('dialog-description')).toHaveClass('custom-description');
    
    // Check header and footer
    const header = screen.getByTestId('dialog-title').closest('div');
    expect(header).toHaveClass('custom-header');
    
    const footer = screen.getByText('Action').closest('div');
    expect(footer).toHaveClass('custom-footer');
  });

  it('supports controlled state', async () => {
    const onOpenChangeMock = jest.fn();
    
    const { rerender } = render(
      <Dialog open={false} onOpenChange={onOpenChangeMock}>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>Dialog Content</DialogContent>
      </Dialog>
    );
    
    // Initially closed
    expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument();
    
    // Click trigger to open
    const user = userEvent.setup();
    await user.click(screen.getByTestId('dialog-trigger'));
    
    // onOpenChange should be called with true
    expect(onOpenChangeMock).toHaveBeenCalledWith(true);
    
    // Rerender with open=true
    rerender(
      <Dialog open={true} onOpenChange={onOpenChangeMock}>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>Dialog Content</DialogContent>
      </Dialog>
    );
    
    // Dialog should now be open
    expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
  });
});