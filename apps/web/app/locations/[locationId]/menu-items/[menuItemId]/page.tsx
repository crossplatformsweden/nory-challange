'use client';

import { FC } from 'react';

interface MenuItemDetailPageProps {}

const MenuItemDetailPage: FC<MenuItemDetailPageProps> = () => {
  return (
    <div data-testid="menu-item-detail-page">
      <h1 data-testid="menu-item-detail-title">MenuItemDetail Page</h1>
      <main data-testid="menu-item-detail-content">
        {/* Add your page content here */}
      </main>
    </div>
  );
};

export default MenuItemDetailPage; 