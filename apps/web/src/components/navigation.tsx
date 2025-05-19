'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '../lib/utils';

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  return (
    <div className={cn('navbar bg-base-100', className)}>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link
                href="/locations"
                className={cn({ active: isActive('/locations') })}
              >
                Locations
              </Link>
            </li>
            <li>
              <Link
                href="/ingredients"
                className={cn({ active: isActive('/ingredients') })}
              >
                Ingredients
              </Link>
            </li>
            <li>
              <Link
                href="/recipes"
                className={cn({ active: isActive('/recipes') })}
              >
                Recipes
              </Link>
            </li>
            <li>
              <Link
                href="/modifiers"
                className={cn({ active: isActive('/modifiers') })}
              >
                Modifiers
              </Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          Nory
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              href="/locations"
              className={cn({ active: isActive('/locations') })}
            >
              Locations
            </Link>
          </li>
          <li>
            <Link
              href="/ingredients"
              className={cn({ active: isActive('/ingredients') })}
            >
              Ingredients
            </Link>
          </li>
          <li>
            <Link
              href="/recipes"
              className={cn({ active: isActive('/recipes') })}
            >
              Recipes
            </Link>
          </li>
          <li>
            <Link
              href="/modifiers"
              className={cn({ active: isActive('/modifiers') })}
            >
              Modifiers
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );
}
