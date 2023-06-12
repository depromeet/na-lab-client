import { css } from '@emotion/react';

import useInternalRouter from '~/hooks/router/useInternalRouter';
import colors from '~/styles/color';
import { HEAD_2_BOLD } from '~/styles/typo';

import ArrowIcon from '../icons/ArrowIcon.tsx';
import LineThreeDotsIcon from '../icons/LineThreeDotsIcon.tsx';

interface Props {
  title: string;
}

const Navigation = ({ title }: Props) => {
  const router = useInternalRouter();

  const goBack = () => {
    router.back();
  };

  const showBottomSheet = () => {
    // todo 클릭 시 바텀시트 나오게 작업 필요
  };

  return (
    <div css={NavCss}>
      <ArrowIcon onClick={goBack} />
      {title}
      <LineThreeDotsIcon onClick={showBottomSheet} />
    </div>
  );
};

export default Navigation;

const NavCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 375px;
  height: 56px;
  ${HEAD_2_BOLD}

  padding: 0 12px;

  border-bottom: 1px solid ${colors.gray_50};
`;
