import Image from 'next/image';
import { css, type Theme, useTheme } from '@emotion/react';

import ChevronArrowRightIcon from '~/components/icons/ChevronArrowRightIcon';
import { BODY_1, HEAD_2_BOLD } from '~/styles/typo';

import files from '../../../public/images/files.png';

const CollaborationBadge = () => {
  const theme = useTheme();
  const count = 1;

  return (
    <button type="button" css={[HEAD_2_BOLD, ContainerCss]}>
      <section css={LeftBoxCss(theme)}>
        <article>
          <div css={TextWrapperCss(theme)}>
            <main>쌓인 연구 일지 보러가기</main>
            <ChevronArrowRightIcon css={ChevronArrowRightIconCss} />
          </div>
          <div css={[BODY_1, UnreadMsgCountBadge(theme)]}>+{count}</div>
        </article>
        {/* TODO: 이미지는 3D 작업 완료 되면 변경 예정 */}
        <Image css={FileImageCss} src={files} alt="파일 이미지" width={93} height={70} />
      </section>
      <aside css={RightMarkCss(theme)}></aside>
    </button>
  );
};

export default CollaborationBadge;

const ContainerCss = () => css`
  display: flex;
  flex-direction: row;

  width: 360px;
  height: 120px;

  box-shadow: 3px 1px 18px -2px #b0b7ca59;
`;

const LeftBoxCss = (theme: Theme) => css`
  display: flex;
  flex-direction: row;

  width: 350px;
  height: 118px;

  background-color: ${theme.colors.white};
`;

const TextWrapperCss = (theme: Theme) => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin: 24px auto auto 38px;

  color: ${theme.colors.gray_500};
`;

const ChevronArrowRightIconCss = css`
  margin-left: 11px;
`;

const UnreadMsgCountBadge = (theme: Theme) => css`
  width: 33px;
  height: 24px;
  margin: 11px auto auto 38px;

  color: ${theme.colors.gray_50};

  background-color: ${theme.colors.red};
  border-radius: 24px;
`;

const FileImageCss = css`
  margin: 50px 22px auto auto;
`;

const RightMarkCss = (theme: Theme) => css`
  width: 10px;
  height: 118px;
  background-color: ${theme.colors.secondary_200};
  border-radius: 0 8px 8px 0;
`;
