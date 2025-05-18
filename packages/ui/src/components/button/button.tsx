import React from 'react';
import { cn } from '../../utils';
import { type BaseProps, type Size, type Variant } from '../../types';
import { cva, type VariantProps } from 'class-variance-authority';
import { useButton } from '@react-aria/button';
import { useObjectRef } from '@react-aria/utils';
import type { AriaButtonProps } from '@react-types/button';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700',
        secondary: 'bg-teal-500 text-white hover:bg-teal-600 active:bg-teal-700',
        outline: 'border border-blue-200 bg-transparent text-blue-600 hover:bg-blue-50 active:bg-blue-100',
        ghost: 'bg-transparent text-blue-600 hover:bg-blue-50 active:bg-blue-100',
        link: 'bg-transparent text-blue-600 hover:underline underline-offset-4',
        danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
      },
      size: {
        xs: 'h-7 px-2 text-xs',
        sm: 'h-9 px-3',
        md: 'h-10 px-4',
        lg: 'h-11 px-6',
        xl: 'h-12 px-8',
      },
      fullWidth: {
        true: 'w-full',
      },
      isLoading: {
        true: 'relative text-transparent transition-none hover:text-transparent',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends BaseProps,
    VariantProps<typeof buttonVariants>,
    Omit<AriaButtonProps<'button'>, 'size'> {
  /** The button's visual variant */
  variant?: Variant;
  /** The button's size */
  size?: Size;
  /** Whether the button should take up the full width */
  fullWidth?: boolean;
  /** Whether the button shows a loading spinner */
  isLoading?: boolean;
  /** Icon to display at the start of the button */
  startIcon?: React.ReactNode;
  /** Icon to display at the end of the button */
  endIcon?: React.ReactNode;
  /** Whether the button is disabled */
  disabled?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth,
      isLoading,
      startIcon,
      endIcon,
      className,
      children,
      disabled,
      ...props
    },
    forwardedRef
  ) => {
    const ref = useObjectRef(forwardedRef);
    const isDisabled = disabled || isLoading;
    
    const { buttonProps } = useButton(
      {
        ...props,
        isDisabled,
        elementType: 'button',
      } as AriaButtonProps<'button'>,
      ref
    );
    
    return (
      <button
        ref={ref}
        {...buttonProps}
        className={cn(buttonVariants({ variant, size, fullWidth, isLoading }), className)}
      >
        {isLoading && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg
              className="animate-spin h-5 w-5 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
        {startIcon && <span className={cn('mr-2', isLoading && 'opacity-0')}>{startIcon}</span>}
        <span className={isLoading ? 'opacity-0' : ''}>{children}</span>
        {endIcon && <span className={cn('ml-2', isLoading && 'opacity-0')}>{endIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';