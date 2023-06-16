import { signIn, signOut, useSession } from 'next-auth/react';

import { LOCAL_STORAGE_KEY } from '~/constants/storage';

const useKakaoLogin = () => {
  const { status } = useSession();

  const logOutHandler = () => {
    signOut();
    localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
  };

  const loginHandler = () => {
    signIn('kakao');
  };

  return {
    logOutHandler,
    loginHandler,
    status,
  };
};

export default useKakaoLogin;
