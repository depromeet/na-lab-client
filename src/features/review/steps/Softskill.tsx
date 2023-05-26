import { type ChangeEventHandler, type Dispatch, type SetStateAction } from 'react';
import { css } from '@emotion/react';

import { softskillList } from '~/components/graphic/softskills/Softskill';
import { type Softskills } from '~/components/graphic/softskills/type';

import BottomNavigation from '../BottomNavigation';
import QuestionHeader from '../QuestionHeader';
import PillCheckbox from './softskill/PillCheckbox';
import { type StepProps } from './type';

interface Props extends StepProps {
  selectedSoftskills: Softskills[];
  setSelectedSoftskills: Dispatch<SetStateAction<Softskills[]>>;
}

const MAX_LENGTH = 5;

const Softskill = ({ prev, next, selectedSoftskills, setSelectedSoftskills }: Props) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const clickedSoftskill = e.target.value as Softskills;

    if (!e.target.checked) {
      setSelectedSoftskills((prevSoftskills) => prevSoftskills.filter((softskill) => softskill !== clickedSoftskill));

      return;
    }

    if (selectedSoftskills.length >= MAX_LENGTH) {
      e.target.checked = false;

      return;
    }

    if (e.target.checked) {
      setSelectedSoftskills((prevSoftskills) => [...prevSoftskills, clickedSoftskill]);
    }
  };

  return (
    <>
      <QuestionHeader
        title="당신이 생각하는 예진 님은 어떤 이미지가 돋보이나요?"
        subTitle="키워드를 최대 5개까지 선택해주세요."
      />
      <section css={sectionCss}>
        {softskillList.map((softskill) => (
          <PillCheckbox
            key={softskill}
            graphicName={softskill}
            name={softskill.replace('_', ' ')}
            onChange={onChange}
          />
        ))}
      </section>
      <BottomNavigation onBackClick={prev} isNextDisabled={!Boolean(selectedSoftskills.length)} onNextClick={next} />
    </>
  );
};

export default Softskill;

const sectionCss = css`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

// TODO: 순서에 따라 색상 부여
// type Color = 'bluegreen' | 'pink' | 'skyblue' | 'yellowgreen' | 'purple';
// const COLOR_ORDER: Color[] = ['bluegreen', 'pink', 'skyblue', 'yellowgreen', 'purple'];
// const IS_COLOR_CHECKED: Record<Color, boolean> = {
//   bluegreen: false,
//   pink: false,
//   skyblue: false,
//   yellowgreen: false,
//   purple: false,
// };
