/* eslint-disable unicorn/filename-case */

import { type PropsWithChildren, type ReactElement } from 'react';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import SEO from './SEO';

function renderAtHead(element: ReactElement) {
  render(element, { container: document.head });
}

vi.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: PropsWithChildren) => {
      return <>{children}</>;
    },
  };
});

describe('components/SEO/SEO', () => {
  test('정의되어 있어야 한다', () => {
    expect(SEO).toBeDefined();
  });

  afterEach(cleanup);

  describe('title', () => {
    const DEFAULT_TITLE = '나랩';

    test('기본 title이 적용되어 있어야 한다', () => {
      renderAtHead(<SEO />);

      expect(document.title).toBe(DEFAULT_TITLE);
      expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe(DEFAULT_TITLE);
      expect(document.querySelector('meta[name="twitter:title"]')?.getAttribute('content')).toBe(DEFAULT_TITLE);
    });

    test('title prop이 적용되어야 한다', () => {
      const MOCK_TITLE = 'mock title';
      const CORRECT_TITLE = `${MOCK_TITLE} | 나랩`;
      renderAtHead(<SEO title={MOCK_TITLE} />);

      expect(document.title).toBe(CORRECT_TITLE);
      expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe(CORRECT_TITLE);
      expect(document.querySelector('meta[name="twitter:title"]')?.getAttribute('content')).toBe(CORRECT_TITLE);
    });
  });

  describe('description', () => {
    const DEFAULT_DESCRIPTION = '나를 위한 연구소, 나랩';

    test('기본 description이 적용되어 있어야 한다', () => {
      renderAtHead(<SEO />);

      expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(DEFAULT_DESCRIPTION);
      expect(document.querySelector('meta[property="og:description"]')?.getAttribute('content')).toBe(
        DEFAULT_DESCRIPTION,
      );
      expect(document.querySelector('meta[name="twitter:description"]')?.getAttribute('content')).toBe(
        DEFAULT_DESCRIPTION,
      );
    });

    test('description prop이 적용되어야 한다', () => {
      const CORRECT_DESCRIPTION = 'mock description';
      renderAtHead(<SEO description={CORRECT_DESCRIPTION} />);

      expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(CORRECT_DESCRIPTION);
      expect(document.querySelector('meta[property="og:description"]')?.getAttribute('content')).toBe(
        CORRECT_DESCRIPTION,
      );
      expect(document.querySelector('meta[name="twitter:description"]')?.getAttribute('content')).toBe(
        CORRECT_DESCRIPTION,
      );
    });

    describe('ogImage', () => {
      const DEFAULT_OG_IMAGE = '/images/og-image.png';

      test('기본 ogImage가 적용되어 있어야 한다', () => {
        renderAtHead(<SEO />);

        expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(DEFAULT_OG_IMAGE);
        expect(document.querySelector('meta[name="twitter:image"]')?.getAttribute('content')).toBe(DEFAULT_OG_IMAGE);
      });

      test('ogImage prop이 적용되어야 한다', () => {
        const CORRECT_OG_IMAGE = 'mock ogImage';
        renderAtHead(<SEO ogImage={CORRECT_OG_IMAGE} />);

        expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(CORRECT_OG_IMAGE);
        expect(document.querySelector('meta[name="twitter:image"]')?.getAttribute('content')).toBe(CORRECT_OG_IMAGE);
      });
    });
  });
});
