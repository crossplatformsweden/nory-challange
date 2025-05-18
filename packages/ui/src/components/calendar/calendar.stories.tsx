import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./index";
import { useState } from "react";

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: { type: "radio" },
      options: ["single", "multiple", "range"],
      description: "The selection mode of the calendar",
    },
    selected: {
      control: { type: "date" },
      description: "The selected date(s)",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disables the calendar",
    },
    showOutsideDays: {
      control: { type: "boolean" },
      description: "Show days from the previous and next months",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {
    mode: "single",
    className: "rounded-md border",
  },
};

export const Selected: Story = {
  args: {
    mode: "single",
    selected: new Date(),
    className: "rounded-md border",
  },
};

// Wrapper components to avoid rules-of-hooks ESLint errors
const DateRangeWrapper = (args: any) => {
  const [date, setDate] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 5)),
  });

  return (
    <Calendar
      {...args}
      mode="range"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
      numberOfMonths={2}
    />
  );
};

export const DateRange: Story = {
  render: (args) => <DateRangeWrapper {...args} />,
};

export const MultiMonth: Story = {
  args: {
    mode: "single",
    className: "rounded-md border",
    numberOfMonths: 2,
  },
};

export const DisabledDates: Story = {
  args: {
    mode: "single",
    className: "rounded-md border",
    disabled: [
      { before: new Date(new Date().setDate(new Date().getDate() - 1)) },
      { after: new Date(new Date().setDate(new Date().getDate() + 7)) },
      { dayOfWeek: [0, 6] }, // Disable weekends
    ],
  },
};

// Wrapper component for WithFooter story
const WithFooterWrapper = (args: any) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-4">
      <Calendar
        {...args}
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      <div className="rounded-md border p-2 text-center text-sm">
        {date ? (
          <span>
            Selected date: {date.toLocaleDateString()}
          </span>
        ) : (
          <span>No date selected</span>
        )}
      </div>
    </div>
  );
};

export const WithFooter: Story = {
  render: (args) => <WithFooterWrapper {...args} />,
};