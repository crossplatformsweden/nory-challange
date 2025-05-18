# Component Development Workflow

This document outlines the standard workflow for developing new components in our design system.

## File Structure

Each component should have the following files:

```
src/
├── components/
│   └── [component-name]/
│       ├── index.ts                 # Exports component
│       ├── [component-name].tsx     # Main component implementation
│       ├── [component-name].test.tsx # Jest tests
│       └── [component-name].stories.tsx # Storybook stories
```

## Development Steps

### 1. Implementation

Start by creating the component implementation file:

```tsx
// Button.tsx
import React from 'react';
import { useButton } from '@react-aria/button';
import { useObjectRef } from '@react-aria/utils';
import { cn } from '../../utils';
import { type BaseProps } from '../../types';

export interface ButtonProps extends BaseProps {
  // Define component-specific props here
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, forwardedRef) => {
  const ref = useObjectRef(forwardedRef);
  // Use React Aria hooks for accessibility
  
  // Implement component logic
  
  return (
    <button ref={ref} className={cn('base-styles', props.className)}>
      {props.children}
    </button>
  );
});

Button.displayName = 'Button';
```

### 2. Tests

Create comprehensive tests for your component:

```tsx
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click Me');
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Add more tests for:
  // - Different props combinations
  // - Accessibility
  // - Keyboard navigation
  // - State management
});
```

### 3. Storybook Stories

Create stories for all component variants:

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Define arg types here
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
};

// Add more stories for:
// - All variants
// - All sizes
// - All states
// - Interactive examples
```

### 4. Export

Create an index file to export your component:

```tsx
// index.ts
export * from './Button';
```

## Quality Checklist

Before submitting a component, ensure that:

- [ ] Component is fully typed with TypeScript
- [ ] Component is accessible (React Aria or manual a11y)
- [ ] Component has comprehensive tests (>80% coverage)
- [ ] Component has Storybook stories for all variants
- [ ] Component follows design system guidelines
- [ ] Component handles all required states and interactions
- [ ] Component is responsive
- [ ] Code is clean and well-documented

## Testing

Run tests for your component:

```bash
pnpm test --filter=@repo/ui
```

## Storybook

Preview your component in Storybook:

```bash
pnpm storybook
```

## Building

Build the component library:

```bash
pnpm build --filter=@repo/ui
```