import { render, screen } from '@testing-library/react';
import { StyledComponentsRegistry } from '../styled-components-registry';

describe('StyledComponentsRegistry', () => {
  it('renders its children', () => {
    render(
      <StyledComponentsRegistry>
        <p>Content</p>
      </StyledComponentsRegistry>,
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
