import { useState } from 'react';
import { css } from '@emotion/react';
import { type Meta } from '@storybook/react';

import useMouseMove from './useMouseMove';

const meta: Meta = {
  title: 'useMouseMove',
};

export default meta;

export function Default() {
  const [state, setState] = useState({ x: 0, y: 0 });
  const { ref, isActive } = useMouseMove(setState);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}
    >
      <div
        ref={ref}
        css={css`
          position: relative;
          width: 300px;
          height: 200px;
          background-color: lightblue;
        `}
      >
        <div
          css={css`
            position: absolute;
            top: ${state.y * 100}%;
            left: ${state.x * 100}%;

            width: 10px;
            height: 10px;

            background-color: ${isActive ? 'red' : 'blue'};
          `}
        ></div>
      </div>

      <p>isActive : {isActive.toString()}</p>
      <p>
        original, x : {state.x}, y : {state.y}
      </p>
      <p>
        visible, x : {Math.round(state.x * 100)}, y : {Math.round(state.y * 100)}
      </p>
    </div>
  );
}
