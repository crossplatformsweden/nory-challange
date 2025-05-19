'use client';

import { FC } from 'react';

interface IngredientCostsListPageProps {}

const IngredientCostsListPage: FC<IngredientCostsListPageProps> = () => {
  return (
    <div data-testid="ingredient-costs-list-page">
      <h1 data-testid="ingredient-costs-list-title">IngredientCostsList Page</h1>
      <main data-testid="ingredient-costs-list-content">
        {/* Add your page content here */}
      </main>
    </div>
  );
};

export default IngredientCostsListPage; 