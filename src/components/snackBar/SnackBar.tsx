import { css, type Theme } from '@emotion/react';

import { type SnackBarProps } from '~/store/snackBar';
import { BODY_1 } from '~/styles/typo';

import useSnackBar from './useSnackBar';

const Content = ({ content }: Pick<SnackBarProps, 'content'>) => {
  return <div css={contentCss}>{typeof content === 'string' ? <span>{content}</span> : content}</div>;
};

const contentCss = (theme: Theme) => css`
  ${BODY_1};

  z-index: ${theme.zIndex.fixed};

  width: fit-content;
  padding: 16px 20px;

  color: #f7f8f9;

  background-color: ${theme.colors.gray_500};
  border-radius: 14px;
`;

type DeleteButtonProps = Pick<SnackBarProps, 'deleteElement' | 'id'>;

const DeleteButton = ({ id, deleteElement }: DeleteButtonProps) => {
  const { removeSnackBarById } = useSnackBar();

  return (
    <button type="button" onClick={() => removeSnackBarById(id)} css={deleteButtonCss}>
      {deleteElement}
    </button>
  );
};

const deleteButtonCss = (theme: Theme) => css`
  ${BODY_1};

  min-width: 40px;
  margin-left: 10px;
  color: ${theme.colors.primary_200};
  text-align: right;
`;

const SnackBar = {
  Content,
  DeleteButton,
};

export default SnackBar;
