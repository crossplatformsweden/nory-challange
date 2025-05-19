'use client';

import { FC } from 'react';

interface MenuItemsListPageProps {}

const MenuItemsListPage: FC<MenuItemsListPageProps> = () => {
  return (
    <div data-testid="menu-items-list-page">
      <h1 data-testid="menu-items-list-title">MenuItemsList Page</h1>
      <main data-testid="menu-items-list-content">
        {/* Add your page content here */}
      </main>
    </div>
  );
};

export default MenuItemsListPage; 