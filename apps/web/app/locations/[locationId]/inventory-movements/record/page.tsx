'use client';

import { FC } from 'react';

interface RecordInventoryMovementPageProps {}

const RecordInventoryMovementPage: FC<RecordInventoryMovementPageProps> = () => {
  return (
    <div data-testid="record-inventory-movement-page">
      <h1 data-testid="record-inventory-movement-title">RecordInventoryMovement Page</h1>
      <main data-testid="record-inventory-movement-content">
        {/* Add your page content here */}
      </main>
    </div>
  );
};

export default RecordInventoryMovementPage; 