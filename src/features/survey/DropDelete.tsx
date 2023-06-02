import { css, type Theme } from '@emotion/react';

import DeleteIcon from '~/components/icons/DeleteIcon';

interface Props {
  ref: React.RefObject<HTMLDivElement>;
}
const DropDelete = ({ ref }: Props) => {
  return (
    <div css={containerCss} ref={ref}>
      <DeleteIcon />
    </div>
  );
};

export default DropDelete;

const containerCss = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 56px;
  height: 56px;

  background-color: ${theme.colors.red};
  border-radius: 50%;
`;
