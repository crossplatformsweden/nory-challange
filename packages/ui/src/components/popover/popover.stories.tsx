import type { Meta, StoryObj } from "@storybook/react";
import { Settings } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./index";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";

const meta: Meta<typeof Popover> = {
  title: "UI/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

/**
 * Basic usage of the Popover component.
 */
export const Basic: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * Popover with an icon trigger button.
 */
export const WithIconTrigger: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium">Settings</h4>
          <p className="text-sm text-muted-foreground">
            Configure your application preferences.
          </p>
          <hr className="my-2" />
          <div className="grid gap-2">
            <Button variant="outline" size="sm">
              General
            </Button>
            <Button variant="outline" size="sm">
              Security
            </Button>
            <Button variant="outline" size="sm">
              Notifications
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * Popover with different alignment options.
 */
export const Alignment: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-8">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Align Center</Button>
        </PopoverTrigger>
        <PopoverContent align="center">
          <div className="space-y-2">
            <p className="text-sm font-medium">Center Aligned</p>
            <p className="text-sm text-muted-foreground">
              This popover is aligned to the center of the trigger.
            </p>
          </div>
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Align Start</Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <div className="space-y-2">
            <p className="text-sm font-medium">Start Aligned</p>
            <p className="text-sm text-muted-foreground">
              This popover is aligned to the start of the trigger.
            </p>
          </div>
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Align End</Button>
        </PopoverTrigger>
        <PopoverContent align="end">
          <div className="space-y-2">
            <p className="text-sm font-medium">End Aligned</p>
            <p className="text-sm text-muted-foreground">
              This popover is aligned to the end of the trigger.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

/**
 * Popover with different side offset values.
 */
export const SideOffset: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-8">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Default Offset (4px)</Button>
        </PopoverTrigger>
        <PopoverContent>
          <p className="text-sm">Default side offset (4px)</p>
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Large Offset (16px)</Button>
        </PopoverTrigger>
        <PopoverContent sideOffset={16}>
          <p className="text-sm">Larger side offset (16px)</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

/**
 * A simple login form in a popover.
 */
export const LoginForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Login</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Login</h4>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to login to your account.
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="email@example.com"
              type="email"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
            />
          </div>
          <Button type="submit">Log in</Button>
        </form>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * Custom styled popover with footer actions.
 */
export const CustomStyled: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Color Picker</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0">
        <div className="border-b border-border p-4">
          <h4 className="font-medium">Choose a color</h4>
          <p className="text-xs text-muted-foreground">
            Click on a color to select it.
          </p>
        </div>
        <div className="grid grid-cols-5 gap-2 p-4">
          {["red", "green", "blue", "yellow", "orange", "purple", "pink", "gray", "black", "white"].map((color) => (
            <div
              key={color}
              className={`h-8 w-8 cursor-pointer rounded-full bg-${color === "white" ? "slate-100" : color === "black" ? "slate-900" : color}-500 border border-border`}
              style={{ backgroundColor: color === "white" ? "#f8fafc" : color === "black" ? "#0f172a" : "" }}
            />
          ))}
        </div>
        <div className="flex items-center justify-end border-t border-border p-4">
          <Button variant="ghost" size="sm" className="mr-2">
            Reset
          </Button>
          <Button size="sm">Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};