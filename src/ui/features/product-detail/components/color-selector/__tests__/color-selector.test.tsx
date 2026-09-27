import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ColorSelector } from '../color-selector';

const options = [
  { name: 'Titanium Black', hexCode: '#000000', imageUrl: 'https://example.com/black.png' },
  { name: 'Titanium Gray', hexCode: '#808080', imageUrl: 'https://example.com/gray.png' },
];

describe('ColorSelector', () => {
  it('groups the options under the color title', () => {
    render(<ColorSelector options={options} onChange={vi.fn()} />);

    expect(screen.getByRole('group', { name: 'Color. Pick your favourite.' })).toBeInTheDocument();
  });

  it('renders an option named after each color', () => {
    render(<ColorSelector options={options} onChange={vi.fn()} />);

    expect(screen.getByRole('radio', { name: 'Titanium Gray' })).toBeInTheDocument();
  });

  it('marks the selected color', () => {
    render(<ColorSelector options={options} value="Titanium Black" onChange={vi.fn()} />);

    expect(screen.getByRole('radio', { name: 'Titanium Black' })).toBeChecked();
  });

  it('shows the name of the selected color', () => {
    render(<ColorSelector options={options} value="Titanium Black" onChange={vi.fn()} />);

    expect(screen.getByText('Titanium Black')).toBeInTheDocument();
  });

  it('notifies the chosen color', async () => {
    const onChange = vi.fn();
    render(<ColorSelector options={options} onChange={onChange} />);
    await userEvent.click(screen.getByRole('radio', { name: 'Titanium Gray' }));

    expect(onChange).toHaveBeenCalledWith('Titanium Gray');
  });
});
