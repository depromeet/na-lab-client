import { css, type Theme } from '@emotion/react';

import { BODY_2_BOLD } from '~/styles/typo';

interface Props {
  max: number;
}

const MaxSelectableSmall = ({ max }: Props) => {
  return (
    <small css={smallCss}>
      {max === 1 ? (
        '단일 선택'
      ) : (
        <>
          최대 <strong>{max}개</strong> 선택
        </>
      )}
    </small>
  );
};

export default MaxSelectableSmall;

const smallCss = (theme: Theme) => css`
  ${BODY_2_BOLD}

  color: ${theme.colors.gray_400};

  & > strong {
    color: ${theme.colors.primary_200};
  }
`;
