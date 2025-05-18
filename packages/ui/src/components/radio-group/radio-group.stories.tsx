import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "../label";
import { RadioGroup, RadioGroupItem } from "./index";

const meta: Meta<typeof RadioGroup> = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

/**
 * Basic radio group with options.
 */
export const Basic: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="option-three" />
        <Label htmlFor="option-three">Option Three</Label>
      </div>
    </RadioGroup>
  ),
};

/**
 * Radio group with a disabled option.
 */
export const WithDisabledOption: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="r-option-one" />
        <Label htmlFor="r-option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="r-option-two" disabled />
        <Label
          htmlFor="r-option-two"
          className="text-muted-foreground"
        >
          Option Two (Disabled)
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="r-option-three" />
        <Label htmlFor="r-option-three">Option Three</Label>
      </div>
    </RadioGroup>
  ),
};

/**
 * Radio group with horizontal layout.
 */
export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one" className="flex flex-row space-x-8 space-y-0">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="h-option-one" />
        <Label htmlFor="h-option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="h-option-two" />
        <Label htmlFor="h-option-two">Option Two</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="h-option-three" />
        <Label htmlFor="h-option-three">Option Three</Label>
      </div>
    </RadioGroup>
  ),
};

/**
 * Radio group for selecting a plan.
 */
export const Plans: Story = {
  render: () => (
    <RadioGroup defaultValue="standard">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="relative">
            <RadioGroupItem
              value="free"
              id="free"
              className="sr-only"
            />
            <Label
              htmlFor="free"
              className="block cursor-pointer rounded-lg border p-4 hover:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <span className="mb-1 block font-medium">Free</span>
              <span className="block text-xs text-muted-foreground">
                Basic features for personal use
              </span>
              <span className="mt-4 block font-bold">$0</span>
            </Label>
          </div>
        </div>
        <div>
          <div className="relative">
            <RadioGroupItem
              value="standard"
              id="standard"
              className="sr-only"
            />
            <Label
              htmlFor="standard"
              className="block cursor-pointer rounded-lg border p-4 hover:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <span className="mb-1 block font-medium">Standard</span>
              <span className="block text-xs text-muted-foreground">
                Advanced features for professionals
              </span>
              <span className="mt-4 block font-bold">$9/month</span>
            </Label>
          </div>
        </div>
        <div>
          <div className="relative">
            <RadioGroupItem
              value="pro"
              id="pro"
              className="sr-only"
            />
            <Label
              htmlFor="pro"
              className="block cursor-pointer rounded-lg border p-4 hover:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <span className="mb-1 block font-medium">Pro</span>
              <span className="block text-xs text-muted-foreground">
                Premium features for teams
              </span>
              <span className="mt-4 block font-bold">$19/month</span>
            </Label>
          </div>
        </div>
      </div>
    </RadioGroup>
  ),
};

/**
 * Card-style radio group for selecting an option.
 */
export const CardOptions: Story = {
  render: () => (
    <RadioGroup defaultValue="card">
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <RadioGroupItem
            value="card"
            id="payment-card"
            className="absolute right-4 top-4 h-5 w-5"
          />
          <Label
            htmlFor="payment-card"
            className="flex cursor-pointer flex-col items-start rounded-lg border p-6 hover:border-primary"
          >
            <div className="flex items-center justify-between">
              <span className="mb-1 block font-medium">Card Payment</span>
            </div>
            <span className="block text-sm text-muted-foreground">
              Pay with credit or debit card.
            </span>
          </Label>
        </div>
        <div className="relative">
          <RadioGroupItem
            value="paypal"
            id="payment-paypal"
            className="absolute right-4 top-4 h-5 w-5"
          />
          <Label
            htmlFor="payment-paypal"
            className="flex cursor-pointer flex-col items-start rounded-lg border p-6 hover:border-primary"
          >
            <div className="flex items-center justify-between">
              <span className="mb-1 block font-medium">PayPal</span>
            </div>
            <span className="block text-sm text-muted-foreground">
              Pay with your PayPal account.
            </span>
          </Label>
        </div>
      </div>
    </RadioGroup>
  ),
};

/**
 * Different sized radio buttons.
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-8">
      <RadioGroup defaultValue="option-one">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="s-option-one" className="h-3 w-3" />
            <Label htmlFor="s-option-one" className="text-sm">Small</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="s-option-two" />
            <Label htmlFor="s-option-two">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-three" id="s-option-three" className="h-5 w-5" />
            <Label htmlFor="s-option-three" className="text-lg">Large</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-four" id="s-option-four" className="h-6 w-6" />
            <Label htmlFor="s-option-four" className="text-xl">Extra Large</Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  ),
};

/**
 * Radio group with custom styling.
 */
export const CustomStyling: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem 
          value="option-one" 
          id="c-option-one" 
          className="border-blue-500 text-blue-500 focus-visible:ring-blue-300"
        />
        <Label htmlFor="c-option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem 
          value="option-two" 
          id="c-option-two"
          className="border-green-500 text-green-500 focus-visible:ring-green-300"
        />
        <Label htmlFor="c-option-two">Option Two</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem 
          value="option-three" 
          id="c-option-three"
          className="border-red-500 text-red-500 focus-visible:ring-red-300"
        />
        <Label htmlFor="c-option-three">Option Three</Label>
      </div>
    </RadioGroup>
  ),
};