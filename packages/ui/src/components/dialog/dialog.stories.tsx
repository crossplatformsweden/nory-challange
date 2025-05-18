import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./index";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import { useState } from "react";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Whether the dialog is open (controlled)",
    },
    defaultOpen: {
      control: "boolean",
      description: "Whether the dialog is initially open (uncontrolled)",
    },
    onOpenChange: {
      action: "onOpenChange",
      description: "Event handler called when the open state changes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const BasicTemplate = (args: any) => (
  <Dialog {...args}>
    <DialogTrigger asChild>
      <Button variant="outline">Open Dialog</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" defaultValue="John Doe" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Username
          </Label>
          <Input id="username" defaultValue="@johndoe" className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const Basic: Story = {
  render: (args) => <BasicTemplate {...args} />,
  args: {
    defaultOpen: false,
  },
};

const WithActionButtonsTemplate = (args: any) => (
  <Dialog {...args}>
    <DialogTrigger asChild>
      <Button variant="outline">Delete Account</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button variant="destructive">Delete</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const WithActionButtons: Story = {
  render: (args) => <WithActionButtonsTemplate {...args} />,
  args: {
    defaultOpen: false,
  },
};

const WithScrollableContentTemplate = (args: any) => (
  <Dialog {...args}>
    <DialogTrigger asChild>
      <Button variant="outline">Terms & Conditions</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>Terms of Service</DialogTitle>
        <DialogDescription>
          Please read our terms and conditions carefully.
        </DialogDescription>
      </DialogHeader>
      <div className="max-h-[300px] overflow-y-auto pr-6">
        <div className="space-y-4 py-4 text-sm">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
            Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
          </p>
          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i}>
              Ut aliquam sollicitudin leo. Cras elementum ultrices diam.
              Maecenas ligula massa, varius a, semper congue, euismod non, mi.
              Proin porttitor, orci nec nonummy molestie, enim est eleifend mi,
              non fermentum diam nisl sit amet erat.
            </p>
          ))}
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
        <Button type="submit">Accept</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const WithScrollableContent: Story = {
  render: (args) => <WithScrollableContentTemplate {...args} />,
  args: {
    defaultOpen: false,
  },
};

// Wrapper component to avoid rules-of-hooks ESLint errors
const ControlledWrapper = (args: any) => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4">
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Button variant="outline" onClick={() => setOpen(false)}>
          Close Dialog
        </Button>
      </div>
      <div>Dialog is {open ? "open" : "closed"}</div>
      
      <Dialog open={open} onOpenChange={setOpen} {...args}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Controlled Dialog</DialogTitle>
            <DialogDescription>
              This dialog is controlled using external state.
            </DialogDescription>
          </DialogHeader>
          <p className="py-4">
            You can open and close this dialog using the buttons outside of it.
          </p>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const Controlled: Story = {
  render: (args) => <ControlledWrapper {...args} />,
};

const NestedTemplate = (args: any) => (
  <Dialog {...args}>
    <DialogTrigger asChild>
      <Button variant="outline">Open First Dialog</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>First Dialog</DialogTitle>
        <DialogDescription>
          This is the first level dialog.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
        <p className="mb-4">You can open another dialog from this one:</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Second Dialog</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[375px]">
            <DialogHeader>
              <DialogTitle>Second Dialog</DialogTitle>
              <DialogDescription>
                This is a nested dialog.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p>This is nested inside the first dialog.</p>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const Nested: Story = {
  render: (args) => <NestedTemplate {...args} />,
  args: {
    defaultOpen: false,
  },
};