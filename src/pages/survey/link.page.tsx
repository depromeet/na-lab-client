import Image from 'next/image';
import { css, type Theme } from '@emotion/react';
import { m } from 'framer-motion';

import CTAButton from '~/components/button/CTAButton';
import LinkIcon from '~/components/icons/LinkIcon';
import SEO from '~/components/SEO/SEO';
import StaggerWrapper from '~/components/stagger/StaggerWrapper';
import Toast from '~/components/toast/Toast';
import useToast from '~/components/toast/useToast';
import { fixedBottomCss } from '~/features/review/style';
import { CTAVariants, fixedContainerCss } from '~/features/survey/styles';
import useInternalRouter from '~/hooks/router/useInternalRouter';
import { copyToClipBoard } from '~/utils/clipboard';

const SurveyLinkPage = () => {
  const { fireToast } = useToast();
  const router = useInternalRouter();

  const onNext = () => {
    if (!router.isReady) {
      throw new Error('잠시만 기다려주세요. ');
    }
    const id = router.query.id;

    if (!id) {
      throw new Error('잘못된 경로입니다.\nsurveyId가 없습니다.');
    }
    const hostUrl = window.location.host;
    const copyUrl = `${hostUrl}/review?id=${id}`;
    copyToClipBoard(copyUrl);

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
    <>
      <SEO />

      <main css={mainCss}>
        <picture css={pictureCss}>
          <source srcSet="/images/survey/link-guide.webp" type="image/webp" />
          <Image src="/images/survey/link-guide.png" alt="링크 공유 안내" fill />
        </picture>

        <StaggerWrapper wrapperOverrideCss={fixedContainerCss(25)}>
          <p>아래 공유하기 버튼을 눌러</p>
          <p>
            <strong>나의 질문 폼 링크</strong>를 복사하세요!
          </p>
        </StaggerWrapper>

        <m.div css={fixedBottomCss} variants={CTAVariants} initial="initial" animate="animate" exit="exit">
          <CTAButton color="blue" onClick={onNext}>
            질문 폼 공유하기
          </CTAButton>
        </m.div>
      </main>
    </>
  );
};

export default SurveyLinkPage;

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
