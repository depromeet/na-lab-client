import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { css, type Theme, useTheme } from '@emotion/react';

import HomeIcon from '~/components/bottomBar/HomeIcon';
import MypageIcon from '~/components/bottomBar/MypageIcon';
import QuestionIcon from '~/components/bottomBar/QuestionIcon';
import useGetSurveyIdByUserStatus from '~/hooks/api/surveys/useGetSurveyIdByUserStatus';

const BottomBar = () => {
  const theme = useTheme();
  const router = useRouter();

  const currentPath = router.pathname;
  const { data, 생성한_질문폼이_있는가 } = useCheckSurveyId();

  const getIconColor = (path: string | string[]) => {
    if (Array.isArray(path))
      return path.includes(currentPath) ? `${theme.colors.primary_300}` : `${theme.colors.gray_300}`;

    return path === currentPath ? `${theme.colors.primary_300}` : `${theme.colors.gray_300}`;
  };

  return (
    <footer css={BottomBarCss(theme)}>
      <Link href="/gallery" css={IconBoxCss(theme, '/gallery' === currentPath)}>
        <HomeIcon color={getIconColor('/gallery')} />
        <span className="text">홈</span>
      </Link>

      <Link
        href={생성한_질문폼이_있는가 ? '/result' : '/survey/create'}
        css={IconBoxCss(theme, '/survey/create' === currentPath)}
      >
        <QuestionIcon color={getIconColor(['/result', '/survey/create'])} />
        <span className="text">질문폼</span>
      </Link>

      <Link href={`/dna/${data?.survey_id}`} css={IconBoxCss(theme, false)}>
        <MypageIcon />
        <span className="text">내 명함</span>
      </Link>
    </footer>
  );
};

export default BottomBar;

const BottomBarCss = (theme: Theme) => css`
  position: fixed;
  bottom: 0;
  left: 0;

  display: flex;
  gap: 86px;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 73px;
  padding-top: 10px;

  background-color: ${theme.colors.white};
`;

const IconBoxCss = (theme: Theme, actived: boolean) => css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;

  text-decoration: none;

  .text {
    font-size: 12px;
    font-weight: 400;
    font-style: normal;
    color: ${actived ? `${theme.colors.primary_300}` : `${theme.colors.gray_300}`};
    text-align: center;
  }
`;

const useCheckSurveyId = () => {
  const { status } = useSession();

  const { isLoading, data } = useGetSurveyIdByUserStatus({ enabled: status === 'authenticated' });
  const 생성한_질문폼이_있는가 = Boolean(data?.survey_id);

  return { isLoading, data, 생성한_질문폼이_있는가 };
};
