import Link from 'next/link';
import styled from 'styled-components';
import { BagIcon } from '@/ui/shared/icons/bag-icon';

export const StyledCartLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: inherit;
  text-decoration: none;
`;

export const StyledBagIcon = styled(BagIcon)<{ $hasItems: boolean }>`
  ${({ $hasItems }) => $hasItems && 'color: #000;'}
`;
