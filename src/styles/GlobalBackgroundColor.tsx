import { css, Global } from '@emotion/react';

import { MAIN_LAYOUT_ID } from '~/constants/name';

interface Props {
  globalBackgroundColor: string;
}

const GlobalBackgroundColor = ({ globalBackgroundColor }: Props) => {
  return (
    <Global
      styles={css`
        #${MAIN_LAYOUT_ID} {
          background-color: ${globalBackgroundColor};
        }
      `}
    />
  );
};

export default GlobalBackgroundColor;
