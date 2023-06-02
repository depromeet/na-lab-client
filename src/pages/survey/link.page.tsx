import { css } from '@emotion/react';
import { m } from 'framer-motion';

import CTAButton from '~/components/button/CTAButton';
import LinkIcon from '~/components/icons/LinkIcon';
import StaggerWrapper from '~/components/stagger/StaggerWrapper';
import Toast from '~/components/toast/Toast';
import useToast from '~/components/toast/useToast';
import { fixedBottomCss } from '~/features/review/style';
import { CTAVariants, fixedContainerCss, imageVariant } from '~/features/survey/styles';

const SurveyLinkPage = () => {
  const { fireToast } = useToast();

  const onNext = () => {
    fireToast({
      content: (
        <>
          <LinkIcon />
          <Toast.Text>나의 질문 폼 링크가 복사되었어요</Toast.Text>,
        </>
      ),
      higherThanCTA: true,
    });
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
        <CTAButton onClick={onNext}>공유하기</CTAButton>
      </m.div>
    </main>
  );
};

export default SurveyLinkPage;

const mainCss = css`
  width: 100%;
  height: 100vh;
`;
