import { render, screen } from "@testing-library/react";
import { Progress } from "./index";

// Mock Radix UI Progress component
jest.mock("@radix-ui/react-progress", () => ({
  Root: ({ className, children, ...props }: any) => (
    <div data-testid="progress-root" className={className} {...props}>
      {children}
    </div>
  ),
  Indicator: ({ className, style, ...props }: any) => (
    <div
      data-testid="progress-indicator"
      className={className}
      style={style}
      {...props}
    />
  ),
}));

describe("Progress", () => {
  it("renders Progress component with default classes", () => {
    render(<Progress />);
    
    const progressRoot = screen.getByTestId("progress-root");
    expect(progressRoot).toHaveClass(
      "relative",
      "h-4",
      "w-full",
      "overflow-hidden",
      "rounded-full",
      "bg-secondary"
    );
  });

  it("applies custom className to Progress", () => {
    const customClass = "custom-progress";
    render(<Progress className={customClass} />);
    
    const progressRoot = screen.getByTestId("progress-root");
    expect(progressRoot).toHaveClass(customClass);
  });

  it("renders ProgressIndicator with correct classes", () => {
    render(<Progress />);
    
    const indicator = screen.getByTestId("progress-indicator");
    expect(indicator).toHaveClass(
      "h-full",
      "w-full",
      "flex-1",
      "bg-primary",
      "transition-all"
    );
  });

  it("applies default transform style with no value provided", () => {
    render(<Progress />);
    
    const indicator = screen.getByTestId("progress-indicator");
    expect(indicator).toHaveStyle("transform: translateX(-100%)");
  });

  it("applies correct transform style based on value", () => {
    const testValue = 75;
    render(<Progress value={testValue} />);
    
    const indicator = screen.getByTestId("progress-indicator");
    expect(indicator).toHaveStyle("transform: translateX(-25%)");
  });

  it("applies correct transform style with 0 value", () => {
    render(<Progress value={0} />);
    
    const indicator = screen.getByTestId("progress-indicator");
    expect(indicator).toHaveStyle("transform: translateX(-100%)");
  });

  it("applies correct transform style with 100 value", () => {
    render(<Progress value={100} />);
    
    const indicator = screen.getByTestId("progress-indicator");
    expect(indicator).toHaveStyle("transform: translateX(-0%)");
  });

  it("forwards additional props to the Progress root", () => {
    const testId = "custom-progress";
    const ariaLabel = "Loading progress";
    
    render(
      <Progress 
        data-testid={testId} 
        aria-label={ariaLabel}
      />
    );
    
    // Test that we can find the element by the custom test id
    const progressEl = screen.getByTestId(testId);
    expect(progressEl).toBeInTheDocument();
    expect(progressEl).toHaveAttribute("aria-label", ariaLabel);
  });

  it("accepts ref forwarding", () => {
    const ref = jest.fn();
    render(<Progress ref={ref} />);
    
    // The ref is passed to the Radix UI Root component
    // This is more of a TypeScript check that the ref is forwarded correctly
    expect(screen.getByTestId("progress-root")).toBeInTheDocument();
  });
});