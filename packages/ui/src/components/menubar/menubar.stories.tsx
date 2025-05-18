import type { Meta, StoryObj } from "@storybook/react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "./index";

const meta: Meta<typeof Menubar> = {
  title: "UI/Menubar",
  component: Menubar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Menubar>;

/**
 * Basic Menubar example with File, Edit, and View menus.
 */
export const Basic: Story = {
  render: () => (
    <Menubar className="w-[500px]">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Cut <MenubarShortcut>⌘X</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Copy <MenubarShortcut>⌘C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Paste <MenubarShortcut>⌘V</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Select All <MenubarShortcut>⌘A</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Zoom In <MenubarShortcut>⌘+</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Zoom Out <MenubarShortcut>⌘-</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Toggle Fullscreen <MenubarShortcut>F11</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

/**
 * Menubar with nested submenus.
 */
export const WithSubmenus: Story = {
  render: () => (
    <Menubar className="w-[500px]">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>New</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>
                Document <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>Spreadsheet</MenubarItem>
              <MenubarItem>Presentation</MenubarItem>
              <MenubarItem>Form</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSub>
            <MenubarSubTrigger>Open</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Recent Files</MenubarItem>
              <MenubarItem>From Computer</MenubarItem>
              <MenubarSub>
                <MenubarSubTrigger>From Cloud</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Google Drive</MenubarItem>
                  <MenubarItem>Dropbox</MenubarItem>
                  <MenubarItem>OneDrive</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Save <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Save As... <MenubarShortcut>⇧⌘S</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

/**
 * Menubar with checkbox items.
 */
export const WithCheckboxItems: Story = {
  render: () => {
    return (
      <Menubar className="w-[500px]">
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Reload <MenubarShortcut>⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarCheckboxItem checked>Show Bookmarks Bar</MenubarCheckboxItem>
            <MenubarCheckboxItem>Show Full URLs</MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem>
              Toggle Developer Tools <MenubarShortcut>⌥⌘I</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

/**
 * Menubar with radio items.
 */
export const WithRadioItems: Story = {
  render: () => {
    return (
      <Menubar className="w-[500px]">
        <MenubarMenu>
          <MenubarTrigger>Format</MenubarTrigger>
          <MenubarContent>
            <MenubarLabel>Text Size</MenubarLabel>
            <MenubarRadioGroup value="normal">
              <MenubarRadioItem value="small">Small</MenubarRadioItem>
              <MenubarRadioItem value="normal">Normal</MenubarRadioItem>
              <MenubarRadioItem value="large">Large</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarLabel>Color Theme</MenubarLabel>
            <MenubarRadioGroup value="light">
              <MenubarRadioItem value="light">Light</MenubarRadioItem>
              <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
              <MenubarRadioItem value="system">System</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

/**
 * Menubar with disabled items.
 */
export const WithDisabledItems: Story = {
  render: () => (
    <Menubar className="w-[500px]">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New</MenubarItem>
          <MenubarItem>Open</MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>Save (Unavailable)</MenubarItem>
          <MenubarItem disabled>Print (Unavailable)</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      
      <MenubarMenu>
        <MenubarTrigger disabled>Actions (Disabled)</MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  ),
};

/**
 * Menubar with groups.
 */
export const WithGroups: Story = {
  render: () => (
    <Menubar className="w-[500px]">
      <MenubarMenu>
        <MenubarTrigger>Options</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarLabel>Accessibility</MenubarLabel>
            <MenubarItem>Keyboard Shortcuts</MenubarItem>
            <MenubarItem>Screen Reader</MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarLabel>Appearance</MenubarLabel>
            <MenubarItem>Zoom</MenubarItem>
            <MenubarItem>Font Size</MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarLabel>Settings</MenubarLabel>
            <MenubarItem>Preferences</MenubarItem>
            <MenubarItem>Advanced</MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};

/**
 * Menubar with inset items.
 */
export const WithInsetItems: Story = {
  render: () => (
    <Menubar className="w-[500px]">
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>Actions</MenubarLabel>
          <MenubarItem inset>Cut</MenubarItem>
          <MenubarItem inset>Copy</MenubarItem>
          <MenubarItem inset>Paste</MenubarItem>
          <MenubarSeparator />
          <MenubarLabel>More</MenubarLabel>
          <MenubarSub>
            <MenubarSubTrigger inset>Advanced</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Inspect Element</MenubarItem>
              <MenubarItem>View Source</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
};