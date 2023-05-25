/* eslint-disable unicorn/filename-case */
import { type ComponentProps } from 'react';

import Svg from '~/components/svg/Svg';

export const 완벽주의적인 = ({ color = '#C9CFDF' }: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={20} isUsingFill color={color}>
      <path d="M9.94606 0.111896C9.96783 0.066724 10.0322 0.0667241 10.0539 0.111896C12.125 4.40811 15.5919 7.87497 19.8881 9.94606C19.9333 9.96783 19.9333 10.0322 19.8881 10.0539C15.5919 12.125 12.125 15.5919 10.0539 19.8881C10.0322 19.9333 9.96783 19.9333 9.94606 19.8881C7.87497 15.5919 4.40811 12.125 0.111896 10.0539C0.066724 10.0322 0.0667241 9.96783 0.111896 9.94606C4.40811 7.87497 7.87497 4.40811 9.94606 0.111896Z" />
    </Svg>
  );
};
