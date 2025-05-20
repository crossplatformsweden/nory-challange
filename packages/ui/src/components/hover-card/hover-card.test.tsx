import { render, screen } from '@testing-library/react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from './index';
import userEvent from '@testing-library/user-event';

describe('HoverCard', () => {
  it('renders trigger and content', async () => {
    render(
      <HoverCard>
        <HoverCardTrigger data-testid="hovercard-trigger" asChild>
          <button>Trigger</button>
        </HoverCardTrigger>
        <HoverCardContent data-testid="hovercard-content">
          Content
        </HoverCardContent>
      </HoverCard>
    );
    const trigger = screen.getByTestId('hovercard-trigger');
    expect(trigger).toBeInTheDocument();
    await userEvent.hover(trigger);
    expect(
      await screen.findByTestId('hovercard-content', {}, { timeout: 1500 })
    ).toBeInTheDocument();
  });
});
