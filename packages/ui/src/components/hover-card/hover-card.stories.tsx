import type { Meta, StoryObj } from "@storybook/react";
import { CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./index";

const meta: Meta<typeof HoverCard> = {
  title: "UI/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

/**
 * Basic usage of the HoverCard component.
 */
export const Basic: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">Hover over me</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Hover Card</h4>
            <p className="text-sm">
              This is a hover card component that appears when hovering over the trigger.
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

/**
 * HoverCard with user profile information.
 */
export const UserProfile: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@johndoe</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@johndoe</h4>
            <p className="text-sm">
              Full-stack developer and UI/UX enthusiast.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

/**
 * Shows different alignment options for the HoverCard.
 */
export const Alignment: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-8">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Align Center</Button>
        </HoverCardTrigger>
        <HoverCardContent align="center">
          <div className="space-y-1">
            <p className="text-sm font-medium">Aligned to center</p>
            <p className="text-sm text-muted-foreground">
              This hover card is aligned to the center of the trigger.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
      
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Align Start</Button>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          <div className="space-y-1">
            <p className="text-sm font-medium">Aligned to start</p>
            <p className="text-sm text-muted-foreground">
              This hover card is aligned to the start of the trigger.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
      
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Align End</Button>
        </HoverCardTrigger>
        <HoverCardContent align="end">
          <div className="space-y-1">
            <p className="text-sm font-medium">Aligned to end</p>
            <p className="text-sm text-muted-foreground">
              This hover card is aligned to the end of the trigger.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

/**
 * HoverCard with different side offset values.
 */
export const SideOffset: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-8">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Default Offset (4px)</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <p className="text-sm">Default side offset (4px)</p>
        </HoverCardContent>
      </HoverCard>
      
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Large Offset (16px)</Button>
        </HoverCardTrigger>
        <HoverCardContent sideOffset={16}>
          <p className="text-sm">Larger side offset (16px)</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

/**
 * HoverCard with rich formatted content.
 */
export const RichContent: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">Product details</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-96">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div 
              className="h-16 w-16 rounded-md bg-primary/10 flex items-center justify-center"
            >
              <div className="h-8 w-8 rounded-full bg-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Premium Widget Pro</h3>
              <p className="text-sm text-muted-foreground">The ultimate widget solution</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-md border p-2">
              <p className="text-xs font-medium">Price</p>
              <p className="text-sm">$99.99</p>
            </div>
            <div className="rounded-md border p-2">
              <p className="text-xs font-medium">Stock</p>
              <p className="text-sm">In stock</p>
            </div>
            <div className="rounded-md border p-2">
              <p className="text-xs font-medium">Rating</p>
              <p className="text-sm">★★★★☆</p>
            </div>
            <div className="rounded-md border p-2">
              <p className="text-xs font-medium">Category</p>
              <p className="text-sm">Widgets</p>
            </div>
          </div>
          
          <Button size="sm" className="w-full">View Details</Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};