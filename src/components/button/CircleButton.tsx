import { type ComponentProps, forwardRef, type Ref } from 'react';
import { css, type Theme } from '@emotion/react';

import ArrowIcon from '../icons/ArrowIcon';
import XIcon from '../icons/XIcon';
import { type ButtonAttributes } from './type';

const CircleButton = forwardRef(function CircleButton(
  { children, ...rest }: ButtonAttributes,
  forwardedRef: Ref<HTMLButtonElement>,
) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button ref={forwardedRef} css={buttonCss} {...rest}>
      {children}
    </button>
  );
});

export default CircleButton;

const buttonCss = (theme: Theme) => css`
  all: unset;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 56px;
  height: 56px;

  background-color: ${theme.colors.gray_50};
  border-radius: 50%;

  &:hover {
    background-color: ${theme.colors.gray_100};
  }
`;

type CircleButtonPropsWithoutChildren = Omit<ComponentProps<typeof CircleButton>, 'children'>;
type ArrowIconDirection = Pick<ComponentProps<typeof ArrowIcon>, 'direction'>;

export const ArrowCircleButton = ({
  direction = 'left',
  ...rest
}: CircleButtonPropsWithoutChildren & ArrowIconDirection) => {
  return (
    <CircleButton {...rest}>
      <ArrowIcon direction={direction} size={28} viewBox="0 0 24 24" />
    </CircleButton>
  );
};

export const XCircleButton = (props: CircleButtonPropsWithoutChildren) => {
  return (
    <CircleButton {...props}>
      <XIcon size={28} viewBox="0 0 24 24" />
    </CircleButton>
  );
};
