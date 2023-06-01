/* eslint-disable unicorn/filename-case */
import { type ComponentProps } from 'react';

import Svg from '~/components/svg/Svg';

export const 추진력_있는 = ({ color = '#C9CFDF' }: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={20} isUsingFill color={color}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.770496 10.1818C0.455513 10.4968 0.678597 11.0353 1.12405 11.0353H18.8519C19.2974 11.0353 19.5205 10.4968 19.2055 10.1818L10.3415 1.31783C10.1463 1.12257 9.8297 1.12257 9.63443 1.31783L0.770496 10.1818ZM0.756824 20.1818C0.441841 20.4968 0.664926 21.0353 1.11038 21.0353H18.8383C19.2837 21.0353 19.5068 20.4968 19.1918 20.1818L10.3279 11.3178C10.1326 11.1226 9.81602 11.1226 9.62076 11.3178L0.756824 20.1818Z"
      />
    </Svg>
  );
};
