import { render, screen } from '@testing-library/react';
import { Popover, PopoverTrigger, PopoverContent } from './index';
import userEvent from '@testing-library/user-event';

describe('Popover', () => {
  it('renders trigger and content', async () => {
    render(
      <Popover>
        <PopoverTrigger data-testid="popover-trigger" asChild>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverContent data-testid="popover-content">Content</PopoverContent>
      </Popover>
    );
    const trigger = screen.getByTestId('popover-trigger');
    expect(trigger).toBeInTheDocument();
    await userEvent.click(trigger);
    expect(
      await screen.findByTestId('popover-content', {}, { timeout: 1500 })
    ).toBeInTheDocument();
  });
});
