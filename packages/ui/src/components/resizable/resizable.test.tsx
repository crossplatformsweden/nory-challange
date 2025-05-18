import { render, screen } from "@testing-library/react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./index";

// Mock react-resizable-panels
jest.mock("react-resizable-panels", () => ({
  PanelGroup: ({ children, className, ...props }: any) => (
    <div data-testid="resizable-panel-group" className={className} {...props}>
      {children}
    </div>
  ),
  Panel: ({ children, className, ...props }: any) => (
    <div data-testid="resizable-panel" className={className} {...props}>
      {children}
    </div>
  ),
  PanelResizeHandle: ({ children, className, ...props }: any) => (
    <div
      data-testid="resizable-panel-handle"
      className={className}
      {...props}
    >
      {children}
    </div>
  ),
}));

// Mock lucide-react
jest.mock("lucide-react", () => ({
  GripVertical: () => <div data-testid="grip-vertical-icon">≡</div>,
}));

describe("Resizable", () => {
  it("renders ResizablePanelGroup with default classes", () => {
    render(<ResizablePanelGroup />);
    
    const panelGroup = screen.getByTestId("resizable-panel-group");
    expect(panelGroup).toHaveClass(
      "flex",
      "h-full",
      "w-full",
      "data-[panel-group-direction=vertical]:flex-col"
    );
  });

  it("applies custom className to ResizablePanelGroup", () => {
    const customClass = "custom-panel-group";
    render(<ResizablePanelGroup className={customClass} />);
    
    const panelGroup = screen.getByTestId("resizable-panel-group");
    expect(panelGroup).toHaveClass(customClass);
  });

  it("forwards props to ResizablePanelGroup", () => {
    const direction = "horizontal";
    render(<ResizablePanelGroup direction={direction} data-custom="test" />);
    
    const panelGroup = screen.getByTestId("resizable-panel-group");
    expect(panelGroup).toHaveAttribute("direction", direction);
    expect(panelGroup).toHaveAttribute("data-custom", "test");
  });

  it("renders ResizablePanel", () => {
    render(<ResizablePanel data-testid="panel-test" />);
    
    const panel = screen.getByTestId("panel-test");
    expect(panel).toBeInTheDocument();
  });

  it("renders ResizableHandle with default classes", () => {
    render(<ResizableHandle />);
    
    const handle = screen.getByTestId("resizable-panel-handle");
    expect(handle).toHaveClass(
      "relative",
      "flex",
      "w-px",
      "items-center",
      "justify-center",
      "bg-border"
    );
  });

  it("applies custom className to ResizableHandle", () => {
    const customClass = "custom-handle";
    render(<ResizableHandle className={customClass} />);
    
    const handle = screen.getByTestId("resizable-panel-handle");
    expect(handle).toHaveClass(customClass);
  });

  it("renders ResizableHandle without grip handle by default", () => {
    render(<ResizableHandle />);
    
    expect(screen.queryByTestId("grip-vertical-icon")).not.toBeInTheDocument();
  });

  it("renders ResizableHandle with grip handle when withHandle is true", () => {
    render(<ResizableHandle withHandle />);
    
    const gripIcon = screen.getByTestId("grip-vertical-icon");
    expect(gripIcon).toBeInTheDocument();
    
    // Check the container for the grip icon
    const gripContainer = gripIcon.parentElement;
    expect(gripContainer).toHaveClass(
      "z-10",
      "flex",
      "h-4",
      "w-3",
      "items-center",
      "justify-center",
      "rounded-sm",
      "border",
      "bg-border"
    );
  });

  it("forwards props to ResizableHandle", () => {
    render(<ResizableHandle id="test-handle" data-custom="test" />);
    
    const handle = screen.getByTestId("resizable-panel-handle");
    expect(handle).toHaveAttribute("id", "test-handle");
    expect(handle).toHaveAttribute("data-custom", "test");
  });

  it("renders a complete resizable panel layout", () => {
    render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25} minSize={20}>
          <div>Left Panel</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <div>Right Panel</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    );
    
    const panelGroup = screen.getByTestId("resizable-panel-group");
    const panels = screen.getAllByTestId("resizable-panel");
    const handle = screen.getByTestId("resizable-panel-handle");
    const gripIcon = screen.getByTestId("grip-vertical-icon");
    
    expect(panelGroup).toBeInTheDocument();
    expect(panels).toHaveLength(2);
    expect(handle).toBeInTheDocument();
    expect(gripIcon).toBeInTheDocument();
    
    expect(screen.getByText("Left Panel")).toBeInTheDocument();
    expect(screen.getByText("Right Panel")).toBeInTheDocument();
  });
});