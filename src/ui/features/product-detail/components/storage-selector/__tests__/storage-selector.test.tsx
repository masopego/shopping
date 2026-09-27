import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StorageSelector } from '../storage-selector';

const options = [
  { capacity: '256 GB', price: 1229 },
  { capacity: '512 GB', price: 1329 },
];

describe('StorageSelector', () => {
  it('groups the options under the storage title', () => {
    render(<StorageSelector options={options} onChange={vi.fn()} />);

    expect(screen.getByRole('group', { name: 'Storage ¿How much space do you need?' })).toBeInTheDocument();
  });

  it('renders an option for each capacity', () => {
    render(<StorageSelector options={options} onChange={vi.fn()} />);

    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  it('marks the selected capacity', () => {
    render(<StorageSelector options={options} value="512 GB" onChange={vi.fn()} />);

    expect(screen.getByRole('radio', { name: '512 GB' })).toBeChecked();
  });

  it('notifies the chosen capacity', async () => {
    const onChange = vi.fn();
    render(<StorageSelector options={options} onChange={onChange} />);
    await userEvent.click(screen.getByRole('radio', { name: '256 GB' }));

    expect(onChange).toHaveBeenCalledWith('256 GB');
  });
});
