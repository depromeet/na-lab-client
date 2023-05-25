import { css, type Theme } from '@emotion/react';
import { type Meta } from '@storybook/react';
import { domAnimation, LazyMotion } from 'framer-motion';

import useBoolean from '~/hooks/common/useBoolean';

import BlueWarningIcon from '../icons/BlueWarningIcon';
import Dialog from './Dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Dialog',
  component: Dialog,
};

export default meta;

export function Default() {
  const [isShowing, _, onOpen, onClose] = useBoolean(false);

  return (
    <LazyMotion features={domAnimation}>
      <button type="button" onClick={onOpen}>
        dialog button
      </button>
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
        confirmButton={<Dialog.ConfirmButton onClick={onClose}>네</Dialog.ConfirmButton>}
      />
    </LazyMotion>
  );
}

const descriptionWrapperCss = css`
  display: flex;
  gap: 3px;
  align-items: center;
`;

const descriptionCss = ({ colors }: Theme) => css`
  color: ${colors.primary_200};
`;
