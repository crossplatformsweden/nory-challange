import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Providers } from '../src/providers';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nory Challenge',
  description: 'A modern web application built with Next.js and DaisyUI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${geist.className} bg-base-100 min-h-screen`}>
        <Providers>
          <div className="drawer">
            <input id="main-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
              {/* Navbar */}
              <div className="navbar bg-base-100 shadow-lg">
                <div className="flex-none">
                  <label
                    htmlFor="main-drawer"
                    className="btn btn-square btn-ghost drawer-button lg:hidden"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-5 w-5 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                  </label>
                </div>
                <div className="flex-1">
                  <a className="btn btn-ghost text-xl">Nory Challenge</a>
                </div>
                <div className="flex-none">
                  <button className="btn btn-square btn-ghost">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-5 w-5 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Main content */}
              <main className="flex-1 p-4">{children}</main>

              {/* Footer */}
              <footer className="footer footer-center bg-base-300 text-base-content p-4">
                <div>
                  <p>Copyright © 2024 - All rights reserved</p>
                </div>
              </footer>
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
              <label htmlFor="main-drawer" className="drawer-overlay"></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                <li>
                  <a className="active">Home</a>
                </li>
                <li>
                  <a>Dashboard</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
              </ul>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
