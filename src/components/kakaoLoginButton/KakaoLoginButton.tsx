import React from 'react';
import { signIn } from 'next-auth/react';
import { css } from '@emotion/react';

import useKakaoLogin from '~/components/kakaoLoginButton/useKakaoLogin';
import colors from '~/styles/color';
import { BODY_1 } from '~/styles/typo';

const KakaoLoginButton = () => {
  const { logOutHandler, isLoginState } = useKakaoLogin();

  if (isLoginState) {
    return (
      <div css={KakaoLoginWrapper}>
        <button type="button" onClick={logOutHandler}>
          로그아웃 하기
        </button>
      </div>
    );
  }

  return (
    <div css={KakaoLoginWrapper}>
      이미 계정이 있다면?
      <button type="button" css={KakaoLoginButtonCss} onClick={() => signIn('kakao')}>
        카카오 로그인하기
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
  background: inherit;
`;

export default KakaoLoginButton;
