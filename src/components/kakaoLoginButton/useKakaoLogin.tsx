import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';

import { LOCAL_STORAGE_KEY } from '~/constants/storage';
import { post } from '~/libs/api';

interface Token {
  token_type: string;
  access_token: string;
}

const useKakaoLogin = () => {
  const { data: session } = useSession();

  const isLoginState = !!session;

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

  return {
    logOutHandler,
    isLoginState,
  };
};

export default useKakaoLogin;
