import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';

import AnimatePortal from './AnimatePortal';

describe('components/portal/AnimatedPortal', () => {
  test('정의되어 있어야 한다', () => {
    expect(AnimatePortal).toBeDefined();
  });

  afterEach(cleanup);

  test('children을 렌더링한다', () => {
    render(<AnimatePortal isShowing={true}>children</AnimatePortal>);

    waitFor(() => {
      expect(screen.getByText('children')).toBeInTheDocument();
    });
  });

  test('isShowing이 false일 때 children을 렌더링하지 않는다', () => {
    render(<AnimatePortal isShowing={false}>children</AnimatePortal>);

    waitFor(() => {
      expect(screen.getByText('children')).not.toBeInTheDocument();
    });
  });
});
