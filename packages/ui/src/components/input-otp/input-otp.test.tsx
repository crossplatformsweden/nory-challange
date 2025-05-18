import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "./index";

// Mock input-otp library
jest.mock("input-otp", () => ({
  OTPInput: ({ children, containerClassName, className, maxLength, ...props }: any) => (
    <div
      data-testid="otp-input"
      className={containerClassName}
      {...props}
    >
      <input
        data-testid="otp-hidden-input"
        className={className}
        maxLength={maxLength}
      />
      {children}
    </div>
  ),
  OTPInputContext: {
    Provider: ({ children, value }: any) => <div>{children}</div>,
    Consumer: ({ children }: any) => children({}),
  },
}));

// Mock lucide-react Dot icon
jest.mock("lucide-react", () => ({
  Dot: () => <span data-testid="dot-icon">•</span>,
}));

// Mock React.useContext to simulate OTPInputContext
const mockContextValue = {
  slots: [
    { char: "1", hasFakeCaret: false, isActive: false },
    { char: "2", hasFakeCaret: true, isActive: true },
    { char: "", hasFakeCaret: false, isActive: false },
    { char: "", hasFakeCaret: false, isActive: false },
  ],
};

jest.spyOn(React, "useContext").mockImplementation(() => mockContextValue);

describe("InputOTP", () => {
  it("renders InputOTP with correct default classes", () => {
    render(<InputOTP maxLength={4} />);
    
    const otpInput = screen.getByTestId("otp-input");
    const hiddenInput = screen.getByTestId("otp-hidden-input");
    
    expect(otpInput).toHaveClass("flex items-center gap-2 has-[:disabled]:opacity-50");
    expect(hiddenInput).toHaveClass("disabled:cursor-not-allowed");
  });

  it("renders InputOTP with custom classes", () => {
    const customContainerClass = "custom-container";
    const customClass = "custom-input";
    
    render(
      <InputOTP
        maxLength={4}
        containerClassName={customContainerClass}
        className={customClass}
      />
    );
    
    const otpInput = screen.getByTestId("otp-input");
    const hiddenInput = screen.getByTestId("otp-hidden-input");
    
    expect(otpInput).toHaveClass(customContainerClass);
    expect(hiddenInput).toHaveClass(customClass);
  });

  it("forwards props to OTPInput", () => {
    const testId = "test-otp";
    const maxLength = 6;
    
    render(<InputOTP data-testid={testId} maxLength={maxLength} />);
    
    const otpInput = screen.getByTestId("otp-input");
    const hiddenInput = screen.getByTestId("otp-hidden-input");
    
    expect(otpInput).toHaveAttribute("data-testid", testId);
    expect(hiddenInput).toHaveAttribute("maxLength", String(maxLength));
  });
});

describe("InputOTPGroup", () => {
  it("renders InputOTPGroup with default classes", () => {
    render(<InputOTPGroup />);
    
    const group = screen.getByRole("group");
    expect(group).toHaveClass("flex items-center");
  });

  it("renders InputOTPGroup with custom classes", () => {
    const customClass = "custom-group";
    
    render(<InputOTPGroup className={customClass} />);
    
    const group = screen.getByRole("group");
    expect(group).toHaveClass(customClass);
    expect(group).toHaveClass("flex items-center");
  });

  it("forwards props to div element", () => {
    const testId = "test-group";
    
    render(<InputOTPGroup data-testid={testId} />);
    
    const group = screen.getByTestId(testId);
    expect(group).toBeInTheDocument();
  });
});

describe("InputOTPSlot", () => {
  it("renders InputOTPSlot with default classes", () => {
    render(<InputOTPSlot index={0} />);
    
    const slot = screen.getByText("1");
    expect(slot).toHaveClass(
      "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md"
    );
  });

  it("renders InputOTPSlot with active state", () => {
    render(<InputOTPSlot index={1} />);
    
    const slot = screen.getByText("2");
    expect(slot).toHaveClass("z-10 ring-2 ring-ring ring-offset-background");
  });

  it("renders InputOTPSlot with fake caret", () => {
    render(<InputOTPSlot index={1} />);
    
    const slot = screen.getByText("2");
    const caret = slot.querySelector(".animate-caret-blink");
    
    expect(caret).toBeInTheDocument();
    expect(caret).toHaveClass("h-4 w-px animate-caret-blink bg-foreground duration-1000");
  });

  it("renders InputOTPSlot with custom classes", () => {
    const customClass = "custom-slot";
    
    render(<InputOTPSlot index={0} className={customClass} />);
    
    const slot = screen.getByText("1");
    expect(slot).toHaveClass(customClass);
  });

  it("forwards props to div element", () => {
    const testId = "test-slot";
    
    render(<InputOTPSlot index={0} data-testid={testId} />);
    
    const slot = screen.getByTestId(testId);
    expect(slot).toBeInTheDocument();
  });
});

describe("InputOTPSeparator", () => {
  it("renders InputOTPSeparator with dot icon", () => {
    render(<InputOTPSeparator />);
    
    const separator = screen.getByRole("separator");
    const dot = screen.getByTestId("dot-icon");
    
    expect(separator).toBeInTheDocument();
    expect(dot).toBeInTheDocument();
  });

  it("forwards props to div element", () => {
    const testId = "test-separator";
    
    render(<InputOTPSeparator data-testid={testId} />);
    
    const separator = screen.getByTestId(testId);
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute("role", "separator");
  });
});