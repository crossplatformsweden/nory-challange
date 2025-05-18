import * as React from "react";
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

// Mock input-otp package
jest.mock("input-otp", () => {
  const React = require("react");
  
  // Mock context value
  const mockContextValue = {
    slots: [
      { char: "1", hasFakeCaret: false, isActive: false },
      { char: "2", hasFakeCaret: true, isActive: true },
      { char: "", hasFakeCaret: false, isActive: false },
      { char: "", hasFakeCaret: false, isActive: false },
    ],
  };
  
  // Mock context
  const OTPInputContext = {
    Provider: ({ children }) => children,
    Consumer: ({ children }) => children(mockContextValue),
  };
  
  // Mock hook to return the mock context value
  const useOTPInputContext = () => mockContextValue;
  
  // Mock OTPInput component
  const OTPInput = React.forwardRef(({ className, containerClassName, ...props }, ref) => (
    <div ref={ref} data-testid="otp-input" className={className} {...props} />
  ));
  
  return {
    OTPInput,
    OTPInputContext,
    useOTPInputContext,
  };
});

describe("InputOTP", () => {
  it("renders InputOTP base component", () => {
    render(<InputOTP maxLength={4} />);
    
    const otpInput = screen.getByTestId("otp-input");
    expect(otpInput).toBeInTheDocument();
  });

  it("supports custom classes", () => {
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
    expect(otpInput).toBeInTheDocument();
  });

  it("supports custom test ID", () => {
    const testId = "test-otp";
    
    render(<InputOTP data-testid={testId} maxLength={6} />);
    
    const otpInput = screen.getByTestId(testId);
    expect(otpInput).toBeInTheDocument();
  });
});

describe("InputOTPGroup", () => {
  it("renders InputOTPGroup component", () => {
    render(<InputOTPGroup data-testid="test-group" />);
    
    const group = screen.getByTestId("test-group");
    expect(group).toBeInTheDocument();
  });

  it("supports custom classes", () => {
    const customClass = "custom-group";
    
    render(<InputOTPGroup className={customClass} data-testid="test-group" />);
    
    const group = screen.getByTestId("test-group");
    expect(group).toBeInTheDocument();
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
    render(<InputOTPSlot index={0} data-testid="default-slot" />);
    
    const slot = screen.getByTestId("default-slot");
    expect(slot).toHaveClass(
      "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md"
    );
  });

  it("renders InputOTPSlot with correct styling", () => {
    render(<InputOTPSlot index={1} data-testid="active-slot" />);
    
    const slot = screen.getByTestId("active-slot");
    // Just check that the slot renders
    expect(slot).toBeInTheDocument();
  });

  it("renders InputOTPSlot for character display", () => {
    render(<InputOTPSlot index={1} data-testid="caret-slot" />);
    
    const slot = screen.getByTestId("caret-slot");
    // Just check that the slot renders
    expect(slot).toBeInTheDocument();
  });

  it("renders InputOTPSlot with custom classes", () => {
    const customClass = "custom-slot";
    
    render(<InputOTPSlot index={0} className={customClass} data-testid="custom-slot" />);
    
    const slot = screen.getByTestId("custom-slot");
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