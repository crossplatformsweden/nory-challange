import { HTMLAttributes, ReactNode } from 'react';

/**
 * Common interface for DOM events with an additional data payload
 */
export interface CustomEvent<T = unknown> extends HTMLAttributes<HTMLElement> {
  data?: T;
}

/**
 * Base component props with common properties
 */
export interface BaseProps {
  /** The component's children */
  children?: ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
  /** Unique identifier for the component */
  id?: string;
  /** Additional data attributes */
  [key: `data-${string}`]: string | undefined;
}

/**
 * Component sizes
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Component variants
 */
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger';

/**
 * Status states for form elements and notifications
 */
export type Status = 'default' | 'error' | 'success' | 'warning' | 'info';

/**
 * Possible positions for tooltips, popovers, etc.
 */
export type Placement = 
  | 'top'
  | 'top-start' 
  | 'top-end' 
  | 'right' 
  | 'right-start' 
  | 'right-end' 
  | 'bottom' 
  | 'bottom-start' 
  | 'bottom-end' 
  | 'left' 
  | 'left-start' 
  | 'left-end';