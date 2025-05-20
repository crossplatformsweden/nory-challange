import type { Meta, StoryObj } from '@storybook/react';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from './index';
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Command> = {
  title: 'Components/Command',
  component: Command,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Command>;

const DefaultTemplate = (args: any) => (
  <Command className="w-[400px] rounded-lg border shadow-md" {...args}>
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem>
          <Calendar className="mr-2 h-4 w-4" />
          <span>Calendar</span>
        </CommandItem>
        <CommandItem>
          <Smile className="mr-2 h-4 w-4" />
          <span>Search Emoji</span>
        </CommandItem>
        <CommandItem>
          <Calculator className="mr-2 h-4 w-4" />
          <span>Calculator</span>
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Settings">
        <CommandItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
          <CommandShortcut>⌘P</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span>
          <CommandShortcut>⌘B</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
          <CommandShortcut>⌘S</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
);

export const Default: Story = {
  render: (args) => <DefaultTemplate {...args} />,
};

// Wrapper component to avoid rules-of-hooks ESLint errors
const WithFilterWrapper = (args: any) => {
  const [search, setSearch] = useState('');

  const items = [
    {
      group: 'General',
      items: [
        { name: 'Dashboard', icon: <Calendar className="mr-2 h-4 w-4" /> },
        { name: 'Profile', icon: <User className="mr-2 h-4 w-4" /> },
        { name: 'Settings', icon: <Settings className="mr-2 h-4 w-4" /> },
      ],
    },
    {
      group: 'Finance',
      items: [
        { name: 'Billing', icon: <CreditCard className="mr-2 h-4 w-4" /> },
        { name: 'Transactions', icon: <Calculator className="mr-2 h-4 w-4" /> },
      ],
    },
  ];

  const filteredItems = search
    ? items
        .map((group) => ({
          ...group,
          items: group.items.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          ),
        }))
        .filter((group) => group.items.length > 0)
    : items;

  return (
    <Command className="w-[400px] rounded-lg border shadow-md" {...args}>
      <CommandInput
        placeholder="Type to search..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        {filteredItems.length === 0 && (
          <CommandEmpty>No results found.</CommandEmpty>
        )}
        {filteredItems.map((group, index) => (
          <div key={group.group}>
            {index > 0 && <CommandSeparator />}
            <CommandGroup heading={group.group}>
              {group.items.map((item) => (
                <CommandItem key={item.name}>
                  {item.icon}
                  <span>{item.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ))}
      </CommandList>
    </Command>
  );
};

export const WithFilter: Story = {
  render: (args) => <WithFilterWrapper {...args} />,
};

// Wrapper component for dialog story
const WithDialogWrapper = () => {
  return (
    <div className="w-[400px] rounded-md border p-4">
      <p className="mb-4">
        Press{' '}
        <kbd className="rounded-md border px-1 py-0.5 text-sm">Ctrl K</kbd> to
        open the command dialog
      </p>

      <div className="text-muted-foreground text-center text-sm">
        (In a real app, pressing Ctrl+K would trigger the dialog. For this demo,
        the dialog would appear but is mocked here.)
      </div>

      <div className="mt-4 rounded-md border border-dashed p-4">
        <p className="mb-2 text-sm font-medium">Command Dialog Preview:</p>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem>
                <Smile className="mr-2 h-4 w-4" />
                <span>Search Emoji</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  );
};

// This is just a mock example since the Dialog would create portals
// and doesn't work well within Storybook without additional setup
export const WithDialog: Story = {
  render: () => <WithDialogWrapper />,
};

const MultipleColumnsTemplate = (args: any) => (
  <Command className="w-[400px] rounded-lg border shadow-md" {...args}>
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <div className="flex">
        <div className="flex-1 border-r">
          <CommandGroup heading="Team">
            <CommandItem>Engineering</CommandItem>
            <CommandItem>Product</CommandItem>
            <CommandItem>Design</CommandItem>
            <CommandItem>Marketing</CommandItem>
          </CommandGroup>
        </div>
        <div className="flex-1">
          <CommandGroup heading="Members">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>John Doe</span>
            </CommandItem>
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Jane Smith</span>
            </CommandItem>
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Bob Johnson</span>
            </CommandItem>
          </CommandGroup>
        </div>
      </div>
    </CommandList>
  </Command>
);

export const WithMultipleColumns: Story = {
  render: (args) => <MultipleColumnsTemplate {...args} />,
};
