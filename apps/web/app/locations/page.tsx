'use client';

import { FC } from 'react';

interface LocationsPageProps {}

const LocationsPage: FC<LocationsPageProps> = () => {
  return (
    <div data-testid="locations-page">
      <h1 data-testid="locations-title">Locations Page</h1>
      <main data-testid="locations-content">
        {/* Add your page content here */}
      </main>
    </div>
  );
};

export default LocationsPage; 