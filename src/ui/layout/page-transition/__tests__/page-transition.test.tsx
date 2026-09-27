import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { PageTransition } from '../page-transition';

vi.mock('next/navigation', () => ({ usePathname: vi.fn() }));

const renderAt = (pathname: string, name: string) => {
  vi.mocked(usePathname).mockReturnValue(pathname);
  return (
    <PageTransition>
      <main>
        <h1>{name}</h1>
        <a href="/back">Back</a>
      </main>
    </PageTransition>
  );
};

describe('PageTransition', () => {
  it('renders the page', () => {
    render(renderAt('/', 'Home'));

    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument();
  });

  it('renders the new page after navigating', () => {
    const { rerender } = render(renderAt('/', 'Home'));
    rerender(renderAt('/cart', 'Cart'));

    expect(screen.getByRole('heading', { name: 'Cart' })).toBeInTheDocument();
  });

  it('does not move the focus after navigating, so the page title announcement is not interrupted', () => {
    const { rerender } = render(renderAt('/', 'Home'));
    rerender(renderAt('/cart', 'Cart'));

    expect(document.body).toHaveFocus();
  });
});
