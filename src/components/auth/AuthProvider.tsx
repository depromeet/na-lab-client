import { type ReactNode, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSetAtom } from 'jotai';

import { LOCAL_STORAGE_KEY } from '~/constants/storage';
import { post } from '~/libs/api';
import { isUserTokenValidAtom } from '~/store/auth';

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const { data, status } = useSession();
  const setIsUserTokenValid = useSetAtom(isUserTokenValidAtom);

  useEffect(() => {
    if (!data) return;
    if (status !== 'authenticated') return;

    const getToken = async () => {
      const token = await post<Token>('/v1/oauth/kakao', {
        nickname: data?.user?.name,
        email: data?.user?.email,
      });

      return token;
    };

    const setToken = async () => {
      const token = await getToken();
      setIsUserTokenValid(true);
      localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, token.access_token);
    };

    setToken();
  }, [data, status]);

  return <>{children}</>;
};

export default AuthProvider;

interface Token {
  token_type: string;
  access_token: string;
}
