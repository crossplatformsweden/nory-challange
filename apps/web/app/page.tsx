'use client';

import { FC } from 'react';

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  return (
    <div data-testid="home-page">
      <h1 data-testid="home-title">Home Page</h1>
      <main data-testid="home-content">
        {/* Add your page content here */}
      </main>
    </div>
  );
};

export default HomePage; 