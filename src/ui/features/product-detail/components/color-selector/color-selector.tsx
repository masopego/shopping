'use client';

import type { ColorOption } from '@/core/domain/models/ProductDetails';
import { LITERALS } from '@/ui/shared/literals';
import {
  StyledFieldset,
  StyledLegend,
  StyledOption,
  StyledRadio,
  StyledSelectedName,
  StyledSwatch,
  StyledSwatches,
} from './color-selector.styles';

interface ColorSelectorProps {
  options: ColorOption[];
  value?: string;
  onChange: (colorName: string) => void;
}

export const ColorSelector = ({ options, value, onChange }: ColorSelectorProps): React.JSX.Element => (
  <StyledFieldset>
    <StyledLegend>{LITERALS.productDetail.colorTitle}</StyledLegend>
    <StyledSwatches>
      {options.map((option) => (
        <StyledOption key={option.name}>
          <StyledRadio
            type="radio"
            name="color"
            value={option.name}
            aria-label={option.name}
            checked={option.name === value}
            onChange={() => onChange(option.name)}
          />
          <StyledSwatch $color={option.hexCode} />
        </StyledOption>
      ))}
    </StyledSwatches>
    <StyledSelectedName aria-live="polite">{value}</StyledSelectedName>
  </StyledFieldset>
);
