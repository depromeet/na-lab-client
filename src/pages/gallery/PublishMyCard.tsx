import Image from 'next/image';
import { css, type Theme } from '@emotion/react';

import Button from '~/components/button/Button';
import { BODY_1, BODY_2_REGULAR, HEAD_1_BOLD } from '~/styles/typo';

function PublishMyCard() {
  return (
    <section css={containerCss}>
      <hgroup>
        <h2>수미 님</h2>
        <p>커리어 명함을 게시해보세요.</p>
      </hgroup>
      <Image css={imageCss} src="/images/gallery/imgUploadCareerCard.png" alt="명함 게시하기" width={56} height={56} />
      <Button css={buttonCss}>내 명함 게시하기</Button>
    </section>
  );
}

export default PublishMyCard;

const buttonCss = css`
  height: 42px;
  ${BODY_2_REGULAR};
`;

const containerCss = (theme: Theme) => css`
  position: relative;
  padding: 49px 24px 24px;
  background-color: ${theme.colors.gray_50};
  border-radius: 20px;

  > hgroup {
    margin-bottom: 36px;

    h2 {
      ${HEAD_1_BOLD};
      color: ${theme.colors.black};
    }

    p {
      ${BODY_1};
      color: ${theme.colors.gray_400};
    }
  }

  button {
    width: calc(100% - 64px);
    margin: 0 34px;
  }
`;

const imageCss = css`
  position: absolute;
  top: 49px;
  right: 24px;
`;
