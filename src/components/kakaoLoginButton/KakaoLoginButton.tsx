import React, { useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { css } from '@emotion/react';

import { LOCAL_STORAGE_KEY } from '~/constants/storage';
import { post } from '~/libs/api';
import colors from '~/styles/color';
import { BODY_1 } from '~/styles/typo';

interface Token {
  token_type: string;
  access_token: string;
}

const KakaoLoginButton = () => {
  const { data: session } = useSession();

  const getTokenHandler = async () => {
    const token: Token = await post('/oauth/kakao', {
      nickname: session?.user?.name,
      email: session?.user?.email,
    });

    localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, token.access_token);
  };

  const logOutHandler = () => {
    signOut();
    localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
  };

  useEffect(() => {
    if (session) {
      getTokenHandler();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if (session) {
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
