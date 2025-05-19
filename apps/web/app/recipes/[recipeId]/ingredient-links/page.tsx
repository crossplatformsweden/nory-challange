'use client';

import { FC } from 'react';

interface RecipeIngredientLinksPageProps {}

const RecipeIngredientLinksPage: FC<RecipeIngredientLinksPageProps> = () => {
  return (
    <div data-testid="recipe-ingredient-links-page">
      <h1 data-testid="recipe-ingredient-links-title">RecipeIngredientLinks Page</h1>
      <main data-testid="recipe-ingredient-links-content">
        {/* Add your page content here */}
      </main>
    </div>
  );
};

export default RecipeIngredientLinksPage; 