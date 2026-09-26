import type { ProductDetails } from '../../../../domain/models/ProductDetails';
import { ProductDetailsMother } from '../../../../domain/models/__mothers__/ProductDetailsMother';
import { ProductMother } from '../../../../domain/models/__mothers__/ProductMother';
import type { ProductEntityDto } from '../../dtos/ProductDto';
import { ProductEntityDtoMother } from '../../dtos/__mothers__/ProductEntityDtoMother';
import { ProductListEntityDtoMother } from '../../dtos/__mothers__/ProductListEntityDtoMother';
import { toProduct, toProductDetails } from '../ProductMapper';

describe('ProductMapper', () => {
  describe('toProduct', () => {
    it('maps a list DTO to a Product', () => {
      const dto = ProductListEntityDtoMother.create();
      const product = toProduct(dto);

      expect(product).toEqual(ProductMother.create());
    });
  });

  describe('toProductDetails', () => {
    it('maps a detail DTO to a ProductDetails', () => {
      const dto = ProductEntityDtoMother.create();
      const details = toProductDetails(dto);

      expect(details).toEqual(ProductDetailsMother.create());
    });

    it('returns each similar product only once when the API repeats it', () => {
      const similar = ProductListEntityDtoMother.create({ id: 'GPX-8A' });
      const details = toProductDetails(ProductEntityDtoMother.create({ similarProducts: [similar, similar] }));

      expect(details.similarProducts).toHaveLength(1);
    });

    it('defaults to empty lists when the API omits the options', () => {
      const dto = ProductEntityDtoMother.withoutOptions();
      const details = toProductDetails(dto);

      expect(details).toMatchObject({ colorOptions: [], storageOptions: [], similarProducts: [] });
    });

    it.each([
      ['specs', (source: ProductEntityDto | ProductDetails) => source.specs],
      ['color options', (source: ProductEntityDto | ProductDetails) => source.colorOptions[0]],
      ['storage options', (source: ProductEntityDto | ProductDetails) => source.storageOptions[0]],
    ])('copies %s instead of sharing the DTO reference', (_, select) => {
      const dto = ProductEntityDtoMother.create();
      const details = toProductDetails(dto);

      expect(select(details)).not.toBe(select(dto));
    });
  });
});
