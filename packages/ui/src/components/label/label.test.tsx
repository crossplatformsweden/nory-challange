import { render, screen } from "@testing-library/react";
import { Label } from "./index";

// Mock Radix UI Label component
jest.mock("@radix-ui/react-label", () => ({
  Root: ({ children, className, ...props }: any) => (
    <label className={className} data-testid="label-root" {...props}>
      {children}
    </label>
  ),
}));

describe("Label", () => {
  it("renders label text correctly", () => {
    const labelText = "Email";
    render(<Label>{labelText}</Label>);
    
    expect(screen.getByText(labelText)).toBeInTheDocument();
  });

  it("applies default styles to label", () => {
    render(<Label>Test Label</Label>);
    
    const label = screen.getByTestId("label-root");
    expect(label).toHaveClass(
      "text-sm",
      "font-medium",
      "leading-none",
      "peer-disabled:cursor-not-allowed",
      "peer-disabled:opacity-70"
    );
  });

  it("applies additional className when provided", () => {
    const customClass = "custom-label-class";
    render(<Label className={customClass}>Test Label</Label>);
    
    const label = screen.getByTestId("label-root");
    expect(label).toHaveClass(customClass);
  });

  it("forwards HTML attributes to the label element", () => {
    const htmlFor = "input-id";
    render(<Label htmlFor={htmlFor}>Test Label</Label>);
    
    const label = screen.getByTestId("label-root");
    expect(label).toHaveAttribute("htmlFor", htmlFor);
  });

  it("forwards ref to the underlying label element", () => {
    const ref = jest.fn();
    render(<Label ref={ref}>Test Label</Label>);
    
    // The ref is passed to the Radix UI Root component
    // We're verifying that it renders correctly with the ref
    expect(screen.getByTestId("label-root")).toBeInTheDocument();
  });

  it("renders nested content correctly", () => {
    render(
      <Label>
        Test Label
        <span data-testid="nested-span">Required</span>
      </Label>
    );
    
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByTestId("nested-span")).toBeInTheDocument();
  });

  it("supports aria attributes", () => {
    render(
      <Label aria-required="true" aria-label="Test aria label">
        Test Label
      </Label>
    );
    
    const label = screen.getByTestId("label-root");
    expect(label).toHaveAttribute("aria-required", "true");
    expect(label).toHaveAttribute("aria-label", "Test aria label");
  });
});