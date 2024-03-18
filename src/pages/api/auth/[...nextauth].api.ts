import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';

import { post } from '~/libs/api';

interface TokenResponse {
  token_type: string;
  access_token: string;
}

export default NextAuth({
  callbacks: {
    session: async ({ session, token }) => {
      const jwtTokenFromNaLabServer = await post<TokenResponse>('/v1/oauth/kakao', {
        nickname: token.name,
        email: token.email,
      });
      session.user.accessToken = jwtTokenFromNaLabServer.access_token;
      session.user.tokenType = jwtTokenFromNaLabServer.token_type;

      return session;
    },
  },
  providers: [
    process.env.CLOUDFLARE_ENV === 'preview'
      ? CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: {
              label: 'Username',
              type: 'text',
              placeholder: 'na-lab',
            },
            password: { label: 'Password', type: 'password' },
          },
          async authorize() {
            return {
              id: '1',
              name: 'na-lab',
              email: 'na-lab@example.com',
            };
          },
        })
      : KakaoProvider({
          clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
          clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET,
        }),
  ],
});
