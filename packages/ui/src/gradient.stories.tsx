import type { Meta, StoryObj } from '@storybook/react';
import { Gradient } from './gradient';

const meta = {
  title: 'UI/Gradient',
  component: Gradient,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: '300px', height: '300px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Gradient>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    conic: true,
    small: false,
    className: '',
  },
};

export const Small: Story = {
  args: {
    conic: true,
    small: true,
    className: '',
  },
};

export const CustomClass: Story = {
  args: {
    conic: true,
    small: false,
    className: 'opacity-50',
  },
};