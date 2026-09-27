'use client';

import Image from 'next/image';
import { useState, type FormEvent } from 'react';
import type { ColorOption, ProductDetails, StorageOption } from '@/core/domain/models/ProductDetails';
import { Button, ButtonVariant } from '@/ui/shared/components/button';
import { LITERALS, formatLiteral } from '@/ui/shared/literals';
import { ColorSelector } from '../color-selector';
import { StorageSelector } from '../storage-selector';
import {
  StyledImageWrapper,
  StyledInfo,
  StyledName,
  StyledPrice,
  StyledProductOverview,
} from './product-overview.styles';

export interface ProductConfiguration {
  product: ProductDetails;
  storage: StorageOption;
  color: ColorOption;
}

interface ProductOverviewProps {
  product: ProductDetails;
  onAddToCart?: (configuration: ProductConfiguration) => void;
}

export const ProductOverview = ({ product, onAddToCart }: ProductOverviewProps): React.JSX.Element => {
  const [storageCapacity, setStorageCapacity] = useState<string>();
  const [colorName, setColorName] = useState<string>();

  const selectedStorage = product.storageOptions.find((storage) => storage.capacity === storageCapacity);
  const selectedColor = product.colorOptions.find((color) => color.name === colorName);

  const imageUrl = (selectedColor ?? product.colorOptions[0])?.imageUrl;

  const price = selectedStorage
    ? formatLiteral(LITERALS.common.price, { price: selectedStorage.price })
    : formatLiteral(LITERALS.common.fromPrice, {
        price: formatLiteral(LITERALS.common.price, { price: product.basePrice }),
      });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedStorage || !selectedColor) return;

    onAddToCart?.({ product, storage: selectedStorage, color: selectedColor });
  };

  return (
    <StyledProductOverview>
      <StyledImageWrapper>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={`${product.brand} ${product.name}`}
            fill
            priority
            sizes="(min-width: 768px) 400px, 100vw"
            style={{ objectFit: 'contain' }}
          />
        )}
      </StyledImageWrapper>
      <StyledInfo onSubmit={handleSubmit}>
        <div>
          <StyledName>{product.name}</StyledName>
          <StyledPrice>{price}</StyledPrice>
        </div>
        <StorageSelector options={product.storageOptions} value={storageCapacity} onChange={setStorageCapacity} />
        <ColorSelector options={product.colorOptions} value={colorName} onChange={setColorName} />
        <Button type="submit" variant={ButtonVariant.PRIMARY} disabled={!selectedStorage || !selectedColor} fullWidth>
          {LITERALS.productDetail.addToCart}
        </Button>
      </StyledInfo>
    </StyledProductOverview>
  );
};
