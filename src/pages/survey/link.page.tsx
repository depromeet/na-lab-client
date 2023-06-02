import { css, type Theme } from '@emotion/react';
import { m } from 'framer-motion';

import CTAButton from '~/components/button/CTAButton';
import LinkIcon from '~/components/icons/LinkIcon';
import StaggerWrapper from '~/components/stagger/StaggerWrapper';
import Toast from '~/components/toast/Toast';
import useToast from '~/components/toast/useToast';
import { fixedBottomCss } from '~/features/review/style';
import { CTAVariants, fixedContainerCss, imageVariant } from '~/features/survey/styles';
import { copyToClipBoard } from '~/utils/clipboard';

const SurveyLinkPage = () => {
  const { fireToast } = useToast();

  const onNext = () => {
    // TODO : 나의 질문 폼 링크 생성 후 교체
    copyToClipBoard(window.location.href);

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
        <p>아래 공유하기 버튼을 눌러</p>
        <p>
          <strong css={strongCss}>나의 질문 폼 링크</strong>를 복사하세요!
        </p>
      </StaggerWrapper>
      <section css={fixedContainerCss(58)}>
        <m.div variants={imageVariant} initial="initial" animate="animate" exit="exit">
          <img src="/images/survey/link.png" width={184} height={277} alt="link guide" />
        </m.div>
      </section>

      {/* TODO : 카카오 회원가입 버튼 스타일 변경  */}
      <m.div css={fixedBottomCss} variants={CTAVariants} initial="initial" animate="animate" exit="exit">
        <CTAButton color="blue" onClick={onNext}>
          공유하기
        </CTAButton>
      </m.div>
    </main>
  );
};

export default SurveyLinkPage;

const mainCss = css`
  width: 100%;
  height: 100vh;
`;

const strongCss = (theme: Theme) => css`
  color: ${theme.colors.primary_200};
`;
