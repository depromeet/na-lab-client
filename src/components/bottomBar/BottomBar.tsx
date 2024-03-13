import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { css, type Theme, useTheme } from '@emotion/react';

import HomeIcon from '~/components/bottomBar/HomeIcon';
import MypageIcon from '~/components/bottomBar/MypageIcon';
import QuestionIcon from '~/components/bottomBar/QuestionIcon';
import useToast from '~/components/toast/useToast';
import useGetSurveyIdByUserStatus from '~/hooks/api/surveys/useGetSurveyIdByUserStatus';
import useDidUpdate from '~/hooks/lifeCycle/useDidUpdate';
import useInternalRouter from '~/hooks/router/useInternalRouter';

const BottomBar = () => {
  const theme = useTheme();
  const router = useRouter();

  const currentPath = router.pathname;
  const { data } = useCheckSurveyId();

  const onHomeClick = () => {
    router.push('/gallery');
  };

  const onQuestionClick = () => {
    router.push('/survey/create');
  };

  const onMyCardClick = () => {
    router.push(`/dna/${data?.survey_id}`);
  };

  return (
    <footer css={BottomBarCss(theme)}>
      <button type="button" css={IconBoxCss(theme, '/gallery' === currentPath)} onClick={onHomeClick}>
        <HomeIcon color={'/gallery' === currentPath ? `${theme.colors.primary_300}` : `${theme.colors.gray_300}`} />
        <span className="text">홈</span>
      </button>
      <button type="button" css={IconBoxCss(theme, '/survey/create' === currentPath)} onClick={onQuestionClick}>
        <QuestionIcon
          color={'/survey/create' === currentPath ? `${theme.colors.primary_300}` : `${theme.colors.gray_300}`}
        />
        <span className="text">질문폼</span>
      </button>
      <button type="button" css={IconBoxCss(theme, false)} onClick={onMyCardClick}>
        <MypageIcon />
        <span className="text">내 명함</span>
      </button>
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

  .text {
    font-size: 12px;
    font-weight: 400;
    font-style: normal;
    color: ${actived ? `${theme.colors.primary_300}` : `${theme.colors.gray_300}`};
    text-align: center;
  }
`;

const useCheckSurveyId = () => {
  const { fireToast } = useToast();
  const router = useInternalRouter();
  const { status } = useSession();

  const { isLoading, data } = useGetSurveyIdByUserStatus({
    onError: () => {
      fireToast({ content: '문제가 발생했어요. 다시 시도해 주세요.' });
      router.push('/');
    },
  });

  useDidUpdate(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      fireToast({ content: '로그인 후 이용해 주세요.' });
      router.push('/');
    }
  }, [status]);

  return { isLoading, data };
};
