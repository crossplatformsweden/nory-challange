'use client';

import { FC } from 'react';

interface CreateMenuItemPageProps {}

const CreateMenuItemPage: FC<CreateMenuItemPageProps> = () => {
  return (
    <div data-testid="create-menu-item-page">
      <h1 data-testid="create-menu-item-title">CreateMenuItem Page</h1>
      <main data-testid="create-menu-item-content">
        {/* Add your page content here */}
      </main>
    </div>
  );
};

export default CreateMenuItemPage; 