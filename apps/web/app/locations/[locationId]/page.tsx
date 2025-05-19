'use client';

import { FC } from 'react';

interface LocationDetailPageProps {}

const LocationDetailPage: FC<LocationDetailPageProps> = () => {
  return (
    <div data-testid="location-detail-page">
      <h1 data-testid="location-detail-title">LocationDetail Page</h1>
      <main data-testid="location-detail-content">
        {/* Add your page content here */}
      </main>
    </div>
  );
};

export default LocationDetailPage; 