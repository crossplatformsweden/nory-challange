'use client';

import { FC } from 'react';

interface IngredientsListPageProps {}

const IngredientsListPage: FC<IngredientsListPageProps> = () => {
  return (
    <div data-testid="ingredients-list-page">
      <h1 data-testid="ingredients-list-title">IngredientsList Page</h1>
      <main data-testid="ingredients-list-content">
        {/* Add your page content here */}
      </main>
    </div>
  );
};

export default IngredientsListPage; 