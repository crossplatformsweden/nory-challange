'use client';

import { FC } from 'react';

interface StaffDetailPageProps {}

const StaffDetailPage: FC<StaffDetailPageProps> = () => {
  return (
    <div data-testid="staff-detail-page">
      <h1 data-testid="staff-detail-title">StaffDetail Page</h1>
      <main data-testid="staff-detail-content">
        {/* Add your page content here */}
      </main>
    </div>
  );
};

export default StaffDetailPage; 