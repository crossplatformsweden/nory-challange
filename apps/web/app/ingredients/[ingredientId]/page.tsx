'use client';

import { FC } from 'react';

interface IngredientDetailPageProps {}

const IngredientDetailPage: FC<IngredientDetailPageProps> = () => {
  return (
    <div data-testid="ingredient-detail-page">
      <h1 data-testid="ingredient-detail-title">IngredientDetail Page</h1>
      <main data-testid="ingredient-detail-content">
        {/* Add your page content here */}
      </main>
    </div>
  );
};

export default IngredientDetailPage; 