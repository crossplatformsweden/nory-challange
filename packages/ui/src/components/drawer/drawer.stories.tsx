import type { Meta, StoryObj } from "@storybook/react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "./index";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Whether the drawer is open (controlled)",
    },
    onOpenChange: {
      action: "onOpenChange",
      description: "Event handler called when the open state changes",
    },
    shouldScaleBackground: {
      control: "boolean",
      description: "Whether the background should scale when the drawer is open",
      defaultValue: true,
    },
    direction: {
      control: { type: "radio" },
      options: ["top", "bottom", "left", "right"],
      description: "The direction the drawer opens from",
      defaultValue: "bottom",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Basic: Story = {
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pb-0">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@johndoe" />
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button>Save changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const WithConfirmation: Story = {
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button variant="outline">Delete Account</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button variant="destructive">Delete Account</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const WithScrollableContent: Story = {
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button variant="outline">Terms & Conditions</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Terms of Service</DrawerTitle>
          <DrawerDescription>
            Please read our terms and conditions carefully.
          </DrawerDescription>
        </DrawerHeader>
        <div className="max-h-[60vh] overflow-y-auto p-4 pb-0">
          <div className="space-y-4 text-sm">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
              Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
            </p>
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i}>
                Ut aliquam sollicitudin leo. Cras elementum ultrices diam.
                Maecenas ligula massa, varius a, semper congue, euismod non, mi.
                Proin porttitor, orci nec nonummy molestie, enim est eleifend mi,
                non fermentum diam nisl sit amet erat.
              </p>
            ))}
          </div>
        </div>
        <DrawerFooter>
          <Button>Accept</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const NestedDrawers: Story = {
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>First Drawer</DrawerTitle>
          <DrawerDescription>
            This is the first drawer.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pb-0">
          <p className="pb-4">You can open another drawer from here:</p>
          <Drawer direction="bottom" nested>
            <DrawerTrigger asChild>
              <Button variant="outline">Open Nested Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Nested Drawer</DrawerTitle>
                <DrawerDescription>
                  This is a nested drawer.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
                <p>This drawer is nested inside the first drawer.</p>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button>Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const WithSnapPoints: Story = {
  render: (args) => (
    <Drawer {...args} snapPoints={[0.4, 0.6, 1]}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer with Snap Points</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Snap Points Drawer</DrawerTitle>
          <DrawerDescription>
            This drawer has snap points at 40%, 60%, and 100%.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p>Drag the drawer up to snap to different heights.</p>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};