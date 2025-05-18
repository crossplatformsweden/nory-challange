import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Calendar } from './index';

// Mock react-day-picker 
jest.mock('react-day-picker', () => {
  const React = require('react');
  return {
    DayPicker: ({ 
      showOutsideDays, 
      className, 
      classNames, 
      components, 
      selected, 
      onSelect, 
      ...props 
    }) => {
      return (
        <div 
          className={className}
          data-testid="day-picker"
          data-show-outside-days={showOutsideDays}
        >
          <div className={classNames?.months}>
            <div className={classNames?.month}>
              <div className={classNames?.caption}>
                <span className={classNames?.caption_label}>May 2023</span>
                <div className={classNames?.nav}>
                  <button className={`${classNames?.nav_button} ${classNames?.nav_button_previous}`}>
                    {components?.IconLeft && <components.IconLeft />}
                  </button>
                  <button className={`${classNames?.nav_button} ${classNames?.nav_button_next}`}>
                    {components?.IconRight && <components.IconRight />}
                  </button>
                </div>
              </div>
              <div className={classNames?.table}>
                <div className={classNames?.head_row}>
                  <div className={classNames?.head_cell}>Mo</div>
                  <div className={classNames?.head_cell}>Tu</div>
                  <div className={classNames?.head_cell}>We</div>
                </div>
                <div className={classNames?.row}>
                  <div className={classNames?.cell}>
                    <button 
                      className={`${classNames?.day} ${selected && selected.toDateString() === new Date(2023, 4, 1).toDateString() ? classNames?.day_selected : ''}`}
                      onClick={() => onSelect && onSelect(new Date(2023, 4, 1))}
                    >
                      1
                    </button>
                  </div>
                  <div className={classNames?.cell}>
                    <button 
                      className={`${classNames?.day} ${selected && selected.toDateString() === new Date(2023, 4, 2).toDateString() ? classNames?.day_selected : ''}`}
                      onClick={() => onSelect && onSelect(new Date(2023, 4, 2))}
                    >
                      2
                    </button>
                  </div>
                  <div className={classNames?.cell}>
                    <button 
                      className={`${classNames?.day} ${classNames?.day_today}`}
                    >
                      3
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
});

describe('Calendar', () => {
  it('renders the calendar with default props', () => {
    render(<Calendar />);
    
    const dayPicker = screen.getByTestId('day-picker');
    expect(dayPicker).toBeInTheDocument();
    expect(dayPicker).toHaveAttribute('data-show-outside-days', 'true');
    expect(dayPicker).toHaveClass('p-3');
  });

  it('renders with custom className', () => {
    render(<Calendar className="custom-calendar-class" />);
    
    const dayPicker = screen.getByTestId('day-picker');
    expect(dayPicker).toHaveClass('custom-calendar-class');
    expect(dayPicker).toHaveClass('p-3');
  });

  it('renders with showOutsideDays set to false', () => {
    render(<Calendar showOutsideDays={false} />);
    
    const dayPicker = screen.getByTestId('day-picker');
    expect(dayPicker).toHaveAttribute('data-show-outside-days', 'false');
  });

  it('renders navigation icons', () => {
    render(<Calendar />);
    
    const leftIcon = screen.getByText((_, element) => element?.tagName.toLowerCase() === 'svg' && element?.parentElement?.className.includes('nav_button_previous'));
    const rightIcon = screen.getByText((_, element) => element?.tagName.toLowerCase() === 'svg' && element?.parentElement?.className.includes('nav_button_next'));
    
    expect(leftIcon).toBeInTheDocument();
    expect(rightIcon).toBeInTheDocument();
  });

  it('allows selecting a date', async () => {
    const onSelectMock = jest.fn();
    render(<Calendar onSelect={onSelectMock} />);
    
    const dateButton = screen.getByText('1');
    
    const user = userEvent.setup();
    await user.click(dateButton);
    
    expect(onSelectMock).toHaveBeenCalledWith(new Date(2023, 4, 1));
  });

  it('highlights today\'s date', () => {
    render(<Calendar />);
    
    const todayButton = screen.getByText('3').closest('button');
    expect(todayButton).toHaveClass('bg-accent');
    expect(todayButton).toHaveClass('text-accent-foreground');
  });
});