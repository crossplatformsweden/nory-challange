import type { Meta, StoryObj } from "@storybook/react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "./index";
import { Card, CardContent } from "../card";

const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
      description: "The orientation of the carousel",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-sm">
      <Carousel {...args} className="w-full">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  args: {
    orientation: "horizontal",
  },
};

export const Multiple: Story = {
  render: (args) => (
    <div className="w-full max-w-sm">
      <Carousel {...args} className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/3">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  args: {
    orientation: "horizontal",
    opts: {
      align: "start",
    },
  },
};

export const Vertical: Story = {
  render: (args) => (
    <div className="h-[300px]">
      <Carousel {...args} className="h-full w-full max-w-xs">
        <CarouselContent className="h-full">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="h-full pt-4">
              <Card>
                <CardContent className="flex items-center justify-center p-6 h-full">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  args: {
    orientation: "vertical",
  },
};

export const CustomButtons: Story = {
  render: (args) => (
    <div className="w-full max-w-sm">
      <Carousel {...args} className="w-full">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-2 mt-4">
          <CarouselPrevious 
            variant="secondary" 
            size="sm" 
            className="static translate-y-0 rounded-md h-8" 
          />
          <CarouselNext 
            variant="secondary"
            size="sm" 
            className="static translate-y-0 rounded-md h-8" 
          />
        </div>
      </Carousel>
    </div>
  ),
  args: {
    orientation: "horizontal",
  },
};

export const WithImages: Story = {
  render: (args) => (
    <div className="w-full max-w-sm">
      <Carousel {...args} className="w-full">
        <CarouselContent>
          {["mountains", "city", "forest", "beach", "sunset"].map((image, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-0">
                  <img
                    src={`https://source.unsplash.com/random/300x300?${image}`}
                    alt={`Random ${image} image`}
                    className="aspect-square object-cover"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  args: {
    orientation: "horizontal",
  },
};