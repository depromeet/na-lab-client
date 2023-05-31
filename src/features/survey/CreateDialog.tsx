import { css, type Theme } from '@emotion/react';

import Dialog from '~/components/dialog/Dialog';
import BlueWarningIcon from '~/components/icons/BlueWarningIcon';

interface Props {
  isShowing: boolean;
  onClose: () => void;
  onAction: () => void;
}

const CreateDialog = ({ isShowing, onAction, onClose }: Props) => {
  return (
    <Dialog
      isShowing={isShowing}
      onClickOutside={onClose}
      title={<Dialog.Title>{`이대로 질문 폼을\n생성할까요?`}</Dialog.Title>}
      description={
        <div css={descriptionWrapperCss}>
          <BlueWarningIcon />
          <Dialog.Description
            descriptionCss={(theme: Theme) => descriptionCss(theme)}
          >{`한 번 만든 질문 폼은 수정할 수 없어요.`}</Dialog.Description>
        </div>
      }
      cancelButton={<Dialog.CancelButton onClick={onClose}>다시 볼게요</Dialog.CancelButton>}
      confirmButton={
        <Dialog.ConfirmButton
          onClick={() => {
            onAction();
            onClose();
          }}
        >
          네
        </Dialog.ConfirmButton>
      }
    />
  );
};

export default CreateDialog;

const descriptionWrapperCss = css`
  display: flex;
  gap: 3px;
  align-items: center;
`;

const descriptionCss = ({ colors }: Theme) => css`
  color: ${colors.primary_200};
`;
