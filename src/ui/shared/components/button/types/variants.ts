export const ButtonVariant = {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY',
} as const;

export type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant];
