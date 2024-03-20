import Image from 'next/image';
import { css, type Theme } from '@emotion/react';
import { useAtomValue } from 'jotai';

import CTAButton from '~/components/button/CTAButton';
import Dialog from '~/components/dialog/Dialog';
import KakaoIcon from '~/components/icons/KakaoIcon';
import SEO from '~/components/SEO/SEO';
import StaggerWrapper from '~/components/stagger/StaggerWrapper';
import TooltipButton from '~/components/tooltipButton/TooltipButton';
import ApiException from '~/exceptions/ApiException';
import { fixedContainerCss } from '~/features/survey/styles';
import useCreateSurveyAction from '~/features/survey/useCreateSurvey';
import { getSurveyIdByStoragedToken } from '~/hooks/api/surveys/useGetSurveyIdByUserStatus';
import useKakaoLogin from '~/hooks/auth/useKakaoLogin';
import useBoolean from '~/hooks/common/useBoolean';
import useDidUpdate from '~/hooks/lifeCycle/useDidUpdate';
import useInternalRouter from '~/hooks/router/useInternalRouter';
import { isUserTokenValidAtom } from '~/store/auth';
import recordEvent from '~/utils/event';

const JoinGuidePage = () => {
  const router = useInternalRouter();
  const { loginHandler, status } = useKakaoLogin();
  const { onCreate } = useCreateSurveyAction();

  const [이미_질문_존재, , set이미_질문_존재] = useBoolean(false);

  const isUserTokenValid = useAtomValue(isUserTokenValidAtom);

  useDidUpdate(() => {
    const 존재하는_질문_확인_후_생성_혹은_다이얼로그_띄우기 = async () => {
      if (status === 'authenticated' && isUserTokenValid) {
        // NOTE: 질문 폼이 존재하는지 확인
        try {
          await getSurveyIdByStoragedToken();
        } catch (e) {
          if (e instanceof ApiException) {
            // NOTE: 질문 폼이 존재하지 않는 경우
            if (e.code === 404) {
              onCreate();

              return;
            }
          }

          throw e;
        }

        recordEvent({ action: '질문 폼이 존재하지만, 질문 폼 생성 시도' });
        set이미_질문_존재();
      }
    };

    존재하는_질문_확인_후_생성_혹은_다이얼로그_띄우기();
  }, [status, isUserTokenValid]);

  const onClickDialogCancel = () => {
    recordEvent({ action: '질문 폼이 존재하지만, 질문 폼 생성 시도 후 취소' });
    router.replace('/');
  };

  const onClickDialogConfirm = () => {
    recordEvent({ action: '질문 폼이 존재하지만, 질문 폼 생성 시도 후 생성' });
    onCreate();
  };

  return (
    <>
      <SEO />

      <Dialog
        isShowing={이미_질문_존재}
        title={<Dialog.Title>이미 질문 폼이 있어요!</Dialog.Title>}
        description={<Dialog.Description>새롭게 만들면, 이전 질문 폼은 삭제돼요.</Dialog.Description>}
        cancelButton={<Dialog.CancelButton onClick={onClickDialogCancel}>돌아가기</Dialog.CancelButton>}
        confirmButton={
          <Dialog.ConfirmButton
            onClick={onClickDialogConfirm}
            css={css`
              flex-shrink: 0;
              width: 150px;
              padding: 14px;
            `}
          >
            그래도 생성하기
          </Dialog.ConfirmButton>
        }
      />

      <main css={mainCss}>
        <picture css={pictureCss}>
          <source srcSet="/images/survey/join-guide.webp" type="image/webp" />
          <Image src="/images/survey/join-guide.png" alt="회원가입 안내" fill />
        </picture>

        <StaggerWrapper wrapperOverrideCss={fixedContainerCss(25)}>
          <p>회원가입 하고</p>
          <p>당신의 커리어 질문 폼을</p>
          <p>
            동료들에게 <strong>공유</strong>하세요!
          </p>
        </StaggerWrapper>

        <TooltipButton tooltipLabel="피드백 데이터를 간편하게 모아볼 수 있어요!">
          <CTAButton css={kakaoButtonCss} onClick={() => loginHandler()}>
            <KakaoIcon />
            <span>카카오 계정으로 회원가입 하기</span>
          </CTAButton>
        </TooltipButton>
      </main>
    </>
  );
};

export default JoinGuidePage;

const kakaoButtonCss = css`
  display: flex;
  gap: 9px;
  align-items: center;

  color: #371c1d;

  background-color: #f7e600;

  &:hover {
    color: #371c1d;
    background-color: #f7e600;
  }
`;
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
