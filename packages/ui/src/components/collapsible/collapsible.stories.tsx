import type { Meta, StoryObj } from "@storybook/react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./index";
import { Button } from "../button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const meta: Meta<typeof Collapsible> = {
  title: "Components/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: { type: "boolean" },
      description: "The controlled open state of the collapsible",
    },
    defaultOpen: {
      control: { type: "boolean" },
      description: "The default open state when initially rendered",
    },
    onOpenChange: {
      action: "openChanged",
      description: "Event handler called when the open state changes",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the collapsible is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: (args) => (
    <Collapsible {...args} className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-3 font-mono text-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
  args: {
    defaultOpen: false,
  },
};

export const DefaultOpen: Story = {
  render: (args) => (
    <Collapsible {...args} className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-3 font-mono text-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
  args: {
    defaultOpen: true,
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <Button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "Close" : "Open"}
          </Button>
          <div>Current state: {isOpen ? "Open" : "Closed"}</div>
        </div>
        <Collapsible
          {...args}
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-[350px] space-y-2"
        >
          <div className="flex items-center justify-between space-x-4 px-4">
            <h4 className="text-sm font-semibold">Controlled Collapsible</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            Always visible content
          </div>
          <CollapsibleContent className="space-y-2">
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              Hidden content 1
            </div>
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              Hidden content 2
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};

export const CustomTrigger: Story = {
  render: (args) => (
    <Collapsible {...args} className="w-[350px] space-y-2">
      <div className="rounded-md border px-4 py-3 font-mono text-sm">
        Always visible content
      </div>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full">
          <ChevronDown className="h-4 w-4 mr-2" />
          Click to {args.defaultOpen ? "hide" : "show"} content
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border border-green-500 bg-green-50 px-4 py-3 font-mono text-sm dark:bg-green-950 dark:border-green-800">
          This content is collapsible
        </div>
        <div className="rounded-md border border-green-500 bg-green-50 px-4 py-3 font-mono text-sm dark:bg-green-950 dark:border-green-800">
          You can hide it by clicking the button again
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
  args: {
    defaultOpen: false,
  },
};