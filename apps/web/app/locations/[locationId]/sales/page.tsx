'use client';

import { FC } from 'react';

interface SalesListPageProps {}

const SalesListPage: FC<SalesListPageProps> = () => {
  return (
    <div data-testid="sales-list-page">
      <h1 data-testid="sales-list-title">SalesList Page</h1>
      <main data-testid="sales-list-content">
        {/* Add your page content here */}
      </main>
    </div>
  );
};

export default SalesListPage; 