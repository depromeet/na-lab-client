import { type ComponentProps } from 'react';
import Image from 'next/image';
import { css, type Theme } from '@emotion/react';

import { HEAD_1, HEAD_3_SEMIBOLD } from '~/styles/typo';

import Checkbox from './Checkbox';

interface ImgSrc {
  default: string;
  webp: string;
}

type CheckboxProps = ComponentProps<typeof Checkbox>;

interface Props extends CheckboxProps {
  title: string;
  subTitle: string;
  imgSrc: ImgSrc;
  checkedBackgroundColor: string;
}

const PositionCard = ({
  title,
  subTitle,
  imgSrc,
  value,
  checked,
  onChange,
  checkedColor,
  checkedBackgroundColor,
}: Props) => {
  return (
    <article css={articleCss}>
      <picture css={pictureCss}>
        <source srcSet={imgSrc.webp} type="image/webp" />
        <Image src={imgSrc.default} alt={title} fill />
      </picture>
      <div css={(theme) => contentWrapperCss(theme, checkedBackgroundColor)}>
        <h2 css={HEAD_1}>{title}</h2>
        <small css={smallCss}>{subTitle}</small>
        <Checkbox value={value} checked={checked} onChange={onChange} checkedColor={checkedColor} />
      </div>
    </article>
  );
};

export default PositionCard;

const articleCss = css`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 220px;
  height: 270px;
`;

const pictureCss = css`
  pointer-events: none;

  position: absolute;
  z-index: 1;
  top: 0;

  width: 220px;
  height: 193px;
`;

const contentWrapperCss = (theme: Theme, checkedBackgroundColor: string) => css`
  position: absolute;
  z-index: 0;
  bottom: 0;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  width: 100%;
  height: 240px;
  padding: 20px;

  background-color: ${theme.colors.white};
  border-radius: 12px;
  box-shadow: 3px 1px 38px -2px rgb(176 183 202 / 35%);

  &::before {
    content: '';

    position: absolute;
    top: -112px;
    left: calc(50% - 318px / 2);

    width: 318px;
    height: 268px;

    opacity: 0;
    background: ${checkedBackgroundColor};
    filter: blur(32px);
    border-radius: 50%;

    transition: opacity 1s ${theme.transition.defaultEasing};
  }

  &:has(input:checked)::before {
    opacity: 1;
  }
`;

const smallCss = (theme: Theme) => css`
  ${HEAD_3_SEMIBOLD}

  color: ${theme.colors.gray_400};
`;
