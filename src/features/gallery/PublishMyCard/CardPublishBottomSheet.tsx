import { css, type Theme } from '@emotion/react';

import BottomSheet from '~/components/bottomSheet/BottomSheet';
import Button from '~/components/button/Button';
import { XCircleButton } from '~/components/button/CircleButton';
import BottomSheetHandleIcon from '~/components/icons/BottomSheetHandleIcon';
import Card, { CardSkeleton } from '~/features/gallery/Card';
import { fixedBottomCss } from '~/features/survey/styles';
import useGetGalleryPreview from '~/hooks/api/gallery/useGetGalleryPreview';
import useScrollLock from '~/hooks/common/useScrollLock';
import { type JobType } from '~/remotes/gallery';
import { BODY_1, DETAIL, HEAD_1 } from '~/styles/typo';

interface Props {
  isShowing: boolean;
  onClose: () => void;

  job: JobType;
  onSubmit: () => void;
}

function CardPublishBottomSheet(props: Props) {
  const { data } = useGetGalleryPreview({
    enabled: props.isShowing,
  });

  useScrollLock({ lock: props.isShowing });

  return (
    <BottomSheet isShowing={props.isShowing} onClickOutside={props.onClose}>
      <BottomSheetHandleIcon />
      <div css={innerCss}>
        <hgroup css={headingCss}>
          <h1>내 커리어 명함 게시하기</h1>
          <p>명함 갤러리에 게시 후 서로의 명함을 저장해보세요</p>
        </hgroup>
        <section>
          <div css={tagCss}>미리보기</div>
          {data ? (
            <Card survey={data.survey} target={data.target} isMine isBookmarked={false} isPreview />
          ) : (
            <CardSkeleton />
          )}
        </section>
        <article css={[fixedBottomCss, bottomCss]}>
          <XCircleButton onClick={props.onClose} />
          <Button css={submitButtonCss} onClick={props.onSubmit}>
            게시하기
          </Button>
        </article>
      </div>
    </BottomSheet>
  );
}

export default CardPublishBottomSheet;

const innerCss = css`
  overflow-y: auto;

  width: 100%;
  min-height: fit-content;
  max-height: calc(100vh - 12px);
  padding: 47px 20px 94px;
`;

const headingCss = (theme: Theme) => css`
  margin-bottom: 35px;
  text-align: center;

  h1 {
    ${HEAD_1};
    color: ${theme.colors.black};
  }

  p {
    ${BODY_1};
    margin-top: 4px;
    color: ${theme.colors.gray_500};
  }
`;

const tagCss = (theme: Theme) => css`
  ${DETAIL};
  width: fit-content;
  margin-bottom: 18px;
  margin-inline: auto;
  padding: 4px 10px;

  color: ${theme.colors.gray_500};

  background-color: ${theme.colors.gray_50};
  border-radius: 8px;
`;

const bottomCss = css`
  display: flex;
  justify-content: space-between;
`;

const submitButtonCss = css`
  width: 50%;
`;
