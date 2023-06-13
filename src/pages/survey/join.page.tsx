import Image from 'next/image';
import { css, type Theme } from '@emotion/react';
import { m } from 'framer-motion';

import CTAButton from '~/components/button/CTAButton';
import useKakaoLogin from '~/components/kakaoLoginButton/useKakaoLogin';
import StaggerWrapper from '~/components/stagger/StaggerWrapper';
import { CTAVariants, fixedBottomCss, fixedContainerCss } from '~/features/survey/styles';
import { type QuestionRequest } from '~/features/survey/types';
import useDidUpdate from '~/hooks/lifeCycle/useDidUpdate';
import useLocalStorage from '~/hooks/storage/useLocalStorage';

const JoinGuidePage = () => {
  const { loginHandler, isLoginState } = useKakaoLogin();
  // TODO : storage key 변경
  const [createSurveyRequest] = useLocalStorage<QuestionRequest[]>('createSurveyRequest', []);

  useDidUpdate(() => {
    if (isLoginState) {
      // TODO : 로그인이 되었으므로, 로컬 스토리지의 값으로 나의 질문 폼 생성 API 호출
      console.log('createSurveyRequest: ', createSurveyRequest);
    }
  }, [isLoginState]);

  return (
    <main css={mainCss}>
      <picture css={pictureCss}>
        <source srcSet="/images/survey/join-guide.webp" type="image/webp" />
        <Image src="/images/survey/join-guide.png" alt="회원가입 안내" fill />
      </picture>

      <StaggerWrapper wrapperOverrideCss={fixedContainerCss(25)}>
        <p>회원가입 하고</p>
        <p>당신의 커리어 질문 폼을</p>
        <p>
          동료들에게 <strong>공유</strong>하세요!
        </p>
      </StaggerWrapper>

      {/* TODO : 카카오 회원가입 버튼 스타일 변경  */}
      <m.div css={fixedBottomCss} variants={CTAVariants} initial="initial" animate="animate" exit="exit">
        <CTAButton onClick={loginHandler}>카카오 계정으로 회원가입 하기</CTAButton>
      </m.div>
    </main>
  );
};

export default JoinGuidePage;

const mainCss = (theme: Theme) => css`
  width: 100%;
  height: 100vh;

  & strong {
    font-weight: 500;
    color: ${theme.colors.primary_300};
  }
`;

const pictureCss = (theme: Theme) => css`
  position: fixed;
  z-index: ${theme.zIndex.belowDefault};
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: ${theme.size.maxWidth};
  height: 100%;

  & > img {
    object-fit: cover;
  }
`;
