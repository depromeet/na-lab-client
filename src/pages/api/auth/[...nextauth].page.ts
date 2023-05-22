import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';

export default NextAuth({
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
