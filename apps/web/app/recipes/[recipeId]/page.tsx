'use client';

import { FC } from 'react';

interface RecipeDetailPageProps {}

const RecipeDetailPage: FC<RecipeDetailPageProps> = () => {
  return (
    <div data-testid="recipe-detail-page">
      <h1 data-testid="recipe-detail-title">RecipeDetail Page</h1>
      <main data-testid="recipe-detail-content">
        {/* Add your page content here */}
      </main>
    </div>
  );
};

export default RecipeDetailPage; 