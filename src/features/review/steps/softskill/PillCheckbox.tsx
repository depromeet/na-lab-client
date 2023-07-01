import { type ComponentProps, type InputHTMLAttributes } from 'react';
import { css } from '@emotion/react';

import Softskill from '~/components/graphic/softskills/Softskill';
import Pill, { type Color } from '~/components/pill/Pill';

type InputAttributes = InputHTMLAttributes<HTMLInputElement>;

interface Props extends InputAttributes {
  graphicName: ComponentProps<typeof Softskill>['name'];
  name: string;
  color: Color;
}

const PillCheckbox = ({ graphicName, name, value, color, ...rest }: Props) => {
  return (
    <label css={labelCss}>
      <input type="checkbox" value={value} {...rest} />
      <Pill color={color}>
        <Softskill name={graphicName} />
        {name}
      </Pill>
    </label>
  );
};

export default PillCheckbox;

const labelCss = css`
  & > input {
    display: none;
    appearance: none;
  }
`;
