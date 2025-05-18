import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names using clsx and optimizes them with tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Type-safe object.keys with proper typing
 */
export const objectKeys = <T extends Record<string, unknown>>(obj: T) => {
  return Object.keys(obj) as Array<keyof T>;
};

/**
 * Creates a delay utility for animations and transitions
 */
export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generates a unique ID with an optional prefix
 */
export function generateId(prefix = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}