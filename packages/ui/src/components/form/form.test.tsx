import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./index";
import { Input } from "../input";
import { Button } from "../button";

// Mock components to avoid direct dependencies
jest.mock("@radix-ui/react-label", () => ({
  Root: ({ children, ...props }: any) => (
    <label data-testid="form-label" {...props}>
      {children}
    </label>
  ),
}));

jest.mock("@radix-ui/react-slot", () => ({
  Slot: ({ children, ...props }: any) => (
    <div data-testid="form-control-slot" {...props}>
      {children}
    </div>
  ),
}));

jest.mock("../label", () => ({
  Label: ({ children, ...props }: any) => (
    <label data-testid="ui-label" {...props}>
      {children}
    </label>
  ),
}));

// Example form schema for testing
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const TestForm = ({ onSubmit = jest.fn() }: { onSubmit?: jest.Mock }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormDescription>This is your public display name.</FormDescription>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

describe("Form", () => {
  it("renders form with all subcomponents", () => {
    render(<TestForm />);
    
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("This is your public display name.")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });
  
  it("displays validation error when submitting with invalid data", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    
    render(<TestForm onSubmit={onSubmit} />);
    
    // Submit without entering username
    await user.click(screen.getByRole("button", { name: "Submit" }));
    
    // Check that error message is displayed
    expect(screen.getByText("Username must be at least 2 characters.")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });
  
  it("submits form with valid data", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    
    render(<TestForm onSubmit={onSubmit} />);
    
    // Enter valid username
    await user.type(screen.getByPlaceholderText("Enter username"), "johndoe");
    
    // Submit form
    await user.click(screen.getByRole("button", { name: "Submit" }));
    
    // Check that onSubmit was called with correct data
    expect(onSubmit).toHaveBeenCalledWith({ username: "johndoe" }, expect.anything());
  });
  
  it("applies error styling to label when validation fails", async () => {
    const user = userEvent.setup();
    
    render(<TestForm />);
    
    // Submit without entering username to trigger validation
    await user.click(screen.getByRole("button", { name: "Submit" }));
    
    // Check that label has error class
    const label = screen.getByTestId("ui-label");
    expect(label).toHaveClass("text-destructive");
  });
  
  it("sets correct accessibility attributes on form control", async () => {
    const user = userEvent.setup();
    
    render(<TestForm />);
    
    // Get the form control element
    const formControl = screen.getByTestId("form-control-slot");
    
    // Check initial state
    expect(formControl).toHaveAttribute("aria-invalid", "false");
    
    // Submit without entering username to trigger validation
    await user.click(screen.getByRole("button", { name: "Submit" }));
    
    // Check that aria attributes are updated
    expect(formControl).toHaveAttribute("aria-invalid", "true");
    expect(formControl).toHaveAttribute("aria-describedby", expect.stringContaining("-form-item-description"));
    expect(formControl).toHaveAttribute("aria-describedby", expect.stringContaining("-form-item-message"));
  });
});