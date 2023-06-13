import { css, type Theme } from '@emotion/react';

import CTAButton from '~/components/button/CTAButton';
import InternalLink from '~/components/link/InternalLink';
import { BODY_1, HEAD_1 } from '~/styles/typo';

const InternalError = () => {
  return (
    <main css={defaultLayoutCss}>
      <section css={sectionCss}>
        <h1 css={headingCss}>서버 에러가 발생했어요</h1>
        <small css={smallCss}>500</small>
      </section>

      <section css={sectionCss}>
        <p css={paragraphCss}>잠시 후 아래 버튼을 눌러 주세요.</p>
        <InternalLink href="/" css={linkCss}>
          <CTAButton>홈으로 돌아가기</CTAButton>
        </InternalLink>
      </section>
    </main>
  );
};

export default InternalError;

const defaultLayoutCss = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  max-width: ${theme.size.maxWidth};
  min-height: 100vh;
  margin: 0 auto;
  padding: 20dvh 16px;
`;

const sectionCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const headingCss = css`
  ${HEAD_1}

  margin-bottom: 6px;
`;

const smallCss = (theme: Theme) => css`
  ${BODY_1};

  color: ${theme.colors.gray_300};
`;

const paragraphCss = (theme: Theme) => css`
  ${BODY_1};

  margin-bottom: 14px;
  color: ${theme.colors.gray_500};
`;

const linkCss = css`
  all: unset;
  width: 100%;
`;
