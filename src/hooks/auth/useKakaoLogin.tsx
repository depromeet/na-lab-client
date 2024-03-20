import { signIn, type SignInOptions, signOut, type SignOutParams, useSession } from 'next-auth/react';

import { LOCAL_STORAGE_KEY } from '~/constants/storage';

const useKakaoLogin = () => {
  const { status } = useSession();

  const logOutHandler = (options?: SignOutParams) => {
    localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
    signOut(options);
  };

  const loginHandler = (options?: SignInOptions) => signIn('kakao', options);

  return {
    logOutHandler,
    loginHandler,
    status,
  };
};

export default useKakaoLogin;
