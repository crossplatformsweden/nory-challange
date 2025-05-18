import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarShortcut,
} from "./index";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  Check: () => <div data-testid="check-icon" />,
  ChevronRight: () => <div data-testid="chevron-right-icon" />,
  Circle: () => <div data-testid="circle-icon" />,
}));

// Mock Radix UI's Menubar primitive components
jest.mock("@radix-ui/react-menubar", () => ({
  Root: ({ className, children, ...props }: any) => (
    <div data-testid="menubar-root" className={className} {...props}>
      {children}
    </div>
  ),
  Menu: ({ children }: any) => (
    <div data-testid="menubar-menu">{children}</div>
  ),
  Group: ({ children }: any) => (
    <div data-testid="menubar-group">{children}</div>
  ),
  Portal: ({ children }: any) => (
    <div data-testid="menubar-portal">{children}</div>
  ),
  Sub: ({ children }: any) => (
    <div data-testid="menubar-sub">{children}</div>
  ),
  RadioGroup: ({ children }: any) => (
    <div data-testid="menubar-radio-group">{children}</div>
  ),
  Trigger: ({ className, children, ...props }: any) => (
    <button data-testid="menubar-trigger" className={className} {...props}>
      {children}
    </button>
  ),
  SubTrigger: ({ className, children, ...props }: any) => (
    <button data-testid="menubar-sub-trigger" className={className} {...props}>
      {children}
    </button>
  ),
  Content: ({ className, children, align, alignOffset, sideOffset, ...props }: any) => (
    <div 
      data-testid="menubar-content" 
      className={className} 
      data-align={align}
      data-align-offset={alignOffset}
      data-side-offset={sideOffset}
      {...props}
    >
      {children}
    </div>
  ),
  SubContent: ({ className, children, ...props }: any) => (
    <div data-testid="menubar-sub-content" className={className} {...props}>
      {children}
    </div>
  ),
  Item: ({ className, children, inset, ...props }: any) => (
    <div 
      data-testid="menubar-item" 
      className={className} 
      data-inset={inset ? "true" : undefined}
      {...props}
    >
      {children}
    </div>
  ),
  CheckboxItem: ({ className, children, checked, ...props }: any) => (
    <div 
      data-testid="menubar-checkbox-item" 
      className={className} 
      data-checked={checked ? "true" : undefined}
      {...props}
    >
      {children}
    </div>
  ),
  RadioItem: ({ className, children, ...props }: any) => (
    <div data-testid="menubar-radio-item" className={className} {...props}>
      {children}
    </div>
  ),
  Label: ({ className, children, inset, ...props }: any) => (
    <div 
      data-testid="menubar-label" 
      className={className} 
      data-inset={inset ? "true" : undefined}
      {...props}
    >
      {children}
    </div>
  ),
  Separator: ({ className, ...props }: any) => (
    <hr data-testid="menubar-separator" className={className} {...props} />
  ),
  ItemIndicator: ({ children }: any) => (
    <span data-testid="menubar-item-indicator">{children}</span>
  ),
}));

