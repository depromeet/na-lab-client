import { css, useTheme } from '@emotion/react';

import EditIcon from '~/components/icons/EditIcon';
import colors from '~/styles/color';

const QuestionIcon = ({ color = 'bluegreen' }) => {
  const theme = useTheme();

  return (
    <div css={ContainerCss(color)}>
      <EditIcon color={theme.colors.white} />
    </div>
  );
};

export default QuestionIcon;

const styles: Record<string, Record<string, string>> = {
  bluegreen: {
    backgroundColor: colors.bluegreen,
  },
  pink: {
    backgroundColor: colors.pink,
  },
};

const ContainerCss = (color: string) => css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;

  border-radius: 10px;
  ${styles[color]}
`;
