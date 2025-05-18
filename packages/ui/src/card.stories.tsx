import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './card.js';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Documentation',
    href: 'https://turbo.build/repo/docs',
    children: 'Click here to read the documentation about Turborepo and how to use it.',
  },
};

export const ShortContent: Story = {
  args: {
    title: 'Templates',
    href: 'https://turbo.build/repo/docs/getting-started/from-example',
    children: 'Discover starter templates.',
  },
};