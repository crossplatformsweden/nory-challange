'use client';

import { FC } from 'react';

interface StaffListPageProps {}

const StaffListPage: FC<StaffListPageProps> = () => {
  return (
    <div data-testid="staff-list-page">
      <h1 data-testid="staff-list-title">StaffList Page</h1>
      <main data-testid="staff-list-content">
        {/* Add your page content here */}
      </main>
    </div>
  );
};

export default StaffListPage; 