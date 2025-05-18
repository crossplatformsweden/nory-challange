import { render, screen } from "@testing-library/react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./index";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  ChevronLeft: () => <span data-testid="chevron-left-icon">←</span>,
  ChevronRight: () => <span data-testid="chevron-right-icon">→</span>,
  MoreHorizontal: () => <span data-testid="more-horizontal-icon">⋯</span>,
}));

// Mock the buttonVariants function
jest.mock("@/components/ui/button", () => ({
  buttonVariants: ({ variant, size }: { variant: string; size: string }) => {
    return `btn btn-${variant} btn-${size}`;
  },
}));

describe("Pagination", () => {
  it("renders Pagination component with default classes", () => {
    render(<Pagination />);
    
    const pagination = screen.getByRole("navigation");
    expect(pagination).toHaveClass("mx-auto", "flex", "w-full", "justify-center");
    expect(pagination).toHaveAttribute("aria-label", "pagination");
  });

  it("applies custom className to Pagination", () => {
    const customClass = "custom-pagination";
    render(<Pagination className={customClass} />);
    
    const pagination = screen.getByRole("navigation");
    expect(pagination).toHaveClass(customClass);
  });

  it("renders PaginationContent with default classes", () => {
    render(<PaginationContent />);
    
    const content = screen.getByRole("list");
    expect(content).toHaveClass("flex", "flex-row", "items-center", "gap-1");
  });

  it("applies custom className to PaginationContent", () => {
    const customClass = "custom-content";
    render(<PaginationContent className={customClass} />);
    
    const content = screen.getByRole("list");
    expect(content).toHaveClass(customClass);
  });

  it("renders PaginationItem", () => {
    render(<PaginationItem />);
    
    const item = screen.getByRole("listitem");
    expect(item).toBeInTheDocument();
  });

  it("applies custom className to PaginationItem", () => {
    const customClass = "custom-item";
    render(<PaginationItem className={customClass} />);
    
    const item = screen.getByRole("listitem");
    expect(item).toHaveClass(customClass);
  });

  it("renders PaginationLink with ghost variant by default", () => {
    render(<PaginationLink href="#" />);
    
    const link = screen.getByRole("link");
    expect(link).toHaveClass("btn", "btn-ghost", "btn-icon");
    expect(link).not.toHaveAttribute("aria-current");
  });

  it("renders active PaginationLink with outline variant", () => {
    render(<PaginationLink href="#" isActive />);
    
    const link = screen.getByRole("link");
    expect(link).toHaveClass("btn", "btn-outline", "btn-icon");
    expect(link).toHaveAttribute("aria-current", "page");
  });

  it("renders PaginationPrevious with correct text and icon", () => {
    render(<PaginationPrevious href="#" />);
    
    const link = screen.getByRole("link");
    const icon = screen.getByTestId("chevron-left-icon");
    const text = screen.getByText("Previous");
    
    expect(link).toHaveClass("gap-1", "pl-2.5");
    expect(link).toHaveAttribute("aria-label", "Go to previous page");
    expect(icon).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  it("renders PaginationNext with correct text and icon", () => {
    render(<PaginationNext href="#" />);
    
    const link = screen.getByRole("link");
    const icon = screen.getByTestId("chevron-right-icon");
    const text = screen.getByText("Next");
    
    expect(link).toHaveClass("gap-1", "pr-2.5");
    expect(link).toHaveAttribute("aria-label", "Go to next page");
    expect(icon).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  it("renders PaginationEllipsis with correct icon and screen reader text", () => {
    render(<PaginationEllipsis />);
    
    const ellipsis = screen.getByTestId("more-horizontal-icon").parentElement;
    const srOnly = screen.getByText("More pages");
    
    expect(ellipsis).toHaveClass(
      "flex",
      "h-9",
      "w-9",
      "items-center",
      "justify-center"
    );
    expect(ellipsis).toHaveAttribute("aria-hidden", "true");
    expect(srOnly).toHaveClass("sr-only");
  });

  it("passes additional props to components", () => {
    render(
      <Pagination data-testid="pagination-test">
        <PaginationContent data-testid="content-test">
          <PaginationItem data-testid="item-test">
            <PaginationLink href="#" data-testid="link-test">
              1
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    
    expect(screen.getByTestId("pagination-test")).toBeInTheDocument();
    expect(screen.getByTestId("content-test")).toBeInTheDocument();
    expect(screen.getByTestId("item-test")).toBeInTheDocument();
    expect(screen.getByTestId("link-test")).toBeInTheDocument();
  });

  it("renders a complete pagination structure", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(6);
    expect(screen.getAllByRole("link")).toHaveLength(5);
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("More pages")).toBeInTheDocument();
  });
});