import { type ComponentProps, type InputHTMLAttributes } from 'react';
import { css, type Theme } from '@emotion/react';

import Softskill from '~/components/graphic/softskills/Softskill';
import Pill from '~/components/pill/Pill';
import { skyblueCss } from '~/components/pill/style';

type InputAttributes = InputHTMLAttributes<HTMLInputElement>;

interface Props extends InputAttributes {
  graphicName: ComponentProps<typeof Softskill>['name'];
  name: string;
}

const PillCheckbox = ({ graphicName, name, ...rest }: Props) => {
  return (
    <label css={labelCss}>
      <input type="checkbox" value={graphicName} {...rest} />
      <Pill color="default">
        <Softskill name={graphicName} />
        {name}
      </Pill>
    </label>
  );
};

export default PillCheckbox;

const labelCss = (theme: Theme) => css`
  & > input {
    display: none;
    appearance: none;
  }

  & > input:checked + span {
    ${skyblueCss(theme)}
  }
`;
