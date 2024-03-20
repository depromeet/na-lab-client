import { type ReactNode, useLayoutEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSetAtom } from 'jotai';

import { LOCAL_STORAGE_KEY } from '~/constants/storage';
import { isUserTokenValidAtom } from '~/store/auth';

interface Props {
  children: ReactNode;
}

const AuthSessionLoader = ({ children }: Props) => {
  const { data, status } = useSession();
  const setIsUserTokenValid = useSetAtom(isUserTokenValidAtom);

  useLayoutEffect(() => {
    if (status !== 'authenticated') return;

    setIsUserTokenValid(true);
    localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, data.user.accessToken);
  }, [data, setIsUserTokenValid, status]);

  return <>{children}</>;
};

export default AuthSessionLoader;
