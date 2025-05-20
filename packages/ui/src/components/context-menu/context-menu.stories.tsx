import type { Meta, StoryObj } from '@storybook/react';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuRadioGroup,
} from './index';
import { useState } from 'react';

const meta: Meta<typeof ContextMenu> = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

const DefaultTemplate = () => (
  <ContextMenu>
    <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
      Right click here
    </ContextMenuTrigger>
    <ContextMenuContent className="w-64">
      <ContextMenuItem>
        Back
        <ContextMenuShortcut>⌘[</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        Forward
        <ContextMenuShortcut>⌘]</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        Reload
        <ContextMenuShortcut>⌘R</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem>
        Save As...
        <ContextMenuShortcut>⌘S</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        Print...
        <ContextMenuShortcut>⌘P</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem>View Source</ContextMenuItem>
      <ContextMenuItem>Inspect</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
);

export const Default: Story = {
  render: () => <DefaultTemplate />,
};

// Wrapper component to avoid rules-of-hooks ESLint errors
const WithCheckboxItemsWrapper = () => {
  const [checkedItems, setCheckedItems] = useState({
    toolbar: true,
    statusbar: false,
    sidebar: true,
  });

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuLabel>View Options</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem
          checked={checkedItems.toolbar}
          onCheckedChange={(checked) =>
            setCheckedItems({ ...checkedItems, toolbar: checked ?? false })
          }
        >
          Show Toolbar
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem
          checked={checkedItems.statusbar}
          onCheckedChange={(checked) =>
            setCheckedItems({ ...checkedItems, statusbar: checked ?? false })
          }
        >
          Show Statusbar
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem
          checked={checkedItems.sidebar}
          onCheckedChange={(checked) =>
            setCheckedItems({ ...checkedItems, sidebar: checked ?? false })
          }
        >
          Show Sidebar
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export const WithCheckboxItems: Story = {
  render: () => <WithCheckboxItemsWrapper />,
};

// Wrapper component to avoid rules-of-hooks ESLint errors
const WithRadioItemsWrapper = () => {
  const [position, setPosition] = useState('bottom');

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuLabel>Dock Position</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value={position} onValueChange={setPosition}>
          <ContextMenuRadioItem value="top">Top</ContextMenuRadioItem>
          <ContextMenuRadioItem value="right">Right</ContextMenuRadioItem>
          <ContextMenuRadioItem value="bottom">Bottom</ContextMenuRadioItem>
          <ContextMenuRadioItem value="left">Left</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuSeparator />
        <ContextMenuItem>Current position: {position}</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export const WithRadioItems: Story = {
  render: () => <WithRadioItemsWrapper />,
};

const WithSubmenuTemplate = () => (
  <ContextMenu>
    <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
      Right click here
    </ContextMenuTrigger>
    <ContextMenuContent className="w-64">
      <ContextMenuItem>
        Back
        <ContextMenuShortcut>⌘[</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        Forward
        <ContextMenuShortcut>⌘]</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        Reload
        <ContextMenuShortcut>⌘R</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
        <ContextMenuSubContent className="w-48">
          <ContextMenuItem>
            Save Page As...
            <ContextMenuShortcut>⌘S</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>Create Shortcut...</ContextMenuItem>
          <ContextMenuItem>Name Window...</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Developer Tools</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuSeparator />
      <ContextMenuItem>
        Print...
        <ContextMenuShortcut>⌘P</ContextMenuShortcut>
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
);

export const WithSubmenu: Story = {
  render: () => <WithSubmenuTemplate />,
};

const InsetItemsTemplate = () => (
  <ContextMenu>
    <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
      Right click here
    </ContextMenuTrigger>
    <ContextMenuContent className="w-64">
      <ContextMenuLabel>Application</ContextMenuLabel>
      <ContextMenuItem inset>Settings</ContextMenuItem>
      <ContextMenuItem inset>Extensions</ContextMenuItem>
      <ContextMenuItem inset>Theme</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuLabel>Actions</ContextMenuLabel>
      <ContextMenuItem inset>New Tab</ContextMenuItem>
      <ContextMenuItem inset>New Window</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuLabel inset>Other</ContextMenuLabel>
      <ContextMenuItem inset>Help</ContextMenuItem>
      <ContextMenuItem inset>About</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
);

export const InsetItems: Story = {
  render: () => <InsetItemsTemplate />,
};

const DisabledTemplate = () => (
  <ContextMenu>
    <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
      Right click here
    </ContextMenuTrigger>
    <ContextMenuContent className="w-64">
      <ContextMenuItem>Enable</ContextMenuItem>
      <ContextMenuItem disabled>Disabled Action (disabled)</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuCheckboxItem checked={false} disabled>
        Disabled Checkbox (disabled)
      </ContextMenuCheckboxItem>
      <ContextMenuSeparator />
      <ContextMenuRadioGroup value="active">
        <ContextMenuRadioItem value="active">Active</ContextMenuRadioItem>
        <ContextMenuRadioItem value="inactive" disabled>
          Inactive (disabled)
        </ContextMenuRadioItem>
      </ContextMenuRadioGroup>
    </ContextMenuContent>
  </ContextMenu>
);

export const Disabled: Story = {
  render: () => <DisabledTemplate />,
};
