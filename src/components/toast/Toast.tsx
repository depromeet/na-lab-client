import { css, type Theme } from '@emotion/react';

import { type ToastProps } from '~/store/toast';
import { BODY_1 } from '~/styles/typo';

const Content = ({ content }: Pick<ToastProps, 'content'>) => {
  return <div css={toastCss}>{typeof content === 'string' ? <Toast.Text>{content}</Toast.Text> : content}</div>;
};

const toastCss = css`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;

  height: 56px;
  padding: 16px 20px;

  background-color: #394258cc;
  backdrop-filter: blur(4px);
  border-radius: 44px;
`;

const Text = ({ children }: { children: string }) => {
  return <span css={toastTextCss}>{children}</span>;
};

const toastTextCss = ({ colors }: Theme) => css`
  ${BODY_1};

  color: ${colors.white};
`;

const Toast = {
  Content,
  Text,
};

export default Toast;
