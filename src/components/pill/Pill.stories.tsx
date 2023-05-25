import { css } from '@emotion/react';
import { type Meta } from '@storybook/react';

import Softskill from '../graphic/softskills/Softskill';
import { 개성이_뚜렷한 } from '../graphic/softskills/개성이_뚜렷한';
import { 결단력_있는 } from '../graphic/softskills/결단력_있는';
import { 경청하는 } from '../graphic/softskills/경청하는';
import { 계획적인 } from '../graphic/softskills/계획적인';
import { 공감_능력이_좋은 } from '../graphic/softskills/공감_능력이_좋은';
import { 긍정적인 } from '../graphic/softskills/긍정적인';
import { 꼼꼼한 } from '../graphic/softskills/꼼꼼한';
import { 논리적인 } from '../graphic/softskills/논리적인';
import { 눈치_빠른 } from '../graphic/softskills/눈치_빠른';
import { 도전적인 } from '../graphic/softskills/도전적인';
import { 리더십_있는 } from '../graphic/softskills/리더십_있는';
import { 사교적인 } from '../graphic/softskills/사교적인';
import { 사기를_불어넣는 } from '../graphic/softskills/사기를_불어넣는';
import { 성실한 } from '../graphic/softskills/성실한';
import { 열정적인 } from '../graphic/softskills/열정적인';
import { 완벽주의적인 } from '../graphic/softskills/완벽주의적인';
import { 융통성_있는 } from '../graphic/softskills/융통성_있는';
import { 적응력_좋은 } from '../graphic/softskills/적응력_좋은';
import { 주관있는 } from '../graphic/softskills/주관있는';
import { 창의적인 } from '../graphic/softskills/창의적인';
import { 책임감_강한 } from '../graphic/softskills/책임감_강한';
import { 추진력_있는 } from '../graphic/softskills/추진력_있는';
import { 통찰력_있는 } from '../graphic/softskills/통찰력_있는';
import { 트렌드_빠른 } from '../graphic/softskills/트렌드_빠른';
import { 현실적인 } from '../graphic/softskills/현실적인';
import { 협력적인 } from '../graphic/softskills/협력적인';
import Pill from './Pill';

const meta: Meta = {
  title: 'Pill',
};

export default meta;

export function Default() {
  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      `}
    >
      <Pill>
        <적응력_좋은 />
        적응력 좋은
      </Pill>

      <Pill color="bluegreen">
        <적응력_좋은 />
        적응력 좋은
      </Pill>

      <Pill color="pink">
        <적응력_좋은 />
        적응력 좋은
      </Pill>

      <Pill color="skyblue">
        <적응력_좋은 />
        적응력 좋은
      </Pill>

      <Pill color="yellowgreen">
        <적응력_좋은 />
        적응력 좋은
      </Pill>

      <Pill color="purple">
        <적응력_좋은 />
        적응력 좋은
      </Pill>

      <Pill size="large">
        <적응력_좋은 />
        적응력 좋은
      </Pill>

      <Pill size="large" color="bluegreen">
        <적응력_좋은 />
        적응력 좋은
      </Pill>

      <Pill size="large" color="pink">
        <적응력_좋은 />
        적응력 좋은
      </Pill>

      <Pill size="large" color="skyblue">
        <적응력_좋은 />
        적응력 좋은
      </Pill>

      <Pill size="large" color="yellowgreen">
        <적응력_좋은 />
        적응력 좋은
      </Pill>

      <Pill size="large" color="purple">
        <적응력_좋은 />
        적응력 좋은
      </Pill>
    </div>
  );
}

export function Graphics() {
  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      `}
    >
      <Pill>
        <개성이_뚜렷한 />
        개성이 뚜렷한
      </Pill>
      <Pill>
        <결단력_있는 />
        결단력 있는
      </Pill>
      <Pill>
        <경청하는 />
        경청하는
      </Pill>
      <Pill>
        <계획적인 />
        계획적인
      </Pill>
      <Pill>
        <공감_능력이_좋은 />
        공감_능력이_좋은
      </Pill>
      <Pill>
        <긍정적인 />
        긍정적인
      </Pill>
      <Pill>
        <꼼꼼한 />
        꼼꼼한
      </Pill>
      <Pill>
        <논리적인 />
        논리적인
      </Pill>
      <Pill>
        <눈치_빠른 />
        눈치_빠른
      </Pill>
      <Pill>
        <도전적인 />
        도전적인
      </Pill>
      <Pill>
        <리더십_있는 />
        리더십_있는
      </Pill>
      <Pill>
        <사교적인 />
        사교적인
      </Pill>
      <Pill>
        <사기를_불어넣는 />
        사기를_불어넣는
      </Pill>
      <Pill>
        <성실한 />
        성실한
      </Pill>
      <Pill>
        <열정적인 />
        열정적인
      </Pill>
      <Pill>
        <완벽주의적인 />
        완벽주의적인
      </Pill>
      <Pill>
        <융통성_있는 />
        융통성_있는
      </Pill>
      <Pill>
        <적응력_좋은 />
        적응력_좋은
      </Pill>
      <Pill>
        <주관있는 />
        주관있는
      </Pill>
      <Pill>
        <창의적인 />
        창의적인
      </Pill>
      <Pill>
        <책임감_강한 />
        책임감_강한
      </Pill>
      <Pill>
        <추진력_있는 />
        추진력_있는
      </Pill>
      <Pill>
        <통찰력_있는 />
        통찰력_있는
      </Pill>
      <Pill>
        <트렌드_빠른 />
        트렌드_빠른
      </Pill>
      <Pill>
        <현실적인 />
        현실적인
      </Pill>
      <Pill>
        <협력적인 />
        협력적인
      </Pill>
    </div>
  );
}

export function GraphicForDeveloper() {
  return <Softskill name="개성이_뚜렷한" />;
}
