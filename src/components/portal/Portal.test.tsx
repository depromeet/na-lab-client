import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import Portal from './Portal';

describe('components/protal/Portal', () => {
  test('정의되어 있어야 한다', () => {
    expect(Portal).toBeDefined();
  });

  test('children을 렌더링한다', () => {
    render(<Portal>children</Portal>);
    expect(screen.getByText('children')).toBeInTheDocument();
  });
});
