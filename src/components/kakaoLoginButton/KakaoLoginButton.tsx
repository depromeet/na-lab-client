import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

const KakaoLoginButton = () => {
  const { data: session } = useSession();

  if (session) {
    // TODO : 추후 서버로 session.user.name 과 session.user.email 정보를 보내줄 수 있음
    return (
      <>
        <div>{session.user?.name}님 환영합니다.</div>
        <button type="button" onClick={() => signOut()}>
          로그아웃 하기
        </button>
      </>
    );
  }

  return (
    <button type="button" onClick={() => signIn('kakao')}>
      카카오로 로그인 하기
    </button>
  );
};

export default KakaoLoginButton;
