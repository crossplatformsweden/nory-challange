import * as React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from './index';

// Mock the portal to render in the document
jest.mock('@radix-ui/react-select', () => {
  const original = jest.requireActual('@radix-ui/react-select');
  return {
    ...original,
    Portal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

describe('Select', () => {
  it('renders select trigger with placeholder', () => {
    render(
      <Select>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    );
    
    const trigger = screen.getByTestId('select-trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Select an option');
  });

  it('renders select with custom className', () => {
    render(
      <Select>
        <SelectTrigger className="custom-trigger" data-testid="select-trigger">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );
    
    const trigger = screen.getByTestId('select-trigger');
    expect(trigger).toHaveClass('custom-trigger');
  });

  it('renders select trigger with ChevronDown icon', () => {
    render(
      <Select>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );
    
    const trigger = screen.getByTestId('select-trigger');
    const icon = trigger.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('renders disabled select', () => {
    render(
      <Select disabled>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );
    
    const trigger = screen.getByTestId('select-trigger');
    expect(trigger).toBeDisabled();
    expect(trigger).toHaveClass('disabled:opacity-50');
    expect(trigger).toHaveClass('disabled:cursor-not-allowed');
  });

  it('renders SelectItem with correct styles', () => {
    render(
      <Select defaultOpen>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1" data-testid="select-item">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );
    
    const item = screen.getByTestId('select-item');
    expect(item).toBeInTheDocument();
    expect(item).toHaveClass('relative');
    expect(item).toHaveClass('flex');
    expect(item).toHaveClass('cursor-default');
    expect(item).toHaveClass('select-none');
  });

  it('renders SelectGroup with items', () => {
    render(
      <Select defaultOpen>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup data-testid="select-group">
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
    
    const group = screen.getByTestId('select-group');
    expect(group).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('renders SelectLabel with correct styles', () => {
    render(
      <Select defaultOpen>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel data-testid="select-label">Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
    
    const label = screen.getByTestId('select-label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('py-1.5');
    expect(label).toHaveClass('pl-8');
    expect(label).toHaveClass('pr-2');
    expect(label).toHaveClass('text-sm');
    expect(label).toHaveClass('font-semibold');
  });

  it('renders SelectSeparator with correct styles', () => {
    render(
      <Select defaultOpen>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectGroup>
          <SelectSeparator data-testid="select-separator" />
          <SelectGroup>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
    
    const separator = screen.getByTestId('select-separator');
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveClass('h-px');
    expect(separator).toHaveClass('bg-muted');
  });

  it('forwards ref to SelectTrigger component', () => {
    const ref = jest.fn();
    render(
      <Select>
        <SelectTrigger ref={ref}>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
        </SelectContent>
      </Select>
    );
    
    expect(ref).toHaveBeenCalled();
  });

  it('forwards ref to SelectItem component', () => {
    const ref = jest.fn();
    render(
      <Select defaultOpen>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1" ref={ref}>Option 1</SelectItem>
        </SelectContent>
      </Select>
    );
    
    expect(ref).toHaveBeenCalled();
  });

  it('renders disabled SelectItem with correct styles', () => {
    render(
      <Select defaultOpen>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1" disabled data-testid="disabled-item">
            Disabled Option
          </SelectItem>
        </SelectContent>
      </Select>
    );
    
    const item = screen.getByTestId('disabled-item');
    expect(item).toHaveAttribute('data-disabled');
    expect(item).toHaveClass('data-[disabled]:opacity-50');
    expect(item).toHaveClass('data-[disabled]:pointer-events-none');
  });
});