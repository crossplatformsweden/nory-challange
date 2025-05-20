import type { Meta, StoryObj } from '@storybook/react';
import { NavigationMenu } from './navigation-menu';

const meta: Meta<typeof NavigationMenu> = {
  title: 'UI/NavigationMenu',
  component: NavigationMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

export const Default: Story = {
  args: {
    items: [
      {
        title: 'Getting Started',
        href: '#',
      },
      {
        title: 'Documentation',
        href: '#',
      },
      {
        title: 'Components',
        href: '#',
      },
    ],
  },
};
