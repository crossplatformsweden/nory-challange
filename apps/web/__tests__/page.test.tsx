import { render, screen } from "@testing-library/react";
import Page from "../app/page";

// Mock the next/image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  },
}));

// Mock the components from @repo/ui
jest.mock("@repo/ui/card", () => ({
  Card: ({ title, children, href }: any) => (
    <div data-testid="card">
      <h2>{title}</h2>
      <p>{children}</p>
      <a href={href}>Link</a>
    </div>
  ),
}));

jest.mock("@repo/ui/gradient", () => ({
  Gradient: () => <div data-testid="gradient" />,
}));

jest.mock("@repo/ui/turborepo-logo", () => ({
  TurborepoLogo: () => <div data-testid="turborepo-logo" />,
}));

describe("Page Component", () => {
  it("renders the page component correctly", () => {
    render(<Page />);
    
    // Check that the title is in the document
    expect(screen.getByText(/examples\/with-tailwind/i)).toBeInTheDocument();
    
    // Check that all links are rendered
    expect(screen.getAllByTestId("card")).toHaveLength(4);
    
    // Check for specific card titles
    expect(screen.getByRole('heading', { name: /Docs/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Learn/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Templates/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Deploy/i })).toBeInTheDocument();
  });
});