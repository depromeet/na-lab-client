import { type Meta } from '@storybook/react';

import { DefaultFallback } from './ErrorBoundary';

const meta: Meta = {
  title: 'ErrorBoundary',
};

export default meta;

export function DefaultFallbackStory() {
  return <DefaultFallback errorMsg="404 not found" />;
}
