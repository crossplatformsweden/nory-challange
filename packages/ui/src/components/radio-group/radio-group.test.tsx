import { render, screen } from '@testing-library/react';
import { RadioGroup } from './index';

describe('RadioGroup', () => {
  it('renders without crashing', () => {
    render(<RadioGroup />);
    expect(screen.getByTestId('radio-group-root')).toBeInTheDocument();
  });
});
