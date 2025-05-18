import type { Meta, StoryObj } from "@storybook/react";
import { LucideProps } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./index";
import Link from "next/link";

// Mock components for the demo
const ListItem = ({
  className,
  title,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & {
  title: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

// Icons for the examples
const FileIcon = (props: LucideProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const SettingsIcon = (props: LucideProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const meta: Meta<typeof NavigationMenu> = {
  title: "UI/NavigationMenu",
  component: NavigationMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

/**
 * Basic navigation menu with simple links.
 */
export const Basic: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Documentation
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Learn how to integrate our products into your application
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs/introduction" title="Introduction">
                Learn about the core concepts and architecture.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and set up your project.
              </ListItem>
              <ListItem href="/docs/typography" title="Typography">
                Styles for headings, paragraphs, lists, and more.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem href="/docs/buttons" title="Buttons">
                Interactive elements for user actions and form submissions.
              </ListItem>
              <ListItem href="/docs/cards" title="Cards">
                Containers for organizing related content and actions.
              </ListItem>
              <ListItem href="/docs/forms" title="Forms">
                Input components for collecting user data.
              </ListItem>
              <ListItem href="/docs/layout" title="Layout">
                Components for structuring content on your pages.
              </ListItem>
              <ListItem href="/docs/navigation" title="Navigation">
                Components for helping users move through your app.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            href="/docs"
          >
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

/**
 * Simple horizontal navigation menu with direct links.
 */
export const SimpleHorizontal: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/">
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/about">
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/products">
            Products
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/contact">
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

/**
 * Navigation menu with icons.
 */
export const WithIcons: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <FileIcon className="mr-2 h-4 w-4" />
            <span>Documents</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-3 p-4">
              <ListItem href="/documents/recent" title="Recent Files">
                Access your recently opened documents.
              </ListItem>
              <ListItem href="/documents/shared" title="Shared With Me">
                Documents shared by team members.
              </ListItem>
              <ListItem href="/documents/trash" title="Trash">
                Recover or permanently delete files.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <SettingsIcon className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-3 p-4">
              <ListItem href="/settings/profile" title="Profile">
                Manage your account information.
              </ListItem>
              <ListItem href="/settings/preferences" title="Preferences">
                Customize your application experience.
              </ListItem>
              <ListItem href="/settings/security" title="Security">
                Password and authentication settings.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

/**
 * Navigation menu with a disabled item.
 */
export const WithDisabledItem: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/">
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-3 p-4">
              <ListItem href="/products/hardware" title="Hardware">
                Physical devices and components.
              </ListItem>
              <ListItem href="/products/software" title="Software">
                Applications and digital solutions.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger disabled>
            Premium Features
          </NavigationMenuTrigger>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/contact">
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

/**
 * Navigation menu styled as a mobile menu.
 */
export const MobileStyle: Story = {
  render: () => (
    <NavigationMenu className="max-w-full items-start justify-start">
      <NavigationMenuList className="flex w-full flex-col space-x-0 space-y-1">
        <NavigationMenuItem className="w-full">
          <NavigationMenuTrigger className="w-full justify-between">
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-[220px] gap-2 p-2">
              <ListItem
                href="/products/hardware"
                title="Hardware"
                className="p-2"
              >
                Physical products.
              </ListItem>
              <ListItem
                href="/products/software"
                title="Software"
                className="p-2"
              >
                Digital applications.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="w-full">
          <NavigationMenuTrigger className="w-full justify-between">
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-[220px] gap-2 p-2">
              <ListItem
                href="/services/consulting"
                title="Consulting"
                className="p-2"
              >
                Expert advice.
              </ListItem>
              <ListItem
                href="/services/support"
                title="Support"
                className="p-2"
              >
                Technical assistance.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="w-full">
          <NavigationMenuLink
            className={`w-full justify-start ${navigationMenuTriggerStyle()}`}
            href="/about"
          >
            About Us
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="w-full">
          <NavigationMenuLink
            className={`w-full justify-start ${navigationMenuTriggerStyle()}`}
            href="/contact"
          >
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};