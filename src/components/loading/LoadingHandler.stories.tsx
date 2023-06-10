import { useState } from 'react';
import { type Meta } from '@storybook/react';

import useDidMount from '~/hooks/lifeCycle/useDidMount';

import FixedSpinnerComponent from './FixedSpinner';
import LoadingHandler from './LoadingHandler';
import SpinnerComponent from './Spinner';

const meta: Meta = {
  title: 'LoadingHandler',
};

export default meta;

export function Default() {
  const [isLoading, setIsLoading] = useState(true);

  useDidMount(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  });

  return (
    <div>
      <LoadingHandler isLoading={isLoading} fallback={<FixedSpinner />}>
        <h1>content</h1>
        <button
          type="button"
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 1000);
          }}
        >
          다시
        </button>
      </LoadingHandler>
    </div>
  );
}

export function Spinner() {
  return (
    <div>
      <SpinnerComponent />
    </div>
  );
}

export function FixedSpinner() {
  return (
    <div>
      <FixedSpinnerComponent />
    </div>
  );
}
