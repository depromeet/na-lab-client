import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';

import InternalLink from './InternalLink';

describe('components/link/InternalLink', () => {
  test('정의되어 있어야 한다', () => {
    expect(InternalLink).toBeDefined();
  });

  afterEach(cleanup);

  test('children을 렌더링한다', () => {
    render(<InternalLink href="/">home</InternalLink>);
    expect(screen.getByText('home')).toBeInTheDocument();
  });

  test('anchor 태그를 href와 함께 렌더링한다', () => {
    render(<InternalLink href="/">home</InternalLink>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});
