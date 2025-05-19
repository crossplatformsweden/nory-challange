'use client';

import { FC } from 'react';

interface NewSalePageProps {}

const NewSalePage: FC<NewSalePageProps> = () => {
  return (
    <div data-testid="new-sale-page">
      <h1 data-testid="new-sale-title">NewSale Page</h1>
      <main data-testid="new-sale-content">
        {/* Add your page content here */}
      </main>
    </div>
  );
};

export default NewSalePage; 