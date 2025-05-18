import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "./index";

const meta: Meta<typeof InputOTP> = {
  title: "UI/InputOTP",
  component: InputOTP,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof InputOTP>;

// Wrapper component to avoid ESLint rules-of-hooks error
const BasicWrapper = () => {
  const [value, setValue] = useState("");
  
  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-sm font-medium">Enter 4-digit code</h3>
      <InputOTP
        maxLength={4}
        value={value}
        onChange={setValue}
        render={({ slots }) => (
          <InputOTPGroup>
            {slots.map((slot, index) => (
              <InputOTPSlot key={index} {...slot} index={index} />
            ))}
          </InputOTPGroup>
        )}
      />
      <p className="text-xs text-muted-foreground">Current value: {value || "none"}</p>
    </div>
  );
};

/**
 * Basic InputOTP example with 4 digits.
 */
export const Basic: Story = {
  render: () => <BasicWrapper />,
};

// Wrapper component for WithSeparator story
const WithSeparatorWrapper = () => {
  const [value, setValue] = useState("");
  
  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-sm font-medium">Enter 6-digit code</h3>
      <InputOTP
        maxLength={6}
        value={value}
        onChange={setValue}
        render={({ slots }) => (
          <InputOTPGroup>
            <InputOTPSlot {...slots[0]} index={0} />
            <InputOTPSlot {...slots[1]} index={1} />
            <InputOTPSlot {...slots[2]} index={2} />
            <InputOTPSeparator />
            <InputOTPSlot {...slots[3]} index={3} />
            <InputOTPSlot {...slots[4]} index={4} />
            <InputOTPSlot {...slots[5]} index={5} />
          </InputOTPGroup>
        )}
      />
      <p className="text-xs text-muted-foreground">Current value: {value || "none"}</p>
    </div>
  );
};

/**
 * InputOTP with a separator.
 */
export const WithSeparator: Story = {
  render: () => <WithSeparatorWrapper />,
};

// Wrapper component for CustomStyled story
const CustomStyledWrapper = () => {
  const [value, setValue] = useState("");
  
  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-sm font-medium">Enter PIN</h3>
      <InputOTP
        maxLength={4}
        value={value}
        onChange={setValue}
        render={({ slots }) => (
          <InputOTPGroup>
            {slots.map((slot, index) => (
              <InputOTPSlot
                key={index}
                {...slot}
                index={index}
                className="rounded-md border border-input bg-background h-12 w-12 text-lg"
              />
            ))}
          </InputOTPGroup>
        )}
      />
      <p className="text-xs text-muted-foreground">Current value: {value || "none"}</p>
    </div>
  );
};

/**
 * Custom styled InputOTP slots.
 */
export const CustomStyled: Story = {
  render: () => <CustomStyledWrapper />,
};

// Wrapper component for Disabled story
const DisabledWrapper = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-sm font-medium">Input is disabled</h3>
      <InputOTP
        maxLength={4}
        value="1234"
        disabled
        render={({ slots }) => (
          <InputOTPGroup>
            {slots.map((slot, index) => (
              <InputOTPSlot key={index} {...slot} index={index} />
            ))}
          </InputOTPGroup>
        )}
      />
    </div>
  );
};

/**
 * InputOTP in a disabled state.
 */
export const Disabled: Story = {
  render: () => <DisabledWrapper />,
};

// Wrapper component for PreFilledWithPattern story
const PreFilledWithPatternWrapper = () => {
  const [value, setValue] = useState("123");
  
  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-sm font-medium">Enter numeric code</h3>
      <InputOTP
        maxLength={4}
        value={value}
        onChange={setValue}
        pattern="^[0-9]+$"
        render={({ slots }) => (
          <InputOTPGroup>
            {slots.map((slot, index) => (
              <InputOTPSlot key={index} {...slot} index={index} />
            ))}
          </InputOTPGroup>
        )}
      />
      <p className="text-xs text-muted-foreground">Only numbers allowed</p>
      <p className="text-xs text-muted-foreground">Current value: {value || "none"}</p>
    </div>
  );
};

/**
 * InputOTP with pre-filled value and pattern validation.
 */
export const PreFilledWithPattern: Story = {
  render: () => <PreFilledWithPatternWrapper />,
};

// Wrapper component for MultipleGroups story
const MultipleGroupsWrapper = () => {
  const [value, setValue] = useState("");
  
  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-sm font-medium">Enter verification code</h3>
      <InputOTP
        maxLength={10}
        value={value}
        onChange={setValue}
        render={({ slots }) => (
          <InputOTPGroup className="gap-2">
            <div className="flex">
              <InputOTPSlot {...slots[0]} index={0} />
              <InputOTPSlot {...slots[1]} index={1} />
            </div>
            <InputOTPSeparator />
            <div className="flex">
              <InputOTPSlot {...slots[2]} index={2} />
              <InputOTPSlot {...slots[3]} index={3} />
            </div>
            <InputOTPSeparator />
            <div className="flex">
              <InputOTPSlot {...slots[4]} index={4} />
              <InputOTPSlot {...slots[5]} index={5} />
            </div>
            <InputOTPSeparator />
            <div className="flex">
              <InputOTPSlot {...slots[6]} index={6} />
              <InputOTPSlot {...slots[7]} index={7} />
              <InputOTPSlot {...slots[8]} index={8} />
              <InputOTPSlot {...slots[9]} index={9} />
            </div>
          </InputOTPGroup>
        )}
      />
      <p className="text-xs text-muted-foreground">Format: XX-XX-XX-XXXX</p>
      <p className="text-xs text-muted-foreground">Current value: {value || "none"}</p>
    </div>
  );
};

/**
 * InputOTP with multiple groups and separators.
 */
export const MultipleGroups: Story = {
  render: () => <MultipleGroupsWrapper />,
};