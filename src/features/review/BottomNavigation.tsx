import { type MouseEventHandler } from 'react';
import { css, type Theme } from '@emotion/react';

import Button from '~/components/button/Button';
import { ArrowCircleButton } from '~/components/button/CircleButton';

import { fixedBottomCss } from './style';

interface Props {
  onBackClick?: MouseEventHandler<HTMLButtonElement>;
  isBackDisabled?: boolean;
  onNextClick?: MouseEventHandler<HTMLButtonElement>;
  isNextDisabled?: boolean;
}

const BottomNavigation = ({ onBackClick, isBackDisabled, onNextClick, isNextDisabled }: Props) => {
  return (
    <>
      <div css={wrapperCss}>
        <ArrowCircleButton onClick={onBackClick} disabled={isBackDisabled} />
        <Button onClick={onNextClick} disabled={isNextDisabled} css={buttonCss}>
          다음
        </Button>
      </div>
      <div css={wrapperRemainerCss} />
    </>
  );
};

export default BottomNavigation;

const wrapperCss = (theme: Theme) => css`
  ${fixedBottomCss(theme)};

  bottom: 0%;

  display: flex;
  justify-content: space-between;

  height: 104px;
  padding-top: 36px;
  padding-bottom: 12px;

  background: linear-gradient(180deg, rgb(255 255 255 / 0%) 0%, #fff 100%);
`;

const buttonCss = css`
  padding: 15.5px 68px;
`;

const wrapperRemainerCss = css`
  flex-shrink: 0;
  height: 104px;
`;
