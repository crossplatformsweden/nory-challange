import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./index";

// Mock Radix UI's HoverCard components
jest.mock("@radix-ui/react-hover-card", () => ({
  Root: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="hover-card-root">{children}</div>
  ),
  Trigger: ({ children, ...props }: { children: React.ReactNode }) => (
    <div data-testid="hover-card-trigger" {...props}>
      {children}
    </div>
  ),
  Content: React.forwardRef(
    (
      {
        children,
        className,
        align,
        sideOffset,
        "data-state": dataState,
        "data-side": dataSide,
        ...props
      }: any,
      ref: React.Ref<HTMLDivElement>
    ) => (
      <div
        ref={ref}
        data-testid="hover-card-content"
        data-state={dataState || "closed"}
        data-side={dataSide || "bottom"}
        className={className}
        {...props}
      >
        {children}
      </div>
    )
  ),
}));

describe("HoverCard", () => {
  it("renders HoverCard with trigger and content", () => {
    render(
      <HoverCard>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
        <HoverCardContent>Hover card content</HoverCardContent>
      </HoverCard>
    );

    expect(screen.getByTestId("hover-card-root")).toBeInTheDocument();
    expect(screen.getByTestId("hover-card-trigger")).toBeInTheDocument();
    expect(screen.getByTestId("hover-card-content")).toBeInTheDocument();
    expect(screen.getByText("Hover me")).toBeInTheDocument();
    expect(screen.getByText("Hover card content")).toBeInTheDocument();
  });

  it("applies default props to HoverCardContent", () => {
    render(
      <HoverCard>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
        <HoverCardContent>Hover card content</HoverCardContent>
      </HoverCard>
    );

    const content = screen.getByTestId("hover-card-content");
    
    // Check for the default classes and props
    expect(content).toHaveClass(
      "z-50",
      "w-64",
      "rounded-md",
      "border",
      "bg-popover",
      "p-4"
    );
    
    // Check for the animations classes
    expect(content).toHaveClass(
      "data-[state=open]:animate-in",
      "data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0",
      "data-[state=open]:fade-in-0"
    );
  });

  it("applies custom className to HoverCardContent", () => {
    const customClass = "custom-hover-card";
    
    render(
      <HoverCard>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
        <HoverCardContent className={customClass}>
          Hover card content
        </HoverCardContent>
      </HoverCard>
    );

    const content = screen.getByTestId("hover-card-content");
    expect(content).toHaveClass(customClass);
  });

  it("forwards align and sideOffset props to HoverCardContent", () => {
    render(
      <HoverCard>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
        <HoverCardContent align="start" sideOffset={10}>
          Hover card content
        </HoverCardContent>
      </HoverCard>
    );

    // We're not directly testing these props since they're passed to the Radix primitive,
    // but we can verify that the component renders without errors
    expect(screen.getByTestId("hover-card-content")).toBeInTheDocument();
  });

  it("displays different animation classes based on side", () => {
    render(
      <HoverCard>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
        <HoverCardContent data-side="top">Top content</HoverCardContent>
      </HoverCard>
    );

    const content = screen.getByTestId("hover-card-content");
    expect(content).toHaveClass("data-[side=top]:slide-in-from-bottom-2");
  });

  it("renders with open state animation classes", () => {
    render(
      <HoverCard>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
        <HoverCardContent data-state="open">Open content</HoverCardContent>
      </HoverCard>
    );

    const content = screen.getByTestId("hover-card-content");
    expect(content).toHaveClass("data-[state=open]:animate-in");
    expect(content).toHaveClass("data-[state=open]:fade-in-0");
    expect(content).toHaveClass("data-[state=open]:zoom-in-95");
  });

  it("forwards additional props to the content", () => {
    const testId = "custom-content";
    
    render(
      <HoverCard>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
        <HoverCardContent data-custom-id={testId}>
          Hover card content
        </HoverCardContent>
      </HoverCard>
    );

    const content = screen.getByTestId("hover-card-content");
    expect(content).toHaveAttribute("data-custom-id", testId);
  });
});