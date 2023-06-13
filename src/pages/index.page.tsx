import { type ReactElement } from 'react';
import { css, type Theme } from '@emotion/react';

import Logo from '~/assets/Logo';
import CTAButton from '~/components/button/CTAButton';
import KakaoLoginButton from '~/components/kakaoLoginButton/KakaoLoginButton';
import LayoutPaddingTo23 from '~/components/layout/LayoutPaddingTo23';
import useInternalRouter from '~/hooks/router/useInternalRouter';

export default function Home() {
  const router = useInternalRouter();

  return (
    <main css={loginPageWrapperCss}>
      <Logo css={logoCss} />

      {/* NOTE: 질문 폼 생성을 위한 임시 코드 */}
      {/* <button
        type="button"
        onClick={() =>
          post('/surveys', {
            question_count: 4,
            question: [
              {
                type: 'short',
                form_type: 'strength',
                title: '저는 UX, UI, GUI 중에 어떤 분야에 더 강점이 있나요?',
                order: 5,
              },
              {
                type: 'choice',
                form_type: 'custom',
                title: '저는 UI, UI, GUI 중에 어떤 분야를 가장 잘하는 것 같나요?',
                choices: [
                  {
                    content: 'UI',
                    order: 1,
                  },
                  {
                    content: 'UX',
                    order: 2,
                  },
                ],
                max_selectable_count: 1,
                order: 6,
              },
              {
                type: 'short',
                form_type: 'custom',
                title: '이건 테스트 입니다',
                order: 7,
              },
              {
                type: 'choice',
                form_type: 'custom',
                title: '저는 UI, UI, GUI 중에 어떤 분야를 가장 잘하는 것 같나요?',
                choices: [
                  {
                    content: 'UI',
                    order: 1,
                  },
                  {
                    content: 'UX',
                    order: 2,
                  },
                  {
                    content: 'TEST',
                    order: 3,
                  },
                  {
                    content: 'TEST2',
                    order: 4,
                  },
                ],
                max_selectable_count: 2,
                order: 8,
              },
            ],
          })
        }
      >
        test
      </button> */}

      <section css={ctaWrapperCss}>
        <CTAButton color="blue" onClick={() => router.push('/survey')}>
          질문 폼 생성으로 시작하기
        </CTAButton>
        <KakaoLoginButton />
      </section>
    </main>
  );
}

Home.getLayout = (page: ReactElement) => <LayoutPaddingTo23>{page}</LayoutPaddingTo23>;

const loginPageWrapperCss = css`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100dvh;
`;

const logoCss = css`
  margin-top: 176px;
`;

const ctaWrapperCss = (theme: Theme) => css`
  position: fixed;
  bottom: 36px;

  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;

  width: 100%;
  max-width: ${theme.size.maxWidth};
  padding: 0 23px;
`;
