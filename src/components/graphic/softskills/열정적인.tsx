/* eslint-disable unicorn/filename-case */
import { type ComponentProps } from 'react';

import Svg from '~/components/svg/Svg';

export const 열정적인 = ({ color = '#C9CFDF' }: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={20} isUsingFill color={color}>
      <path d="M7.86722 0.852576C7.55224 0.537593 7.01367 0.760678 7.01367 1.20613V6.49902C7.01367 6.77517 7.23753 6.99902 7.51367 6.99902H12.8066C13.252 6.99902 13.4751 6.46045 13.1601 6.14547L7.86722 0.852576Z" />
      <path d="M19.1601 7.85258C19.4751 7.53759 19.252 6.99902 18.8066 6.99902L13.5137 6.99902C13.2375 6.99902 13.0137 7.22288 13.0137 7.49902L13.0137 12.7919C13.0137 13.2374 13.5522 13.4605 13.8672 13.1455L19.1601 7.85258Z" />
      <path d="M12.1601 19.1455C12.4751 19.4605 13.0137 19.2374 13.0137 18.7919L13.0137 13.499C13.0137 13.2229 12.7898 12.999 12.5137 12.999L7.22078 12.999C6.77533 12.999 6.55224 13.5376 6.86722 13.8526L12.1601 19.1455Z" />
      <path d="M0.867224 12.1455C0.552241 12.4605 0.775326 12.999 1.22078 12.999L6.51367 12.999C6.78981 12.999 7.01367 12.7752 7.01367 12.499L7.01367 7.20613C7.01367 6.76068 6.4751 6.53759 6.16012 6.85258L0.867224 12.1455Z" />
    </Svg>
  );
};
