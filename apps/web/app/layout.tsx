import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Providers } from '../src/providers/providers';
import { Navigation } from '../src/components/navigation';

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
              {/* Navigation */}
              <Navigation />

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
