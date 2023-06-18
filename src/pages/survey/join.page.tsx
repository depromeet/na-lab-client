import Image from 'next/image';
import { css, type Theme } from '@emotion/react';
import { useAtomValue } from 'jotai';

import CTAButton from '~/components/button/CTAButton';
import KakaoIcon from '~/components/icons/KakaoIcon';
import SEO from '~/components/SEO/SEO';
import StaggerWrapper from '~/components/stagger/StaggerWrapper';
import TooltipButton from '~/components/tooltipButton/TooltipButton';
import { fixedContainerCss } from '~/features/survey/styles';
import useCreateSurveyAction from '~/features/survey/useCreateSurvey';
import useKakaoLogin from '~/hooks/auth/useKakaoLogin';
import useDidUpdate from '~/hooks/lifeCycle/useDidUpdate';
import { isUserTokenValidAtom } from '~/store/auth';

const JoinGuidePage = () => {
  const { loginHandler, status } = useKakaoLogin();
  const { onCreate } = useCreateSurveyAction();

  const isUserTokenValid = useAtomValue(isUserTokenValidAtom);

  useDidUpdate(() => {
    if (status === 'authenticated') {
      if (isUserTokenValid) {
        onCreate();
      }
    }
  }, [status, isUserTokenValid]);

  return (
    <>
      <SEO />

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

        <TooltipButton tooltipLabel="피드백 데이터를 간편하게 모아볼 수 있어요!">
          <CTAButton css={kakaoButtonCss} onClick={loginHandler}>
            <KakaoIcon />
            <span>카카오 계정으로 회원가입 하기</span>
          </CTAButton>
        </TooltipButton>
      </main>
    </>
  );
};

export default JoinGuidePage;

const kakaoButtonCss = css`
  display: flex;
  gap: 9px;
  align-items: center;

  color: #371c1d;

  background-color: #f7e600;

  &:hover {
    color: #371c1d;
    background-color: #f7e600;
  }
`;
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
