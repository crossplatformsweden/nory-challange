import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioGroup, RadioGroupItem } from "./index";

// Mock Radix UI Radio Group components
jest.mock("@radix-ui/react-radio-group", () => ({
  Root: ({ className, children, ...props }: any) => (
    <div data-testid="radio-group-root" className={className} {...props}>
      {children}
    </div>
  ),
  Item: ({ className, children, ...props }: any) => (
    <button
      data-testid="radio-group-item"
      type="button"
      className={className}
      {...props}
    >
      {children}
    </button>
  ),
  Indicator: ({ className, children }: any) => (
    <span data-testid="radio-group-indicator" className={className}>
      {children}
    </span>
  ),
}));

// Mock lucide-react Circle icon
jest.mock("lucide-react", () => ({
  Circle: () => <div data-testid="circle-icon" />,
}));

describe("RadioGroup", () => {
  it("renders RadioGroup with default classes", () => {
    render(<RadioGroup />);
    
    const radioGroup = screen.getByTestId("radio-group-root");
    expect(radioGroup).toHaveClass("grid", "gap-2");
  });

  it("applies custom className to RadioGroup", () => {
    const customClass = "custom-radio-group";
    render(<RadioGroup className={customClass} />);
    
    const radioGroup = screen.getByTestId("radio-group-root");
    expect(radioGroup).toHaveClass(customClass);
  });

  it("renders RadioGroupItem with default classes", () => {
    render(<RadioGroupItem value="test" />);
    
    const radioItem = screen.getByTestId("radio-group-item");
    expect(radioItem).toHaveClass(
      "aspect-square",
      "h-4",
      "w-4",
      "rounded-full",
      "border",
      "border-primary",
      "text-primary",
      "ring-offset-background",
      "focus:outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-ring",
      "focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed",
      "disabled:opacity-50"
    );
  });

  it("applies custom className to RadioGroupItem", () => {
    const customClass = "custom-radio-item";
    render(<RadioGroupItem value="test" className={customClass} />);
    
    const radioItem = screen.getByTestId("radio-group-item");
    expect(radioItem).toHaveClass(customClass);
  });

  it("renders RadioGroupIndicator with Circle icon", () => {
    render(<RadioGroupItem value="test" />);
    
    const indicator = screen.getByTestId("radio-group-indicator");
    const circleIcon = screen.getByTestId("circle-icon");
    
    expect(indicator).toHaveClass("flex", "items-center", "justify-center");
    expect(circleIcon).toBeInTheDocument();
  });

  it("forwards props to RadioGroup", () => {
    const defaultValue = "option1";
    const name = "test-radio-group";
    const onValueChange = jest.fn();
    
    render(
      <RadioGroup
        defaultValue={defaultValue}
        name={name}
        onValueChange={onValueChange}
        aria-label="Select an option"
      />
    );
    
    const radioGroup = screen.getByTestId("radio-group-root");
    expect(radioGroup).toHaveAttribute("defaultValue", defaultValue);
    expect(radioGroup).toHaveAttribute("name", name);
    expect(radioGroup).toHaveAttribute("aria-label", "Select an option");
  });

  it("forwards props to RadioGroupItem", () => {
    const value = "option1";
    const disabled = true;
    
    render(
      <RadioGroupItem
        value={value}
        disabled={disabled}
        aria-label="Option 1"
      />
    );
    
    const radioItem = screen.getByTestId("radio-group-item");
    expect(radioItem).toHaveAttribute("value", value);
    expect(radioItem).toHaveAttribute("disabled", "");
    expect(radioItem).toHaveAttribute("aria-label", "Option 1");
  });

  it("renders a complete radio group with multiple items", () => {
    render(
      <RadioGroup defaultValue="option2" name="test-options">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="option1" />
          <label htmlFor="option1">Option 1</label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="option2" />
          <label htmlFor="option2">Option 2</label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option3" id="option3" disabled />
          <label htmlFor="option3">Option 3 (disabled)</label>
        </div>
      </RadioGroup>
    );
    
    const radioGroup = screen.getByTestId("radio-group-root");
    const radioItems = screen.getAllByTestId("radio-group-item");
    const indicators = screen.getAllByTestId("radio-group-indicator");
    const circleIcons = screen.getAllByTestId("circle-icon");
    
    expect(radioGroup).toBeInTheDocument();
    expect(radioItems).toHaveLength(3);
    expect(indicators).toHaveLength(3);
    expect(circleIcons).toHaveLength(3);
    
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3 (disabled)")).toBeInTheDocument();
    
    expect(radioItems[2]).toHaveAttribute("disabled", "");
  });
});