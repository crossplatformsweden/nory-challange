import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from './index';

// Mock vaul
jest.mock('vaul', () => {
  const React = require('react');
  
  const DrawerContext = React.createContext({
    open: false,
    onOpenChange: () => {},
  });
  
  const Root = ({ children, open, onOpenChange, shouldScaleBackground, ...props }) => {
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
      <DrawerContext.Provider
        value={{
          open: isOpen,
          onOpenChange: handleOpenChange,
          shouldScaleBackground,
        }}
      >
        <div data-testid="drawer-root" {...props}>
          {children}
        </div>
      </DrawerContext.Provider>
    );
  };
  
  const Trigger = React.forwardRef(({ children, ...props }, ref) => {
    const { onOpenChange } = React.useContext(DrawerContext);
    
    return (
      <button
        ref={ref}
        type="button"
        data-testid="drawer-trigger"
        onClick={() => onOpenChange(true)}
        {...props}
      >
        {children}
      </button>
    );
  });
  
  const Portal = ({ children }) => <div data-testid="drawer-portal">{children}</div>;
  
  const Close = React.forwardRef(({ children, ...props }, ref) => {
    const { onOpenChange } = React.useContext(DrawerContext);
    
    return (
      <button
        ref={ref}
        type="button"
        data-testid="drawer-close"
        onClick={() => onOpenChange(false)}
        {...props}
      >
        {children}
      </button>
    );
  });
  
  const Overlay = React.forwardRef(({ className, ...props }, ref) => {
    const { open } = React.useContext(DrawerContext);
    
    if (!open) return null;
    
    return (
      <div
        ref={ref}
        data-testid="drawer-overlay"
        className={className}
        {...props}
      />
    );
  });
  
  const Content = React.forwardRef(({ children, className, ...props }, ref) => {
    const { open } = React.useContext(DrawerContext);
    
    if (!open) return null;
    
    return (
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        data-testid="drawer-content"
        data-state={open ? 'open' : 'closed'}
        className={className}
        {...props}
      >
        {children}
      </div>
    );
  });
  
  const Title = React.forwardRef(({ children, className, ...props }, ref) => (
    <h2
      ref={ref}
      data-testid="drawer-title"
      className={className}
      {...props}
    >
      {children}
    </h2>
  ));
  
  const Description = React.forwardRef(({ children, className, ...props }, ref) => (
    <p
      ref={ref}
      data-testid="drawer-description"
      className={className}
      {...props}
    >
      {children}
    </p>
  ));
  
  return {
    Drawer: {
      Root,
      Trigger,
      Portal,
      Overlay,
      Content,
      Close,
      Title,
      Description,
    },
  };
});

describe('Drawer', () => {
  it('renders drawer with trigger button', () => {
    render(
      <Drawer>
        <DrawerTrigger>Open Drawer</DrawerTrigger>
        <DrawerContent>Drawer Content</DrawerContent>
      </Drawer>
    );
    
    // Initially, the drawer should not be visible
    const trigger = screen.getByTestId('drawer-trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Open Drawer');
    
    // Content should not be in the document initially
    expect(screen.queryByTestId('drawer-content')).not.toBeInTheDocument();
  });

  it('opens drawer when trigger is clicked', async () => {
    render(
      <Drawer>
        <DrawerTrigger>Open Drawer</DrawerTrigger>
        <DrawerContent>Drawer Content</DrawerContent>
      </Drawer>
    );
    
    const trigger = screen.getByTestId('drawer-trigger');
    
    // Click to open drawer
    const user = userEvent.setup();
    await user.click(trigger);
    
    // Content should now be visible
    const content = screen.getByTestId('drawer-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Drawer Content');
    expect(content).toHaveAttribute('data-state', 'open');
    expect(content).toHaveAttribute('aria-modal', 'true');
    
    // Portal and overlay should be rendered
    expect(screen.getByTestId('drawer-portal')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-overlay')).toBeInTheDocument();
  });

  it('closes drawer when close button is clicked', async () => {
    render(
      <Drawer open>
        <DrawerTrigger>Open Drawer</DrawerTrigger>
        <DrawerContent>
          Drawer Content
          <DrawerClose>Close</DrawerClose>
        </DrawerContent>
      </Drawer>
    );
    
    // Drawer should be open initially
    expect(screen.getByTestId('drawer-content')).toBeInTheDocument();
    
    // Click close button
    const closeButton = screen.getByTestId('drawer-close');
    
    const user = userEvent.setup();
    await user.click(closeButton);
    
    // Content should be removed from DOM
    expect(screen.queryByTestId('drawer-content')).not.toBeInTheDocument();
  });

  it('renders drawer components with proper structure', () => {
    render(
      <Drawer open>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
            <DrawerDescription>This is a drawer description</DrawerDescription>
          </DrawerHeader>
          <div>Some content</div>
          <DrawerFooter>
            <button>Cancel</button>
            <button>Save</button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
    
    // Check title and description
    const title = screen.getByTestId('drawer-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Drawer Title');
    expect(title).toHaveClass('text-lg font-semibold leading-none tracking-tight');
    
    const description = screen.getByTestId('drawer-description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent('This is a drawer description');
    expect(description).toHaveClass('text-sm text-muted-foreground');
    
    // Check header and footer
    const header = title.closest('div');
    expect(header).toHaveClass('grid gap-1.5 p-4 text-center sm:text-left');
    
    const footer = screen.getByText('Cancel').closest('div');
    expect(footer).toHaveClass('mt-auto flex flex-col gap-2 p-4');
    
    // Check content has drag handle
    const content = screen.getByTestId('drawer-content');
    const dragHandle = content.querySelector('div.h-2.w-\\[100px\\].rounded-full');
    expect(dragHandle).toBeInTheDocument();
  });

  it('applies custom classes to components', () => {
    render(
      <Drawer open>
        <DrawerTrigger className="custom-trigger">Open Drawer</DrawerTrigger>
        <DrawerContent className="custom-content">
          <DrawerHeader className="custom-header">
            <DrawerTitle className="custom-title">Drawer Title</DrawerTitle>
            <DrawerDescription className="custom-description">Description</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="custom-footer">
            <button>Action</button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
    
    // Check custom classes
    expect(screen.getByTestId('drawer-trigger')).toHaveClass('custom-trigger');
    expect(screen.getByTestId('drawer-content')).toHaveClass('custom-content');
    expect(screen.getByTestId('drawer-title')).toHaveClass('custom-title');
    expect(screen.getByTestId('drawer-description')).toHaveClass('custom-description');
    
    // Check header and footer
    const header = screen.getByTestId('drawer-title').closest('div');
    expect(header).toHaveClass('custom-header');
    
    const footer = screen.getByText('Action').closest('div');
    expect(footer).toHaveClass('custom-footer');
  });

  it('renders with shouldScaleBackground prop', () => {
    render(
      <Drawer shouldScaleBackground={true}>
        <DrawerTrigger data-testid="drawer-trigger">Open Drawer</DrawerTrigger>
        <DrawerContent>Drawer Content</DrawerContent>
      </Drawer>
    );
    
    // Just check that the trigger renders
    const trigger = screen.getByTestId('drawer-trigger');
    expect(trigger).toBeInTheDocument();
  });
});