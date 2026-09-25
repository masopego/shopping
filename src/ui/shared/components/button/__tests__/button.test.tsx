import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { IButtonProps } from '../types/button';
import { ButtonVariant } from '../types/variants';
import { Button } from '../button';

const renderButton = (props: Partial<IButtonProps> = {}) =>
  render(
    <Button variant={ButtonVariant.PRIMARY} onClick={vi.fn()} {...props}>
      {props.children ?? 'Add to cart'}
    </Button>,
  );

describe('Button', () => {
  it('renders its content', () => {
    renderButton({ children: 'Continue' });

    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    renderButton({ onClick, type: 'button' });
    await userEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('is a submit button by default', () => {
    renderButton();

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('uses the given type', () => {
    renderButton({ type: 'button' });

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('can be disabled', () => {
    renderButton({ disabled: true });

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows the text in uppercase', () => {
    renderButton();

    expect(screen.getByRole('button')).toHaveStyle({ textTransform: 'uppercase' });
  });

  it('has a black background and white text when it is primary', () => {
    renderButton({ variant: ButtonVariant.PRIMARY });

    expect(screen.getByRole('button')).toHaveStyle({ backgroundColor: '#000', color: '#fff' });
  });

  it('has a white background and black text when it is secondary', () => {
    renderButton({ variant: ButtonVariant.SECONDARY });

    expect(screen.getByRole('button')).toHaveStyle({ backgroundColor: '#fff', color: '#000' });
  });
});
