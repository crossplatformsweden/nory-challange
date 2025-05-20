import { render, screen } from '@testing-library/react';
import { Avatar, AvatarImage, AvatarFallback } from './index';

// Mock the Radix UI Avatar component's behavior
// In actual rendering, the AvatarImage onLoadingStatusChange would trigger the fallback display
jest.mock('@radix-ui/react-avatar', () => {
  const React = require('react');
  return {
    Root: React.forwardRef(({ ...props }, ref) => (
      <span ref={ref} role="img" {...props} />
    )),
    Image: React.forwardRef(({ ...props }, ref) => (
      <img ref={ref} {...props} />
    )),
    Fallback: React.forwardRef(({ ...props }, ref) => (
      <span ref={ref} {...props} />
    )),
  };
});

describe('Avatar', () => {
  it('renders with fallback', () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );

    const fallback = screen.getByText('JD');
    expect(fallback).toBeInTheDocument();
  });

  it('renders with image when using mocked components', () => {
    render(
      <Avatar data-testid="avatar-root">
        <AvatarImage
          src="https://example.com/avatar.jpg"
          alt="User Avatar"
          data-testid="avatar-img"
        />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );

    const avatar = screen.getByTestId('avatar-root');
    expect(avatar).toBeInTheDocument();

    const image = screen.getByTestId('avatar-img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    expect(image).toHaveAttribute('alt', 'User Avatar');
  });

  it('applies custom className to Avatar components', () => {
    render(
      <Avatar className="custom-avatar-class" data-testid="avatar-root">
        <AvatarFallback className="custom-fallback-class">JD</AvatarFallback>
      </Avatar>
    );

    const avatar = screen.getByTestId('avatar-root');
    expect(avatar).toHaveClass('custom-avatar-class');

    const fallback = screen.getByText('JD');
    expect(fallback).toHaveClass('custom-fallback-class');
  });

  it('applies standard classes', () => {
    render(
      <Avatar data-testid="avatar-root">
        <AvatarImage
          data-testid="avatar-img"
          src="https://example.com/avatar.jpg"
          alt="User"
        />
        <AvatarFallback data-testid="avatar-fallback">JD</AvatarFallback>
      </Avatar>
    );

    const avatar = screen.getByTestId('avatar-root');
    expect(avatar).toHaveClass(
      'relative',
      'flex',
      'h-10',
      'w-10',
      'shrink-0',
      'overflow-hidden',
      'rounded-full'
    );

    const image = screen.getByTestId('avatar-img');
    expect(image).toHaveClass('aspect-square', 'h-full', 'w-full');

    const fallback = screen.getByTestId('avatar-fallback');
    expect(fallback).toHaveClass(
      'flex',
      'h-full',
      'w-full',
      'items-center',
      'justify-center',
      'rounded-full',
      'bg-muted'
    );
  });
});
