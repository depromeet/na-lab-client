import { type PropsWithChildren } from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import AnimatePortal from './AnimatePortal';

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');

  return {
    ...(actual as object),
    AnimatePresence: ({ children }: PropsWithChildren) => (
      <div className="mocked-framer-motion-AnimatePresence">{children}</div>
    ),
  };
});

describe('components/portal/AnimatedPortal', () => {
  test('정의되어 있어야 한다', () => {
    expect(AnimatePortal).toBeDefined();
  });

  afterEach(cleanup);

  test('children을 렌더링한다', () => {
    render(<AnimatePortal isShowing={true}>children</AnimatePortal>);

    expect(screen.getByText('children')).toBeInTheDocument();
  });

  test('isShowing이 false일 때 children을 렌더링하지 않는다', () => {
    render(<AnimatePortal isShowing={false}>children</AnimatePortal>);

    expect(screen.queryByText('children')).not.toBeInTheDocument();
  });
});
