/* eslint-disable unicorn/filename-case */
import { type ComponentProps } from 'react';

import Svg from '~/components/svg/Svg';

export const 눈치_빠른 = ({ color = '#C9CFDF' }: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={20} isUsingFill color={color}>
      <path d="M11.1464 0.853554C11.4614 0.538572 12 0.761654 12 1.20711V10.5C12 10.7761 11.7761 11 11.5 11H2.20711C1.76165 11 1.53857 10.4614 1.85355 10.1464L11.1464 0.853554Z" />
      <path d="M8.85355 19.1464C8.53857 19.4614 8 19.2383 8 18.7929L8 9.5C8 9.22386 8.22386 9 8.5 9L17.7929 9C18.2383 9 18.4614 9.53857 18.1464 9.85355L8.85355 19.1464Z" />
    </Svg>
  );
};
