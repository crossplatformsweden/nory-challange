import type { Meta, StoryObj } from "@storybook/react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./index";

const meta: Meta<typeof ResizablePanelGroup> = {
  title: "UI/Resizable",
  component: ResizablePanelGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ResizablePanelGroup>;

/**
 * Basic horizontal resizable panel group.
 */
export const HorizontalBasic: Story = {
  render: () => (
    <div className="h-[400px] w-[800px] rounded-lg border">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25} minSize={15}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-medium">Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-medium">Main Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

/**
 * Vertical resizable panel group.
 */
export const VerticalBasic: Story = {
  render: () => (
    <div className="h-[500px] w-[600px] rounded-lg border">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={25} minSize={15}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-medium">Header</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-medium">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

/**
 * Three panel horizontal layout.
 */
export const ThreePanelHorizontal: Story = {
  render: () => (
    <div className="h-[400px] w-[800px] rounded-lg border">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={15}>
          <div className="flex h-full flex-col items-center justify-center border-r p-4">
            <span className="font-medium">Navigation</span>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              App navigation
            </p>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={60}>
          <div className="flex h-full flex-col items-center justify-center p-4">
            <span className="font-medium">Main Content</span>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Primary content area
            </p>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={20} minSize={15}>
          <div className="flex h-full flex-col items-center justify-center border-l p-4">
            <span className="font-medium">Details</span>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Additional details
            </p>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

/**
 * Code editor layout with multiple panels.
 */
export const CodeEditorLayout: Story = {
  render: () => (
    <div className="h-[600px] w-[900px] rounded-lg border">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={70}>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={25} minSize={15}>
              <div className="flex h-full flex-col border-r">
                <div className="border-b p-2 font-medium">Explorer</div>
                <div className="flex-1 p-2">
                  <ul className="text-sm">
                    <li className="py-1">📁 src</li>
                    <li className="py-1 pl-4">📁 components</li>
                    <li className="py-1 pl-8 text-blue-500">📄 Button.tsx</li>
                    <li className="py-1 pl-8">📄 Card.tsx</li>
                    <li className="py-1 pl-4">📁 utils</li>
                    <li className="py-1">📁 public</li>
                  </ul>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
              <div className="flex h-full flex-col">
                <div className="border-b p-2 font-medium">Button.tsx</div>
                <div className="flex-1 overflow-auto p-4">
                  <pre className="text-sm">
                    <code>{`
import * as React from 'react'
import { cva } from 'class-variance-authority'

import { cn } from '@/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input bg-background",
        secondary: "bg-secondary text-secondary-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }
                    `}</code>
                  </pre>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={30} minSize={20}>
          <div className="flex h-full flex-col border-t">
            <div className="flex items-center border-b">
              <div className="border-r px-4 py-2 font-medium">Problems</div>
              <div className="border-r px-4 py-2 font-medium">Output</div>
              <div className="border-r px-4 py-2 font-medium text-blue-500">
                Terminal
              </div>
            </div>
            <div className="flex-1 bg-black p-4 text-white">
              <div className="text-sm text-green-400">$ npm run dev</div>
              <div className="mt-2 text-sm text-gray-300">
                &gt; project@0.1.0 dev
              </div>
              <div className="text-sm text-gray-300">
                &gt; next dev -p 3000
              </div>
              <div className="mt-2 text-sm text-white">
                ready - started server on 0.0.0.0:3000, url: http://localhost:3000
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

/**
 * Email client layout with resizable panels.
 */
export const EmailClientLayout: Story = {
  render: () => (
    <div className="h-[500px] w-[900px] rounded-lg border">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={15}>
          <div className="flex h-full flex-col border-r">
            <div className="p-2 font-medium">Folders</div>
            <div className="flex-1">
              <ul className="p-2 text-sm">
                <li className="flex items-center gap-2 rounded-md bg-accent p-2 text-accent-foreground">
                  <span>📥</span> Inbox
                </li>
                <li className="flex items-center gap-2 p-2">
                  <span>📤</span> Sent
                </li>
                <li className="flex items-center gap-2 p-2">
                  <span>📝</span> Drafts
                </li>
                <li className="flex items-center gap-2 p-2">
                  <span>🗑️</span> Trash
                </li>
              </ul>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={30}>
          <div className="flex h-full flex-col border-r">
            <div className="border-b p-2 font-medium">Inbox</div>
            <div className="flex-1 overflow-auto">
              <div className="border-b p-2 hover:bg-accent">
                <div className="font-medium">Team meeting</div>
                <div className="text-sm text-muted-foreground">
                  Join us for our weekly team meeting...
                </div>
              </div>
              <div className="border-b bg-accent p-2">
                <div className="font-medium">Project update</div>
                <div className="text-sm text-muted-foreground">
                  I've completed the initial design...
                </div>
              </div>
              <div className="border-b p-2 hover:bg-accent">
                <div className="font-medium">Client feedback</div>
                <div className="text-sm text-muted-foreground">
                  The client has provided feedback...
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full flex-col">
            <div className="border-b p-2 font-medium">Project update</div>
            <div className="flex-1 overflow-auto p-4">
              <div className="space-y-4">
                <div>
                  <div className="font-medium">From: jane@example.com</div>
                  <div className="text-sm text-muted-foreground">
                    To: team@example.com
                  </div>
                </div>
                <div className="text-xl font-bold">Project update</div>
                <div>
                  <p>Hi team,</p>
                  <br />
                  <p>
                    I've completed the initial design for our new project. Here's what I've done so far:
                  </p>
                  <br />
                  <ul className="ml-4 list-disc">
                    <li>Created wireframes for all main pages</li>
                    <li>Implemented responsive layouts</li>
                    <li>Added interactive components</li>
                  </ul>
                  <br />
                  <p>
                    Let me know your thoughts, and we can review this together in our next meeting.
                  </p>
                  <br />
                  <p>Best regards,</p>
                  <p>Jane</p>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

/**
 * Nested resizable panels.
 */
export const NestedPanels: Story = {
  render: () => (
    <div className="h-[500px] w-[800px] rounded-lg border">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={30} minSize={20}>
          <div className="flex h-full flex-col border-r p-4">
            <span className="font-medium">Left Panel</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={60}>
              <div className="flex h-full items-center justify-center p-4">
                <span className="font-medium">Top Right Panel</span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={40}>
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={50}>
                  <div className="flex h-full items-center justify-center border-r p-4">
                    <span className="font-medium">Bottom Left</span>
                  </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={50}>
                  <div className="flex h-full items-center justify-center p-4">
                    <span className="font-medium">Bottom Right</span>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};