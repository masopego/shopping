import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// `server-only` throws outside of Next Server Components
vi.mock('server-only', () => ({}));

afterEach(() => {
  cleanup();
});
