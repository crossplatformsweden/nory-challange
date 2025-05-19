'use client';

import { FC } from 'react';

interface CreateLocationPageProps {}

const CreateLocationPage: FC<CreateLocationPageProps> = () => {
  return (
    <div data-testid="create-location-page">
      <h1 data-testid="create-location-title">CreateLocation Page</h1>
      <main data-testid="create-location-content">
        {/* Add your page content here */}
      </main>
    </div>
  );
};

export default CreateLocationPage; 