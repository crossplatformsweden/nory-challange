'use client';

import { FC } from 'react';

interface ReportsOverviewPageProps {}

const ReportsOverviewPage: FC<ReportsOverviewPageProps> = () => {
  return (
    <div data-testid="reports-overview-page">
      <h1 data-testid="reports-overview-title">ReportsOverview Page</h1>
      <main data-testid="reports-overview-content">
        {/* Add your page content here */}
      </main>
    </div>
  );
};

export default ReportsOverviewPage; 