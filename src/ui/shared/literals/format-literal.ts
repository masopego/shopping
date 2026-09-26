// Replaces each {placeholder} in the literal with its value; unknown placeholders are kept as they are
export const formatLiteral = (literal: string, values: Record<string, string | number>): string =>
  literal.replace(/\{(\w+)\}/g, (placeholder, key: string) => (key in values ? String(values[key]) : placeholder));
