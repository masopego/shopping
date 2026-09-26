'use client';

import type { ProductDetails } from '@/core/domain/models/ProductDetails';
import { LITERALS } from '@/ui/shared/literals';
import { StyledSectionTitle } from '../../styles/section-title.styles';
import { StyledTable } from './product-specifications.styles';

interface ProductSpecificationsProps {
  product: ProductDetails;
}

const LABELS = LITERALS.productDetail.specifications;

export const ProductSpecifications = ({ product }: ProductSpecificationsProps): React.JSX.Element => {
  const rows = [
    { label: LABELS.brand, value: product.brand },
    { label: LABELS.name, value: product.name },
    { label: LABELS.description, value: product.description },
    { label: LABELS.screen, value: product.specs.screen },
    { label: LABELS.resolution, value: product.specs.resolution },
    { label: LABELS.processor, value: product.specs.processor },
    { label: LABELS.mainCamera, value: product.specs.mainCamera },
    { label: LABELS.selfieCamera, value: product.specs.selfieCamera },
    { label: LABELS.battery, value: product.specs.battery },
    { label: LABELS.os, value: product.specs.os },
    { label: LABELS.screenRefreshRate, value: product.specs.screenRefreshRate },
  ];

  return (
    <section>
      <StyledSectionTitle>{LITERALS.productDetail.specificationsTitle}</StyledSectionTitle>
      <StyledTable>
        <tbody>
          {rows.map(({ label, value }) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </section>
  );
};
