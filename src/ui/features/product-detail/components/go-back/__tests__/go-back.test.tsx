import { render, screen } from '@testing-library/react';
import { GoBack } from '../go-back';

describe('GoBack', () => {
  it('links to the phone list', () => {
    render(<GoBack />);

    expect(screen.getByRole('link', { name: 'Back' })).toHaveAttribute('href', '/');
  });

  it('shows the text in uppercase', () => {
    render(<GoBack />);

    expect(screen.getByRole('link')).toHaveStyle({ textTransform: 'uppercase' });
  });
});
