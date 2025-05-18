import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./index";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "password", "email", "number", "search", "tel", "url", "file"],
      description: "The type of input to display",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the input is disabled",
    },
    placeholder: {
      control: { type: "text" },
      description: "Text to display when the input is empty",
    },
    value: {
      control: { type: "text" },
      description: "The value of the input",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text here...",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter your email...",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter your password...",
  },
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Enter a number...",
  },
};

export const WithValue: Story = {
  args: {
    value: "This is a pre-filled value",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="input-with-label" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Email
      </label>
      <Input id="input-with-label" type="email" placeholder="Email" {...args} />
    </div>
  ),
};

export const WithText: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="input-with-text" className="text-sm font-medium leading-none">
        Email
      </label>
      <Input id="input-with-text" type="email" placeholder="Email" {...args} />
      <p className="text-sm text-muted-foreground">Enter your email address.</p>
    </div>
  ),
};

export const File: Story = {
  args: {
    type: "file",
  },
};

export const WithIcon: Story = {
  render: (args) => (
    <div className="relative w-full max-w-sm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <Input 
        className="pl-10" 
        placeholder="Search..." 
        {...args} 
      />
    </div>
  ),
};