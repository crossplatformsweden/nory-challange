import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Popover, PopoverContent, PopoverTrigger } from "./index";

// Mock the Radix UI Popover components
jest.mock("@radix-ui/react-popover", () => ({
  Root: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="popover-root">{children}</div>
  ),
  Trigger: ({ children, ...props }: any) => (
    <button data-testid="popover-trigger" {...props}>
      {children}
    </button>
  ),
  Content: ({
    className,
    children,
    align,
    sideOffset,
    "data-state": dataState,
    "data-side": dataSide,
    ...props
  }: any) => (
    <div
      data-testid="popover-content"
      className={className}
      data-align={align}
      data-side-offset={sideOffset}
      data-state={dataState || "closed"}
      data-side={dataSide || "bottom"}
      {...props}
    >
      {children}
    </div>
  ),
  Portal: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="popover-portal">{children}</div>
  ),
}));

describe("Popover", () => {
  it("renders Popover with trigger and content", () => {
    render(
      <Popover>
        <PopoverTrigger>Click me</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    );

    expect(screen.getByTestId("popover-root")).toBeInTheDocument();
    expect(screen.getByTestId("popover-trigger")).toBeInTheDocument();
    expect(screen.getByTestId("popover-portal")).toBeInTheDocument();
    expect(screen.getByTestId("popover-content")).toBeInTheDocument();
    expect(screen.getByText("Click me")).toBeInTheDocument();
    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });

  it("applies default props to PopoverContent", () => {
    render(
      <Popover>
        <PopoverTrigger>Click me</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    );

    const content = screen.getByTestId("popover-content");
    
    expect(content).toHaveAttribute("data-align", "center");
    expect(content).toHaveAttribute("data-side-offset", "4");
    
    expect(content).toHaveClass(
      "z-50",
      "w-72",
      "rounded-md",
      "border",
      "bg-popover",
      "p-4",
      "text-popover-foreground",
      "shadow-md",
      "outline-none"
    );
    
    // Check for the animation classes
    expect(content).toHaveClass(
      "data-[state=open]:animate-in",
      "data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0",
      "data-[state=open]:fade-in-0"
    );
  });

  it("applies custom className to PopoverContent", () => {
    const customClass = "custom-popover";
    
    render(
      <Popover>
        <PopoverTrigger>Click me</PopoverTrigger>
        <PopoverContent className={customClass}>
          Popover content
        </PopoverContent>
      </Popover>
    );

    const content = screen.getByTestId("popover-content");
    expect(content).toHaveClass(customClass);
  });

  it("forwards align and sideOffset props to PopoverContent", () => {
    render(
      <Popover>
        <PopoverTrigger>Click me</PopoverTrigger>
        <PopoverContent align="start" sideOffset={10}>
          Popover content
        </PopoverContent>
      </Popover>
    );

    const content = screen.getByTestId("popover-content");
    expect(content).toHaveAttribute("data-align", "start");
    expect(content).toHaveAttribute("data-side-offset", "10");
  });

  it("applies animation classes based on state", () => {
    render(
      <Popover>
        <PopoverTrigger>Click me</PopoverTrigger>
        <PopoverContent data-state="open">
          Popover content
        </PopoverContent>
      </Popover>
    );

    const content = screen.getByTestId("popover-content");
    expect(content).toHaveClass("data-[state=open]:animate-in");
    expect(content).toHaveClass("data-[state=open]:fade-in-0");
    expect(content).toHaveClass("data-[state=open]:zoom-in-95");
  });

  it("applies animation classes based on side", () => {
    render(
      <Popover>
        <PopoverTrigger>Click me</PopoverTrigger>
        <PopoverContent data-side="top">
          Popover content from top
        </PopoverContent>
      </Popover>
    );

    const content = screen.getByTestId("popover-content");
    expect(content).toHaveClass("data-[side=top]:slide-in-from-bottom-2");
  });

  it("forwards additional props to the content", () => {
    const testId = "custom-content";
    
    render(
      <Popover>
        <PopoverTrigger>Click me</PopoverTrigger>
        <PopoverContent data-custom-id={testId}>
          Popover content
        </PopoverContent>
      </Popover>
    );

    const content = screen.getByTestId("popover-content");
    expect(content).toHaveAttribute("data-custom-id", testId);
  });

  it("passes props to PopoverTrigger", () => {
    render(
      <Popover>
        <PopoverTrigger data-testid="custom-trigger" aria-label="Open popover">
          Click me
        </PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    );

    const trigger = screen.getByText("Click me");
    expect(trigger).toHaveAttribute("data-testid", "custom-trigger");
    expect(trigger).toHaveAttribute("aria-label", "Open popover");
  });
});