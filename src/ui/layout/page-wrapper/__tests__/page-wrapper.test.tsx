import { render, screen } from '@testing-library/react';
import { PageWrapper } from '../page-wrapper';

describe('PageWrapper', () => {
  it('renders its content', () => {
    render(
      <PageWrapper>
        <p>Content</p>
      </PageWrapper>,
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies the mobile side padding by default', () => {
    render(
      <PageWrapper>
        <p>Content</p>
      </PageWrapper>,
    );

    expect(screen.getByText('Content').parentElement).toHaveStyle({ paddingInline: '1rem' });
  });
});
