import { ROUTES } from '../routes';

describe('ROUTES.PRODUCT_DETAIL', () => {
  it('builds the detail path of a product', () => {
    const path = ROUTES.PRODUCT_DETAIL('SMG-S24U');

    expect(path).toBe('/products/SMG-S24U');
  });

  it('encodes the product id', () => {
    const path = ROUTES.PRODUCT_DETAIL('a/b c');

    expect(path).toBe('/products/a%2Fb%20c');
  });
});

describe('ROUTES.HOME_SEARCH', () => {
  it('builds the home path with the search in the query string', () => {
    const path = ROUTES.HOME_SEARCH('note 13');

    expect(path).toBe('/?search=note%2013');
  });

  it('returns the home path when the search is empty', () => {
    const path = ROUTES.HOME_SEARCH('');

    expect(path).toBe('/');
  });
});
