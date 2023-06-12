import Image from 'next/image';
import { css, type Theme } from '@emotion/react';
import { m } from 'framer-motion';

import CTAButton from '~/components/button/CTAButton';
import StaggerWrapper from '~/components/stagger/StaggerWrapper';
import { CTAVariants, fixedBottomCss, fixedContainerCss } from '~/features/survey/styles';

const JoinGuidePage = () => {
  const onNext = () => {
    console.info('onNext');
  };

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
          동료들에게 <strong css={strongCss}>공유</strong>하세요!
        </p>
      </StaggerWrapper>

      {/* TODO : 카카오 회원가입 버튼 스타일 변경  */}
      <m.div css={fixedBottomCss} variants={CTAVariants} initial="initial" animate="animate" exit="exit">
        <CTAButton onClick={onNext}>카카오 계정으로 회원가입 하기</CTAButton>
      </m.div>
    </main>
  );
};

export default JoinGuidePage;

const mainCss = css`
  width: 100%;
  height: 100vh;
`;

const strongCss = (theme: Theme) => css`
  color: ${theme.colors.primary_200};
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
