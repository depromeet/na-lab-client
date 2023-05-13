import { css } from '@emotion/react';
import { type Meta } from '@storybook/react';
import { domAnimation, LazyMotion } from 'framer-motion';

import useBoolean from '~/hooks/common/useBoolean';

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
        title={'이대로 질문 폼을 생성할까요?'}
        description={'한 번 만든 질문 폼은 수정할 수 없어요.'}
        cancelButton={
          <button type="button" css={[buttonCss, cancelButtonCss]} onClick={onClose}>
            다시 볼게요
          </button>
        }
        confirmButton={
          <button type="button" css={[buttonCss, confirmButtonCss]} onClick={onClose}>
            네
          </button>
        }
      />
    </LazyMotion>
  );
}

const buttonCss = css`
  all: unset;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 55px;

  font-size: 18px;
  font-weight: 600;
  font-style: normal;
  line-height: 21px;
  text-align: center;

  border-radius: 12px;
`;

const cancelButtonCss = css`
  color: #17171b;
  background: #f7f8f9;
`;

const confirmButtonCss = css`
  color: #fff;
  background: #1d2942;
`;
