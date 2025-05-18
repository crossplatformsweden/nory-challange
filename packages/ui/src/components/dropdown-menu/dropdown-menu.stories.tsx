import type { Meta, StoryObj } from "@storybook/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "./index";
import { Button } from "../button";
import { 
  Cloud, 
  CreditCard, 
  Github, 
  Keyboard, 
  LifeBuoy, 
  LogOut, 
  Mail, 
  MessageSquare, 
  Plus, 
  PlusCircle, 
  Settings, 
  User, 
  UserPlus, 
  Users
} from "lucide-react";
import { useState } from "react";

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Whether the dropdown menu is open (controlled)",
    },
    defaultOpen: {
      control: "boolean",
      description: "Whether the dropdown menu is initially open (uncontrolled)",
    },
    onOpenChange: {
      action: "onOpenChange",
      description: "Event handler called when the open state changes",
    },
    modal: {
      control: "boolean",
      description: "Whether the dropdown menu is modal",
      defaultValue: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

const BasicTemplate = (args: any) => (
  <DropdownMenu {...args}>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">Open Menu</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <User className="mr-2 h-4 w-4" />
        <span>Profile</span>
        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <CreditCard className="mr-2 h-4 w-4" />
        <span>Billing</span>
        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Settings className="mr-2 h-4 w-4" />
        <span>Settings</span>
        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Keyboard className="mr-2 h-4 w-4" />
        <span>Keyboard shortcuts</span>
        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const Basic: Story = {
  render: (args) => <BasicTemplate {...args} />,
};

// Wrapper component to avoid rules-of-hooks ESLint errors
const WithCheckboxItemsWrapper = (args: any) => {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  
  return (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          Panel
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5 text-sm">
          Current state: 
          <ul className="ml-2 text-muted-foreground">
            <li>Status Bar: {showStatusBar ? "Shown" : "Hidden"}</li>
            <li>Activity Bar: {showActivityBar ? "Shown" : "Hidden"}</li>
            <li>Panel: {showPanel ? "Shown" : "Hidden"}</li>
          </ul>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const WithCheckboxItems: Story = {
  render: (args) => <WithCheckboxItemsWrapper {...args} />,
};

// Wrapper component to avoid rules-of-hooks ESLint errors
const WithRadioItemsWrapper = (args: any) => {
  const [position, setPosition] = useState("bottom");
  
  return (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="left">Left</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5 text-sm">
          Current position: <span className="font-medium">{position}</span>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const WithRadioItems: Story = {
  render: (args) => <WithRadioItemsWrapper {...args} />,
};

const WithSubMenuTemplate = (args: any) => (
  <DropdownMenu {...args}>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">Open</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span>
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Users className="mr-2 h-4 w-4" />
          <span>Team</span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <UserPlus className="mr-2 h-4 w-4" />
            <span>Invite users</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-48">
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              <span>Email</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Message</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>More...</span>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const WithSubMenu: Story = {
  render: (args) => <WithSubMenuTemplate {...args} />,
};

const InsetTemplate = (args: any) => (
  <DropdownMenu {...args}>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">Open</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Standard Item</DropdownMenuItem>
      <DropdownMenuItem inset>Inset Item 1</DropdownMenuItem>
      <DropdownMenuItem inset>Inset Item 2</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuLabel>Other Options</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Another Standard Item</DropdownMenuItem>
      <DropdownMenuItem inset>Another Inset Item</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const Inset: Story = {
  render: (args) => <InsetTemplate {...args} />,
};

const WithIconsTemplate = (args: any) => (
  <DropdownMenu {...args}>
    <DropdownMenuTrigger asChild>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        <span>Create New</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>New</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Mail className="mr-2 h-4 w-4" />
        <span>Email</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <MessageSquare className="mr-2 h-4 w-4" />
        <span>Message</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Cloud className="mr-2 h-4 w-4" />
        <span>Cloud File</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Github className="mr-2 h-4 w-4" />
        <span>GitHub Repository</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <LifeBuoy className="mr-2 h-4 w-4" />
        <span>Help</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const WithIcons: Story = {
  render: (args) => <WithIconsTemplate {...args} />,
};

const DisabledTemplate = (args: any) => (
  <DropdownMenu {...args}>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">Open</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Enabled Item</DropdownMenuItem>
      <DropdownMenuItem disabled>Disabled Item</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem checked disabled>
        Disabled Checkbox (checked)
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem disabled>
        Disabled Checkbox (unchecked)
      </DropdownMenuCheckboxItem>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup value="default">
        <DropdownMenuRadioItem value="default">
          Enabled Radio
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="disabled" disabled>
          Disabled Radio
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const Disabled: Story = {
  render: (args) => <DisabledTemplate {...args} />,
};