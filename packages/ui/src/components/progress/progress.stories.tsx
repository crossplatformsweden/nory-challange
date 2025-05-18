import type { Meta, StoryObj } from "@storybook/react";
import { useState, useEffect } from "react";
import { Progress } from "./index";

const meta: Meta<typeof Progress> = {
  title: "UI/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

/**
 * Basic usage of the Progress component.
 */
export const Basic: Story = {
  render: () => (
    <div className="w-[500px]">
      <Progress value={33} />
    </div>
  ),
};

/**
 * Progress with different values.
 */
export const Values: Story = {
  render: () => (
    <div className="w-[500px] space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">0%</span>
        <Progress value={0} className="w-4/5" />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">25%</span>
        <Progress value={25} className="w-4/5" />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">50%</span>
        <Progress value={50} className="w-4/5" />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">75%</span>
        <Progress value={75} className="w-4/5" />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">100%</span>
        <Progress value={100} className="w-4/5" />
      </div>
    </div>
  ),
};

/**
 * Progress with indeterminate loading animation.
 */
export const Indeterminate: Story = {
  render: () => (
    <div className="w-[500px]">
      <style>
        {`
          @keyframes indeterminate {
            0% {
              transform: translateX(-100%);
            }
            50% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          .indeterminate {
            animation: indeterminate 1.5s infinite;
            transform: none !important; 
            width: 50% !important;
          }
        `}
      </style>
      <Progress>
        <div 
          data-testid="progress-indicator" 
          className="h-full bg-primary transition-all indeterminate"
        />
      </Progress>
      <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
    </div>
  ),
};

/**
 * Animated progress bar that updates over time.
 */
export const Animated: Story = {
  render: () => {
    // This component uses state, so we need to use function component syntax
    const AnimatedProgress = () => {
      const [progress, setProgress] = useState(0);
      
      useEffect(() => {
        const timer = setTimeout(() => {
          setProgress((prevProgress) => 
            prevProgress >= 100 ? 0 : prevProgress + 5
          );
        }, 500);
        
        return () => clearTimeout(timer);
      }, [progress]);
      
      return (
        <div className="w-[500px] space-y-4">
          <Progress value={progress} />
          <div className="flex justify-between">
            <span className="text-sm">Progress: {progress}%</span>
            {progress === 100 && (
              <span className="text-sm text-green-500">Complete!</span>
            )}
          </div>
        </div>
      );
    };
    
    return <AnimatedProgress />;
  },
};

/**
 * Custom styled progress bars.
 */
export const CustomStyling: Story = {
  render: () => (
    <div className="w-[500px] space-y-4">
      <Progress 
        value={65} 
        className="h-2 bg-slate-200" 
      />
      
      <Progress 
        value={45} 
        className="h-3 bg-blue-100" 
      />
      
      <Progress 
        value={85} 
        className="h-4 bg-gray-100 rounded-sm" 
      />
      
      <div className="bg-white p-1 border rounded-lg">
        <Progress 
          value={60} 
          className="h-2 bg-transparent" 
        />
      </div>
      
      <div className="relative">
        <Progress 
          value={75} 
          className="h-8 bg-blue-50" 
        />
        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
          75% Complete
        </span>
      </div>
    </div>
  ),
};

/**
 * Progress bar with a label showing the current value.
 */
export const WithLabel: Story = {
  render: () => {
    const LabeledProgress = () => {
      const [progress, setProgress] = useState(45);
      
      return (
        <div className="w-[500px] space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} />
          <div className="flex justify-between gap-4 pt-4">
            <button 
              className="rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground"
              onClick={() => setProgress(Math.max(0, progress - 10))}
            >
              Decrease
            </button>
            <button
              className="rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground"
              onClick={() => setProgress(Math.min(100, progress + 10))}
            >
              Increase
            </button>
          </div>
        </div>
      );
    };
    
    return <LabeledProgress />;
  },
};

/**
 * Progress bar for a file upload example.
 */
export const FileUpload: Story = {
  render: () => {
    const FileUploadProgress = () => {
      const [progress, setProgress] = useState(0);
      const [status, setStatus] = useState("idle"); // idle, uploading, complete, error
      
      const startUpload = () => {
        setStatus("uploading");
        setProgress(0);
        
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              setStatus("complete");
              return 100;
            }
            return prev + 5;
          });
        }, 300);
      };
      
      return (
        <div className="w-[500px] space-y-4 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">document.pdf</span>
            <span className="text-xs text-muted-foreground">2.4MB</span>
          </div>
          
          <Progress value={progress} className="h-2" />
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {status === "idle" && "Ready to upload"}
              {status === "uploading" && `Uploading... ${progress}%`}
              {status === "complete" && "Upload complete"}
              {status === "error" && "Upload failed"}
            </span>
            
            {status === "idle" || status === "complete" ? (
              <button
                className="rounded-md bg-primary px-3 py-1 text-xs text-primary-foreground"
                onClick={startUpload}
              >
                {status === "complete" ? "Upload again" : "Start upload"}
              </button>
            ) : (
              <button
                className="rounded-md bg-destructive px-3 py-1 text-xs text-destructive-foreground"
                onClick={() => setStatus("idle")}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      );
    };
    
    return <FileUploadProgress />;
  },
};