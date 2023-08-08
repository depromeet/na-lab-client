import React from 'react';
import { css } from '@emotion/react';

import useKakaoLogin from '~/hooks/auth/useKakaoLogin';
import colors from '~/styles/color';
import { BODY_1 } from '~/styles/typo';

const KakaoLoginButton = () => {
  const { logOutHandler, loginHandler, status } = useKakaoLogin();

  if (status === 'loading') return null;

  if (status === 'authenticated') {
    return (
      <div css={KakaoLoginWrapper}>
        <button type="button" onClick={logOutHandler}>
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div css={KakaoLoginWrapper}>
      이미 질문폼이 있다면?
      <button type="button" css={KakaoLoginButtonCss} onClick={loginHandler}>
        로그인하고 결과 보기
      </button>
    </div>
  );
};

const KakaoLoginWrapper = css`
  ${BODY_1};

  line-height: 24px;
  color: ${colors.gray_400};

  & * {
    ${BODY_1};

    color: ${colors.gray_400};
  }

  & button {
    text-decoration: underline;
  }
`;

const KakaoLoginButtonCss = css`
  cursor: pointer;
  margin-left: 5px;
  color: ${colors.primary};
  background: inherit;
`;

export default KakaoLoginButton;
