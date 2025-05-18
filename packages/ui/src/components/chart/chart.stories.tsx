import type { Meta, StoryObj } from "@storybook/react";
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "./index";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis
} from "recharts";

const meta: Meta<typeof ChartContainer> = {
  title: "Components/Chart",
  component: ChartContainer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChartContainer>;

// Sample data
const lineData = [
  { name: "Jan", visits: 100, revenue: 1200 },
  { name: "Feb", visits: 200, revenue: 1800 },
  { name: "Mar", visits: 150, revenue: 1500 },
  { name: "Apr", visits: 300, revenue: 2000 },
  { name: "May", visits: 250, revenue: 1900 },
  { name: "Jun", visits: 400, revenue: 2200 },
];

const barData = [
  { name: "Product A", sales: 400, returns: 24 },
  { name: "Product B", sales: 300, returns: 13 },
  { name: "Product C", sales: 200, returns: 9 },
  { name: "Product D", sales: 278, returns: 20 },
  { name: "Product E", sales: 189, returns: 5 },
];

const pieData = [
  { name: "Mobile", value: 400 },
  { name: "Desktop", value: 300 },
  { name: "Tablet", value: 200 },
  { name: "Other", value: 100 },
];

export const LineChartDemo: Story = {
  render: (args) => (
    <ChartContainer
      className="w-full max-w-md rounded-xl border p-4"
      config={{
        visits: {
          label: "Visits",
          theme: {
            light: "rgb(29, 78, 216)",
            dark: "rgb(96, 165, 250)",
          },
        },
        revenue: {
          label: "Revenue ($)",
          theme: {
            light: "rgb(22, 163, 74)",
            dark: "rgb(134, 239, 172)",
          },
        },
      }}
      {...args}
    >
      {({ width, height }) => (
        <LineChart width={width} height={height} data={lineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <ChartTooltip
            content={<ChartTooltipContent />}
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="visits"
            stroke="var(--color-visits)"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="revenue"
            stroke="var(--color-revenue)"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      )}
    </ChartContainer>
  ),
};

export const BarChartDemo: Story = {
  render: (args) => (
    <ChartContainer
      className="w-full max-w-md rounded-xl border p-4"
      config={{
        sales: {
          label: "Sales",
          theme: {
            light: "rgb(29, 78, 216)",
            dark: "rgb(96, 165, 250)",
          },
        },
        returns: {
          label: "Returns",
          theme: {
            light: "rgb(220, 38, 38)",
            dark: "rgb(248, 113, 113)",
          },
        },
      }}
      {...args}
    >
      {({ width, height }) => (
        <BarChart width={width} height={height} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip
            content={<ChartTooltipContent />}
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="sales" fill="var(--color-sales)" />
          <Bar dataKey="returns" fill="var(--color-returns)" />
        </BarChart>
      )}
    </ChartContainer>
  ),
};

export const AreaChartDemo: Story = {
  render: (args) => (
    <ChartContainer
      className="w-full max-w-md rounded-xl border p-4"
      config={{
        visits: {
          label: "Visits",
          theme: {
            light: "rgba(29, 78, 216, 0.8)",
            dark: "rgba(96, 165, 250, 0.8)",
          },
        },
        revenue: {
          label: "Revenue ($)",
          theme: {
            light: "rgba(22, 163, 74, 0.8)",
            dark: "rgba(134, 239, 172, 0.8)",
          },
        },
      }}
      {...args}
    >
      {({ width, height }) => (
        <AreaChart width={width} height={height} data={lineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip
            content={<ChartTooltipContent />}
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Area
            type="monotone"
            dataKey="visits"
            stackId="1"
            stroke="var(--color-visits)"
            fill="var(--color-visits)"
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stackId="2"
            stroke="var(--color-revenue)"
            fill="var(--color-revenue)"
          />
        </AreaChart>
      )}
    </ChartContainer>
  ),
};

export const PieChartDemo: Story = {
  render: (args) => (
    <ChartContainer
      className="w-full max-w-md rounded-xl border p-4"
      config={{
        Mobile: {
          label: "Mobile",
          color: "#3498db",
        },
        Desktop: {
          label: "Desktop",
          color: "#2ecc71",
        },
        Tablet: {
          label: "Tablet",
          color: "#f39c12",
        },
        Other: {
          label: "Other",
          color: "#e74c3c",
        },
      }}
      {...args}
    >
      {({ width, height }) => (
        <PieChart width={width} height={height}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          />
          <ChartTooltip
            content={<ChartTooltipContent />}
          />
          <ChartLegend content={<ChartLegendContent />} />
        </PieChart>
      )}
    </ChartContainer>
  ),
};