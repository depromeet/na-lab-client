import { type PropsWithChildren } from 'react';
import { cleanup } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import CardList from '~/features/createSurvey/card/CardList';

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...(actual as object),
    AnimatePresence: ({ children }: PropsWithChildren) => (
      <div className="mocked-framer-motion-AnimatePresence">{children}</div>
    ),
  };
});

describe('/features/createSurvey/dnd', () => {
  test('정의되어 있어야 한다', () => {
    expect(CardList).toBeDefined();
  });

  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });
});
