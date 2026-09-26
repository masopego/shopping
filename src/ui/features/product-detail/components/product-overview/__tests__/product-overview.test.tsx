import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartMother } from '@/core/domain/models/__mothers__/CartMother';
import { ProductDetailsMother } from '@/core/domain/models/__mothers__/ProductDetailsMother';
import { renderWithCartProvider } from '@/ui/features/cart/state/__mocks__/render-with-cart-provider';
import { ProductOverview } from '../product-overview';

const product = ProductDetailsMother.create({
  basePrice: 1229,
  colorOptions: [
    { name: 'Titanium Black', hexCode: '#000000', imageUrl: 'https://example.com/black.png' },
    { name: 'Titanium Gray', hexCode: '#808080', imageUrl: 'https://example.com/gray.png' },
  ],
  storageOptions: [
    { capacity: '256 GB', price: 1229 },
    { capacity: '512 GB', price: 1329 },
  ],
});

const renderOverview = () => renderWithCartProvider(<ProductOverview product={product} />);

const getImageSrc = () => screen.getByRole('img').getAttribute('src');

const addToCartButton = () => screen.getByRole('button', { name: 'Añadir' });

describe('ProductOverview', () => {
  it('shows the product name as the page heading', () => {
    renderOverview();

    expect(screen.getByRole('heading', { level: 1, name: product.name })).toBeInTheDocument();
  });

  it('shows the base price as a starting price when no storage is selected', () => {
    renderOverview();

    expect(screen.getByText('From 1229 EUR')).toBeInTheDocument();
  });

  it('shows the price of the selected storage', async () => {
    renderOverview();
    await userEvent.click(screen.getByRole('radio', { name: '512 GB' }));

    expect(screen.getByText('1329 EUR')).toBeInTheDocument();
  });

  it('shows the image of the first color until a color is selected', () => {
    renderOverview();

    expect(getImageSrc()).toContain(encodeURIComponent('https://example.com/black.png'));
  });

  it('shows the image of the selected color', async () => {
    renderOverview();
    await userEvent.click(screen.getByRole('radio', { name: 'Titanium Gray' }));

    expect(getImageSrc()).toContain(encodeURIComponent('https://example.com/gray.png'));
  });

  it('disables the add to cart button until a configuration is selected', () => {
    renderOverview();

    expect(addToCartButton()).toBeDisabled();
  });

  it('keeps the button disabled when only the storage is selected', async () => {
    renderOverview();
    await userEvent.click(screen.getByRole('radio', { name: '256 GB' }));

    expect(addToCartButton()).toBeDisabled();
  });

  it('keeps the button disabled when only the color is selected', async () => {
    renderOverview();
    await userEvent.click(screen.getByRole('radio', { name: 'Titanium Black' }));

    expect(addToCartButton()).toBeDisabled();
  });

  it('enables the button when storage and color are selected', async () => {
    renderOverview();
    await userEvent.click(screen.getByRole('radio', { name: '256 GB' }));
    await userEvent.click(screen.getByRole('radio', { name: 'Titanium Black' }));

    expect(addToCartButton()).toBeEnabled();
  });

  it('adds the selected configuration to the cart', async () => {
    const { repository } = renderOverview();
    await userEvent.click(screen.getByRole('radio', { name: '512 GB' }));
    await userEvent.click(screen.getByRole('radio', { name: 'Titanium Black' }));
    await userEvent.click(addToCartButton());

    expect(repository.save).toHaveBeenCalledWith(
      CartMother.withOneItem({
        id: 'SMG-S24U-Titanium Black-512 GB',
        imageUrl: 'https://example.com/black.png',
        storageCapacity: '512 GB',
        price: 1329,
      }),
    );
  });
});
