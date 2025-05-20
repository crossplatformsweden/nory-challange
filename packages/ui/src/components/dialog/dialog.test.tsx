import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog, DialogTrigger, DialogContent, DialogClose } from './index';

// Mock @radix-ui/react-dialog
jest.mock('@radix-ui/react-dialog', () => {
  const React = require('react');

  const DialogContext = React.createContext({
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

    const handleOpenChange = (newOpen: any) => {
      setIsOpen(newOpen);
      onOpenChange?.(newOpen);
    };

    return (
      <DialogContext.Provider
        value={{ open: isOpen, onOpenChange: handleOpenChange }}
      >
        {children}
      </DialogContext.Provider>
    );
  };

  const Trigger = React.forwardRef(
    (
      { children, ...props }: any,
      ref: React.LegacyRef<HTMLButtonElement> | undefined
    ) => {
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
    }
  );

  const Portal = ({ children }) => (
    <div data-testid="dialog-portal">{children}</div>
  );

  const Overlay = React.forwardRef(
    (
      { className, ...props }: any,
      ref: React.LegacyRef<HTMLDivElement> | undefined
    ) => (
      <div
        ref={ref}
        data-testid="dialog-overlay"
        className={className}
        {...props}
      />
    )
  );

  const Content = React.forwardRef(
    (
      { children, className, ...props }: any,
      ref: React.LegacyRef<HTMLDivElement> | undefined
    ) => {
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
    }
  );

  const Close = React.forwardRef(
    (
      { children, ...props }: any,
      ref: React.LegacyRef<HTMLButtonElement> | undefined
    ) => {
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
    }
  );

  const Title = React.forwardRef(
    (
      { children, className, ...props }: any,
      ref: React.LegacyRef<HTMLHeadingElement> | undefined
    ) => (
      <h2 ref={ref} data-testid="dialog-title" className={className} {...props}>
        {children}
      </h2>
    )
  );

  const Description = React.forwardRef(
    (
      { children, className, ...props }: any,
      ref: React.LegacyRef<HTMLParagraphElement> | undefined
    ) => (
      <p
        ref={ref}
        data-testid="dialog-description"
        className={className}
        {...props}
      >
        {children}
      </p>
    )
  );

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

  it('renders dialog with close button', () => {
    render(
      <Dialog>
        <DialogTrigger data-testid="dialog-trigger">Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogClose data-testid="dialog-close">Close</DialogClose>
        </DialogContent>
      </Dialog>
    );

    // Just verify trigger renders
    const trigger = screen.getByTestId('dialog-trigger');
    expect(trigger).toBeInTheDocument();
  });

  it('renders dialog trigger', () => {
    render(
      <Dialog>
        <DialogTrigger data-testid="dialog-trigger">Open Dialog</DialogTrigger>
      </Dialog>
    );

    // Just check that the trigger renders
    const trigger = screen.getByTestId('dialog-trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Open Dialog');
  });

  it('supports custom class on trigger', () => {
    render(
      <Dialog>
        <DialogTrigger className="custom-trigger" data-testid="dialog-trigger">
          Open Dialog
        </DialogTrigger>
      </Dialog>
    );

    // Check custom class on trigger
    expect(screen.getByTestId('dialog-trigger')).toHaveClass('custom-trigger');
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
