import { type Meta } from '@storybook/react';

import NotFound from '~/pages/404.page';
import InternalError from '~/pages/500.page';

import { DefaultFallback } from './ErrorBoundary';

const meta: Meta = {
  title: 'ErrorBoundary',
};

export default meta;

export function DefaultFallbackStory() {
  return <DefaultFallback errorMsg="404 not found" />;
}

export function NotFoundStory() {
  return <NotFound />;
}

export function InternalErrorStory() {
  return <InternalError />;
}
