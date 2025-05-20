import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from './index';

// Mock cmdk
jest.mock('cmdk', () => {
  const Command = require('react').forwardRef(
    ({ children, className, ...props }, ref) => (
      <div ref={ref} className={className} data-testid="command" {...props}>
        {children}
      </div>
    )
  );

  Command.Input = require('react').forwardRef(
    ({ className, ...props }, ref) => (
      <input
        ref={ref}
        className={className}
        data-testid="command-input"
        {...props}
      />
    )
  );

  Command.List = require('react').forwardRef(
    ({ children, className, ...props }, ref) => (
      <div
        ref={ref}
        className={className}
        data-testid="command-list"
        {...props}
      >
        {children}
      </div>
    )
  );

  Command.Empty = require('react').forwardRef(
    ({ children, className, ...props }, ref) => (
      <div
        ref={ref}
        className={className}
        data-testid="command-empty"
        {...props}
      >
        {children || 'No results found.'}
      </div>
    )
  );

  Command.Group = require('react').forwardRef(
    ({ children, heading, className, ...props }, ref) => (
      <div
        ref={ref}
        className={className}
        data-testid="command-group"
        {...props}
      >
        {heading && <div cmdk-group-heading="">{heading}</div>}
        {children}
      </div>
    )
  );

  Command.Item = require('react').forwardRef(
    ({ children, className, ...props }, ref) => (
      <div
        ref={ref}
        className={className}
        data-testid="command-item"
        tabIndex={0}
        role="option"
        {...props}
      >
        {children}
      </div>
    )
  );

  Command.Separator = require('react').forwardRef(
    ({ className, ...props }, ref) => (
      <div
        ref={ref}
        className={className}
        data-testid="command-separator"
        {...props}
      />
    )
  );

  return {
    Command,
  };
});

// Mock Dialog components
jest.mock('../../components/dialog', () => {
  const React = require('react');
  return {
    Dialog: ({ children, ...props }) => (
      <div data-testid="dialog" {...props}>
        {children}
      </div>
    ),
    DialogContent: ({ children, className, ...props }) => (
      <div data-testid="dialog-content" className={className} {...props}>
        {children}
      </div>
    ),
  };
});

describe('Command', () => {
  it('renders without crashing', () => {
    render(<Command />);
    expect(screen.getByTestId('command')).toBeInTheDocument();
  });

  it('renders the command component', () => {
    render(<Command />);

    const command = screen.getByTestId('command');
    expect(command).toBeInTheDocument();
    expect(command).toHaveClass(
      'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground'
    );
  });

  it('renders command input with search icon', () => {
    render(
      <Command>
        <CommandInput placeholder="Search..." />
      </Command>
    );

    const input = screen.getByTestId('command-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Search...');

    // Check if there's a search icon (div containing the input)
    const searchContainer = input.parentElement;
    expect(searchContainer).toHaveClass('flex items-center border-b px-3');
  });

  it('renders command list with proper classes', () => {
    render(
      <Command>
        <CommandList />
      </Command>
    );

    const list = screen.getByTestId('command-list');
    expect(list).toBeInTheDocument();
    expect(list).toHaveClass('max-h-[300px] overflow-y-auto overflow-x-hidden');
  });

  it('renders command empty state', () => {
    render(
      <Command>
        <CommandEmpty>No results found</CommandEmpty>
      </Command>
    );

    const empty = screen.getByTestId('command-empty');
    expect(empty).toBeInTheDocument();
    expect(empty).toHaveTextContent('No results found');
    expect(empty).toHaveClass('py-6 text-center text-sm');
  });

  it('renders command group with heading', () => {
    render(
      <Command>
        <CommandGroup heading="Suggestions">
          <CommandItem>Item 1</CommandItem>
        </CommandGroup>
      </Command>
    );

    const group = screen.getByTestId('command-group');
    expect(group).toBeInTheDocument();

    // Check for the heading
    const heading = screen.getByText('Suggestions');
    expect(heading).toBeInTheDocument();

    // Check for items inside group
    const item = screen.getByTestId('command-item');
    expect(item).toBeInTheDocument();
    expect(item).toHaveTextContent('Item 1');
  });

  it('renders command separator', () => {
    render(
      <Command>
        <CommandGroup heading="Group 1">
          <CommandItem>Item 1</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Group 2">
          <CommandItem>Item 2</CommandItem>
        </CommandGroup>
      </Command>
    );

    const separator = screen.getByTestId('command-separator');
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveClass('-mx-1 h-px bg-border');
  });

  it('renders command shortcut', () => {
    render(
      <Command>
        <CommandItem>
          File
          <CommandShortcut>⌘F</CommandShortcut>
        </CommandItem>
      </Command>
    );

    const shortcut = screen.getByText('⌘F');
    expect(shortcut).toBeInTheDocument();
    expect(shortcut).toHaveClass(
      'ml-auto text-xs tracking-widest text-muted-foreground'
    );
  });

  it('passes additional props to components', () => {
    render(
      <Command className="custom-command-class">
        <CommandInput
          className="custom-input-class"
          data-testid="custom-input"
        />
        <CommandList className="custom-list-class" />
      </Command>
    );

    const command = screen.getByTestId('command');
    expect(command).toHaveClass('custom-command-class');

    const input = screen.getByTestId('custom-input');
    expect(input).toHaveClass('custom-input-class');

    const list = screen.getByTestId('command-list');
    expect(list).toHaveClass('custom-list-class');
  });

  it('handles user input', async () => {
    const onChangeMock = jest.fn();

    render(
      <Command>
        <CommandInput onChange={onChangeMock} />
      </Command>
    );

    const input = screen.getByTestId('command-input');

    const user = userEvent.setup();
    await user.type(input, 'test');

    expect(onChangeMock).toHaveBeenCalled();
  });
});
