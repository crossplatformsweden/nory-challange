import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./index";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "secondary", "destructive", "outline"],
      description: "The visual style of the badge",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    children: "Destructive",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-1"
        >
          <circle cx="12" cy="12" r="10" />
          <polygon points="10 8 16 12 10 16 10 8" />
        </svg>
        New
      </>
    ),
  },
};

export const Numbers: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      <Badge {...args}>1</Badge>
      <Badge {...args}>25</Badge>
      <Badge {...args}>99+</Badge>
    </div>
  ),
  args: {
    variant: "secondary",
  },
};

export const StatusVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-blue-500 hover:bg-blue-600" {...args}>Info</Badge>
      <Badge className="bg-green-500 hover:bg-green-600" {...args}>Success</Badge>
      <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black" {...args}>Warning</Badge>
      <Badge variant="destructive" {...args}>Error</Badge>
    </div>
  ),
  args: {
    variant: "default",
  },
};