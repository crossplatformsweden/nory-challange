import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "./index";
import Image from "next/image";

const meta: Meta<typeof AspectRatio> = {
  title: "Components/AspectRatio",
  component: AspectRatio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    ratio: {
      control: { type: "number" },
      description: "The aspect ratio of the container",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[300px]">
      <AspectRatio {...args} className="bg-muted">
        <div className="flex h-full items-center justify-center">
          Aspect Ratio: {args.ratio || "1:1"}
        </div>
      </AspectRatio>
    </div>
  ),
  args: {
    ratio: 1,
  },
};

export const Wide: Story = {
  render: (args) => (
    <div className="w-[300px]">
      <AspectRatio {...args} className="bg-muted">
        <div className="flex h-full items-center justify-center">
          Aspect Ratio: 16:9
        </div>
      </AspectRatio>
    </div>
  ),
  args: {
    ratio: 16 / 9,
  },
};

export const Portrait: Story = {
  render: (args) => (
    <div className="w-[300px]">
      <AspectRatio {...args} className="bg-muted">
        <div className="flex h-full items-center justify-center">
          Aspect Ratio: 3:4
        </div>
      </AspectRatio>
    </div>
  ),
  args: {
    ratio: 3 / 4,
  },
};

export const WithImage: Story = {
  render: (args) => (
    <div className="w-[300px]">
      <AspectRatio {...args} className="overflow-hidden rounded-md">
        <img
          src="https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Mountain landscape"
          className="w-full h-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
  args: {
    ratio: 16 / 9,
  },
};