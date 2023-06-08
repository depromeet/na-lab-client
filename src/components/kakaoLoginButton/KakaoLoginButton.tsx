import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import { css } from '@emotion/react';
import axios from 'axios';

import colors from '~/styles/color';
import { BODY_1 } from '~/styles/typo';

const KakaoLoginButton = () => {
  const { data: session } = useSession();

  if (session) {
    // TODO: 실 서버 배포 후 POST로 수정 및 엔드포인트 수정 필요
    axios
      .get('https://api.nalab.me/mock/oauth/kakao', {
        nickname: session?.user?.name,
        email: session?.user?.email,
      })
      .then(function (response) {
        localStorage.setItem('na_lab_access_token', response.data.access_token);
        // TODO: 로그인이 완료되면 다른 페이지로 라우팅 필요
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // TODO: 로그아웃 기능은 현재 없음, 추후 필요시 주석 해제
  // if (session) {
  //   return (
  //     <button type="button" onClick={() => signOut()}>
  //       로그아웃 하기
  //     </button>
  //   );
  // }

  return (
    <div css={KakaoLoginWrapper}>
      이미 계정이 있다면?
      <button type="button" css={KakaoLoginButtonCss} onClick={() => signIn('kakao')}>
        카카오 로그인 하기
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
