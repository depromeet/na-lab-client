import { signIn } from 'next-auth/react';

export default function Home() {
  // const { data: session } = useSession();
  return (
    <div>
      <button type="button" onClick={() => signIn('kakao')}>
        카카오로 로그인 하기
      </button>
    </div>
  );
}
