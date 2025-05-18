import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./index";
import { Input } from "../input";
import { Checkbox } from "../checkbox";

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

/**
 * Basic usage of the Label component.
 */
export const Basic: Story = {
  render: () => <Label>Label Text</Label>,
};

/**
 * Label associated with an input field.
 */
export const WithInput: Story = {
  render: () => {
    const id = "email";
    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor={id}>Email</Label>
        <Input type="email" id={id} placeholder="Email" />
      </div>
    );
  },
};

/**
 * Required label that adds a visual indicator.
 */
export const Required: Story = {
  render: () => {
    const id = "username-required";
    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor={id}>
          Username
          <span className="text-destructive ml-1">*</span>
        </Label>
        <Input type="text" id={id} placeholder="Username" required />
      </div>
    );
  },
};

/**
 * Label with a description underneath.
 */
export const WithDescription: Story = {
  render: () => {
    const id = "username-with-description";
    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor={id}>Username</Label>
        <Input type="text" id={id} placeholder="Username" />
        <p className="text-sm text-muted-foreground">This will be your public display name.</p>
      </div>
    );
  },
};

/**
 * Label with a checkbox input.
 */
export const WithCheckbox: Story = {
  render: () => {
    const id = "terms";
    return (
      <div className="flex items-center space-x-2">
        <Checkbox id={id} />
        <Label htmlFor={id}>Accept terms and conditions</Label>
      </div>
    );
  },
};

/**
 * Label in a disabled state.
 */
export const Disabled: Story = {
  render: () => {
    const id = "disabled-input";
    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor={id} className="text-muted-foreground">
          Disabled Field
        </Label>
        <Input type="text" id={id} disabled value="Disabled input example" />
      </div>
    );
  },
};

/**
 * Label with custom styles.
 */
export const CustomStyling: Story = {
  render: () => {
    const id = "custom-styled-label";
    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label 
          htmlFor={id} 
          className="text-primary font-bold text-base uppercase tracking-wide"
        >
          Custom Styled Label
        </Label>
        <Input type="text" id={id} placeholder="Enter text" />
      </div>
    );
  },
};

/**
 * Multiple labels and inputs in a form layout.
 */
export const FormLayout: Story = {
  render: () => {
    return (
      <form className="w-full max-w-md space-y-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="first-name">First Name</Label>
          <Input type="text" id="first-name" placeholder="First Name" />
        </div>
        
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="last-name">Last Name</Label>
          <Input type="text" id="last-name" placeholder="Last Name" />
        </div>
        
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email-address">Email Address</Label>
          <Input type="email" id="email-address" placeholder="Email Address" />
          <p className="text-sm text-muted-foreground">We'll never share your email with anyone else.</p>
        </div>
      </form>
    );
  },
};