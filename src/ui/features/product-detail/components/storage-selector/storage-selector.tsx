'use client';

import type { StorageOption } from '@/core/domain/models/ProductDetails';
import { LITERALS } from '@/ui/shared/literals';
import {
  StyledFieldset,
  StyledLegend,
  StyledOption,
  StyledOptionBox,
  StyledOptions,
  StyledRadio,
} from './storage-selector.styles';

interface StorageSelectorProps {
  options: StorageOption[];
  value?: string;
  onChange: (capacity: string) => void;
}

export const StorageSelector = ({ options, value, onChange }: StorageSelectorProps): React.JSX.Element => (
  <StyledFieldset>
    <StyledLegend>{LITERALS.productDetail.storageTitle}</StyledLegend>
    <StyledOptions>
      {options.map((option) => (
        <StyledOption key={option.capacity}>
          <StyledRadio
            type="radio"
            name="storage"
            value={option.capacity}
            checked={option.capacity === value}
            onChange={() => onChange(option.capacity)}
          />
          <StyledOptionBox>{option.capacity}</StyledOptionBox>
        </StyledOption>
      ))}
    </StyledOptions>
  </StyledFieldset>
);
