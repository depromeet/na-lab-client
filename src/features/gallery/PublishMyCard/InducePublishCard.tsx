import Image from 'next/image';
import { css, type Theme } from '@emotion/react';
import { m } from 'framer-motion';

import Button from '~/components/button/Button';
import { defaultFadeInVariants } from '~/constants/motions';
import { useGetLogin } from '~/hooks/api/user/useGetLogined';
import { BODY_1, BODY_2_REGULAR, HEAD_1_BOLD } from '~/styles/typo';

interface Props {
  onSubmit: () => void;
}

function InducePublishCard(props: Props) {
  const { data: userInfo, isFetching, isError } = useGetLogin();

  if (isFetching || isError) return null;

  return (
    <m.section css={containerCss} initial="initial" animate="animate" exit="exit" variants={defaultFadeInVariants}>
      <hgroup>
        <h2>{userInfo?.nickname} 님</h2>
        <p>커리어 명함을 게시해보세요.</p>
      </hgroup>
      <Image css={imageCss} src="/images/gallery/imgUploadCareerCard.png" alt="명함 게시하기" width={56} height={56} />
      <Button css={buttonCss} onClick={props.onSubmit}>
        내 명함 게시하기
      </Button>
    </m.section>
  );
}

export default InducePublishCard;

const buttonCss = css`
  ${BODY_2_REGULAR};
  width: calc(100% - 64px);
  height: 42px;
  margin: 0 34px;
`;

const containerCss = (theme: Theme) => css`
  position: relative;

  width: 100%;
  margin-bottom: 18px;
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
`;

const imageCss = css`
  position: absolute;
  top: 49px;
  right: 24px;
`;

const closeButtonCss = css`
  position: absolute;
  top: 0;
  right: 0;

  width: fit-content;
  padding: 10px;
`;
