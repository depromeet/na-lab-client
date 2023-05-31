import { css } from '@emotion/react';
import { m } from 'framer-motion';

import CTAButton from '~/components/button/CTAButton';
import StaggerWrapper from '~/components/stagger/StaggerWrapper';
import { CTAVariants, fixedBottomCss, fixedContainerCss, imageVariant } from '~/features/survey/styles';

const JoinGuidePage = () => {
  const onNext = () => {
    console.info('onNext');
  };

  return (
    <main css={mainCss}>
      <StaggerWrapper wrapperOverrideCss={fixedContainerCss(25)}>
        <p>회원가입 하고</p>
        <p>당신의 커리어 질문 폼을</p>
        <p>
          동료들에게 <strong>공유</strong>하세요!
        </p>
      </StaggerWrapper>
      <section css={fixedContainerCss(58)}>
        <m.div variants={imageVariant} initial="initial" animate="animate" exit="exit">
          <img src="/images/survey/join_guide.png" width={300} height={300} alt="join guide" />
        </m.div>
      </section>

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