describe("Menubar", () => {
  it("renders Menubar with default classes", () => {
    render(<Menubar />);
    
    const menubarRoot = screen.getByTestId("menubar-root");
    
    expect(menubarRoot).toHaveClass(
      "flex",
      "h-10",
      "items-center",
      "space-x-1",
      "rounded-md",
      "border",
      "bg-background",
      "p-1"
    );
  });

  it("renders Menubar with custom className", () => {
    const customClass = "custom-menubar";
    
    render(<Menubar className={customClass} />);
    
    const menubarRoot = screen.getByTestId("menubar-root");
    expect(menubarRoot).toHaveClass(customClass);
  });

  it("renders MenubarTrigger with correct classes", () => {
    render(<MenubarTrigger>File</MenubarTrigger>);
    
    const trigger = screen.getByTestId("menubar-trigger");
    
    expect(trigger).toHaveClass(
      "flex",
      "cursor-default",
      "select-none",
      "items-center",
      "rounded-sm",
      "px-3",
      "py-1.5",
      "text-sm",
      "font-medium",
      "outline-none"
    );
    expect(trigger).toHaveTextContent("File");
  });

  it("renders MenubarSubTrigger with ChevronRight icon", () => {
    render(<MenubarSubTrigger>Submenu</MenubarSubTrigger>);
    
    const subTrigger = screen.getByTestId("menubar-sub-trigger");
    const chevronIcon = screen.getByTestId("chevron-right-icon");
    
    expect(subTrigger).toHaveTextContent("Submenu");
    expect(chevronIcon).toBeInTheDocument();
  });

  it("renders MenubarSubTrigger with inset prop", () => {
    render(<MenubarSubTrigger inset>Inset Submenu</MenubarSubTrigger>);
    
    const subTrigger = screen.getByTestId("menubar-sub-trigger");
    
    expect(subTrigger).toHaveClass("pl-8");
  });

  it("renders MenubarContent with default props", () => {
    render(<MenubarContent>Content</MenubarContent>);
    
    const content = screen.getByTestId("menubar-content");
    
    expect(content).toHaveClass(
      "z-50",
      "min-w-[12rem]",
      "overflow-hidden",
      "rounded-md",
      "border",
      "bg-popover",
      "p-1",
      "text-popover-foreground",
      "shadow-md"
    );
    expect(content).toHaveAttribute("data-align", "start");
    expect(content).toHaveAttribute("data-align-offset", "-4");
    expect(content).toHaveAttribute("data-side-offset", "8");
  });

  it("renders MenubarItem with default classes", () => {
    render(<MenubarItem>Item</MenubarItem>);
    
    const item = screen.getByTestId("menubar-item");
    
    expect(item).toHaveClass(
      "relative",
      "flex",
      "cursor-default",
      "select-none",
      "items-center",
      "rounded-sm",
      "px-2",
      "py-1.5",
      "text-sm",
      "outline-none"
    );
    expect(item).toHaveTextContent("Item");
  });

  it("renders MenubarItem with inset prop", () => {
    render(<MenubarItem inset>Inset Item</MenubarItem>);
    
    const item = screen.getByTestId("menubar-item");
    
    expect(item).toHaveClass("pl-8");
    // The component doesn't actually set a data-inset attribute, it just adds the pl-8 class
    // So we'll just check the class is applied correctly
  });

  it("renders MenubarCheckboxItem with Check icon", () => {
    render(<MenubarCheckboxItem checked>Checkbox Item</MenubarCheckboxItem>);
    
    const checkboxItem = screen.getByTestId("menubar-checkbox-item");
    const checkIcon = screen.getByTestId("check-icon");
    
    expect(checkboxItem).toHaveTextContent("Checkbox Item");
    expect(checkboxItem).toHaveAttribute("data-checked", "true");
    expect(checkIcon).toBeInTheDocument();
  });

  it("renders MenubarRadioItem with Circle icon", () => {
    render(<MenubarRadioItem>Radio Item</MenubarRadioItem>);
    
    const radioItem = screen.getByTestId("menubar-radio-item");
    const circleIcon = screen.getByTestId("circle-icon");
    
    expect(radioItem).toHaveTextContent("Radio Item");
    expect(circleIcon).toBeInTheDocument();
  });

  it("renders MenubarLabel with default classes", () => {
    render(<MenubarLabel>Label</MenubarLabel>);
    
    const label = screen.getByTestId("menubar-label");
    
    expect(label).toHaveClass(
      "px-2",
      "py-1.5",
      "text-sm",
      "font-semibold"
    );
    expect(label).toHaveTextContent("Label");
  });

  it("renders MenubarSeparator with default classes", () => {
    render(<MenubarSeparator />);
    
    const separator = screen.getByTestId("menubar-separator");
    
    expect(separator).toHaveClass(
      "-mx-1",
      "my-1",
      "h-px",
      "bg-muted"
    );
  });

  it("renders MenubarShortcut with default classes", () => {
    render(<MenubarShortcut>Ctrl+S</MenubarShortcut>);
    
    const shortcut = screen.getByText("Ctrl+S");
    
    expect(shortcut).toHaveClass(
      "ml-auto",
      "text-xs",
      "tracking-widest",
      "text-muted-foreground"
    );
  });

  it("renders Menubar structure", () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
            <MenubarItem>Open</MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Email</MenubarItem>
                <MenubarItem>Message</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
    
    // Just check that the root renders
    expect(screen.getByTestId("menubar-root")).toBeInTheDocument();
  });
});