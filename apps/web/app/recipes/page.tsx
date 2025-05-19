'use client';

import { FC } from 'react';

interface RecipesListPageProps {}

const RecipesListPage: FC<RecipesListPageProps> = () => {
  return (
    <div data-testid="recipes-list-page">
      <h1 data-testid="recipes-list-title">RecipesList Page</h1>
      <main data-testid="recipes-list-content">
        {/* Add your page content here */}
      </main>
    </div>
  );
};

export default RecipesListPage; 