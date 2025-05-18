import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './index';

describe('Accordion', () => {
  it('renders accordion items correctly', () => {
    render(
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    // Test that the trigger buttons are rendered
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    
    // With defaultValue="item-1", the first item's content should be visible
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('expands and collapses items on click', async () => {
    render(
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const user = userEvent.setup();
    
    // First item should be expanded by default
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    
    // Confirm item 1 is open and item 2 is closed by checking data-state
    const item1 = screen.getByText('Item 1').closest('button');
    const item2 = screen.getByText('Item 2').closest('button');
    expect(item1).toHaveAttribute('data-state', 'open');
    expect(item2).toHaveAttribute('data-state', 'closed');
    
    // Click second item
    await user.click(screen.getByText('Item 2'));
    
    // After clicking item 2, first item should be closed, second open
    expect(item1).toHaveAttribute('data-state', 'closed');
    expect(item2).toHaveAttribute('data-state', 'open');
  });

  it('allows multiple items to be open when type is "multiple"', async () => {
    render(
      <Accordion type="multiple" defaultValue={["item-1"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const user = userEvent.setup();
    
    // Get trigger buttons
    const item1 = screen.getByText('Item 1').closest('button');
    const item2 = screen.getByText('Item 2').closest('button');
    
    // First item should be open by default
    expect(item1).toHaveAttribute('data-state', 'open');
    expect(item2).toHaveAttribute('data-state', 'closed');
    
    // Click second item to open it too
    await user.click(screen.getByText('Item 2'));
    
    // Now both items should have data-state="open"
    expect(item1).toHaveAttribute('data-state', 'open');
    expect(item2).toHaveAttribute('data-state', 'open');
  });

  it('applies custom className to accordion items', () => {
    render(
      <Accordion type="single" defaultValue="item-1">
        <AccordionItem value="item-1" className="custom-item-class">
          <AccordionTrigger className="custom-trigger-class">Item 1</AccordionTrigger>
          <AccordionContent className="custom-content-class">Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    // Check if AccordionItem has custom class
    const item = screen.getByRole('region').closest('.border-b');
    expect(item).toHaveClass('custom-item-class');
    
    // Check if AccordionTrigger has custom class
    const trigger = screen.getByText('Item 1').closest('button');
    expect(trigger).toHaveClass('custom-trigger-class');
    
    // With defaultValue="item-1", content should be visible
    const content = screen.getByText('Content 1').closest('div');
    expect(content?.parentElement?.querySelector('div')).toHaveClass('custom-content-class');
  });

  it('uses the chevron icon in the trigger', () => {
    render(
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    
    const trigger = screen.getByText('Item 1').closest('button');
    const icon = trigger?.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('h-4', 'w-4');
  });
});