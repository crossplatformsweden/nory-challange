'use client';

import { FC } from 'react';

interface IngredientCostDetailPageProps {}

const IngredientCostDetailPage: FC<IngredientCostDetailPageProps> = () => {
  return (
    <div data-testid="ingredient-cost-detail-page">
      <h1 data-testid="ingredient-cost-detail-title">IngredientCostDetail Page</h1>
      <main data-testid="ingredient-cost-detail-content">
        {/* Add your page content here */}
      </main>
    </div>
  );
};

export default IngredientCostDetailPage; 