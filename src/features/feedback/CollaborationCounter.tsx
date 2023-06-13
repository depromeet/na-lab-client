import { css, type Theme } from '@emotion/react';

import ProfileIcon from '~/components/icons/ProfileIcon';
import { HEAD_2_BOLD, HEAD_2_REGULAR } from '~/styles/typo';

interface Props {
  count: { yes: number; no: number };
}

const CollaborationCounter = ({ count }: Props) => (
  <div css={containerCss}>
    <CollaborationCounterCard count={count.yes} positive={false} />
    <CollaborationCounterCard count={count.no} positive={true} />
  </div>
);

const containerCss = css`
  display: flex;
  gap: 7px;
`;

const CollaborationCounterCard = ({ count, positive }: { count: number; positive: boolean }) => {
  return (
    <div css={(theme) => cardCss(theme, positive)}>
      <div css={textCss}>
        <span>협업 경험 {positive ? '있' : '없'}어요</span>
        <div css={countCss}>
          <ProfileIcon viewBox="0 0 30 30" width={20} height={20} color={positive ? '#638FFF' : '#677089'} />
          <span css={HEAD_2_BOLD}>{count}명</span>
        </div>
      </div>
    </div>
  );
};

const cardCss = (theme: Theme, positive: boolean) => css`
  ${positive ? HEAD_2_BOLD : HEAD_2_REGULAR}

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 7px 14px;

  color: ${positive ? theme.colors.primary_200 : theme.colors.gray_400};

  background-color: ${positive ? theme.colors.primary_100 : theme.colors.gray_50};
  border-radius: 8px;
`;

const textCss = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const countCss = css`
  display: flex;
  align-items: center;
`;

export default CollaborationCounter;
