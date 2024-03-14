import { type ComponentType } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { css, type Theme, useTheme } from '@emotion/react';

import HomeIcon from '~/components/bottomBar/HomeIcon';
import MypageIcon from '~/components/bottomBar/MypageIcon';
import QuestionIcon from '~/components/bottomBar/QuestionIcon';
import useGetSurveyIdByUserStatus from '~/hooks/api/surveys/useGetSurveyIdByUserStatus';

interface TabItem {
  text: string;
  path: string;
  icon: ComponentType<{ color?: string }>;
}

const BottomBar = () => {
  const theme = useTheme();
  const router = useRouter();

  const currentPath = router.pathname;
  const { data, 생성한_질문폼이_있는가 } = useCheckSurveyId();

  const TAB_ITEMS: TabItem[] = [
    {
      text: '홈',
      path: '/gallery',
      icon: HomeIcon,
    },
    {
      text: '질문폼',
      path: 생성한_질문폼이_있는가 ? '/result' : '/survey/base',
      icon: QuestionIcon,
    },
    {
      text: '내 명함',
      path: `/dna/${data?.survey_id}`,
      icon: MypageIcon,
    },
  ];

  const getIsSelected = (path: string | string[]) => {
    if (Array.isArray(path)) return path.includes(currentPath);

    return path === currentPath;
  };

  const getIconColor = (path: string | string[]) => {
    const isSelected = getIsSelected(path);
    if (isSelected) return theme.colors.primary_300;

    return theme.colors.gray_300;
  };

  return (
    <footer css={BottomBarCss(theme)}>
      {TAB_ITEMS.map((item) => (
        <Link key={item.path} href={item.path} css={[IconBoxCss(theme), getIsSelected(item.path) && selectedCss]}>
          <item.icon color={getIconColor(item.path)} />
          <span>{item.text}</span>
        </Link>
      ))}
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

const IconBoxCss = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;

  text-decoration: none;

  span {
    font-size: 12px;
    font-weight: 400;
    font-style: normal;
    color: ${theme.colors.gray_300};
    text-align: center;
  }
`;

const selectedCss = (theme: Theme) => css`
  span {
    color: ${theme.colors.primary_300};
  }
`;

const useCheckSurveyId = () => {
  const { status } = useSession();

  const { isLoading, data } = useGetSurveyIdByUserStatus({ enabled: status === 'authenticated' });
  const 생성한_질문폼이_있는가 = Boolean(data?.survey_id);

  return { isLoading, data, 생성한_질문폼이_있는가 };
};
