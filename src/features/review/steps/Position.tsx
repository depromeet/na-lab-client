import { Perspective } from '@egjs/flicking-plugins';
import Flicking from '@egjs/react-flicking';
import { css } from '@emotion/react';

import { type StepProps } from './type';

import '@egjs/react-flicking/dist/flicking.css';

interface Props extends StepProps {
  position?: string;
}

const Position = ({}: Props) => {
  const plugins = [new Perspective({ rotate: 0.5, scale: 0.5 })];

  return (
    <section>
      <div
        css={css`
          height: 100px;
        `}
      />

      <Flicking align="center" circular={true} plugins={plugins}>
        <div key="1" className="panel" css={testCss}>
          1
        </div>
        <div key="2" className="panel" css={testCss}>
          2
        </div>
        <div key="3" className="panel" css={testCss}>
          3
        </div>
      </Flicking>
    </section>
  );
};

export default Position;

const testCss = css`
  width: 210px;
  height: 280px;

  /* margin-right: 30px; */
  background-color: red;
`;
