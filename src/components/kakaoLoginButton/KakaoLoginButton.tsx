import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { css } from '@emotion/react';

import { get } from '~/libs/api';
import colors from '~/styles/color';
import { BODY_1 } from '~/styles/typo';

interface Response {
  token_type: string;
  access_token: string;
}

const KakaoLoginButton = () => {
  const { data: session } = useSession();

  if (session) {
    // TODO: 실 서버 배포 후 POST로 수정 및 엔드포인트 수정 필요
    get('/oauth/kakao').then((response: Response) =>
      localStorage.setItem('na_lab_access_token', response.access_token),
    );
  }

  // TODO: 로그아웃 기능은 현재 없음, 추후 필요시 가공 필요
  if (session) {
    return (
      <div css={KakaoLoginWrapper}>
        <button type="button" onClick={() => signOut()}>
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
  line-height: 24px;
  color: ${colors.gray_400};
`;

const KakaoLoginButtonCss = css`
  cursor: pointer;

  overflow: visible;

  margin-left: 5px;
  padding: 0;
  ${BODY_1}

  color: ${colors.gray_400};
  text-decoration: underline;

  background: inherit;
  border: none;
  border-radius: 0;
  box-shadow: none;
`;

export default KakaoLoginButton;
