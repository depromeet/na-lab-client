import React from 'react';
import { signIn } from 'next-auth/react';
import { css } from '@emotion/react';

import colors from '~/styles/color';
import { BODY_1 } from '~/styles/typo';

const KakaoLoginButton = () => {
  // const { data: session } = useSession();

  // TODO: 추후 서버로 session.user.name 과 session.user.email 정보를 보내줄 수 있음
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
