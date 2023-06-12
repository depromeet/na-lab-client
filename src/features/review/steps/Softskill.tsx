import { type ChangeEventHandler, type Dispatch, type SetStateAction } from 'react';
import { css } from '@emotion/react';

import { softskillList } from '~/components/graphic/softskills/Softskill';
import { type Softskills } from '~/components/graphic/softskills/type';
import WarningIcon from '~/components/icons/WarningIcon';
import Toast from '~/components/toast/Toast';
import useToast from '~/components/toast/useToast';
import useDidMount from '~/hooks/lifeCycle/useDidMount';
import recordEvent from '~/utils/event';

import BottomNavigation from '../BottomNavigation';
import QuestionHeader from '../QuestionHeader';
import PillCheckbox from './softskill/PillCheckbox';
import { type StepProps } from './type';

interface Props extends StepProps {
  nickname: Reviewer['nickname'];
  selectedSoftskills: Softskills[];
  setSelectedSoftskills: Dispatch<SetStateAction<Softskills[]>>;
}

const MAX_LENGTH = 5;

const Softskill = ({ prev, next, nickname, selectedSoftskills, setSelectedSoftskills }: Props) => {
  const { fireToast } = useToast();

  useDidMount(() => {
    recordEvent({ action: '리뷰어 - 소프트 스킬' });
  });

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const clickedSoftskill = e.target.value as Softskills;

    if (!e.target.checked) {
      setSelectedSoftskills((prevSoftskills) => prevSoftskills.filter((softskill) => softskill !== clickedSoftskill));

      return;
    }

    if (selectedSoftskills.length >= MAX_LENGTH) {
      e.target.checked = false;

      fireToast({
        content: (
          <>
            <WarningIcon />
            <Toast.Text>키워드는 {MAX_LENGTH}개까지 선택할 수 있어요</Toast.Text>
          </>
        ),
        higherThanCTA: true,
      });

      return;
    }

    if (e.target.checked) {
      setSelectedSoftskills((prevSoftskills) => [...prevSoftskills, clickedSoftskill]);
    }
  };

  return (
    <>
      <QuestionHeader
        title={`당신이 생각하는 ${nickname} 님은 어떤 이미지가 돋보이나요?`}
        subTitle="키워드를 최대 5개까지 선택해주세요."
      />
      <section css={sectionCss}>
        {softskillList.map((softskill) => (
          <PillCheckbox
            key={softskill}
            graphicName={softskill}
            name={softskill.replace('_', ' ')}
            onChange={onChange}
            checked={selectedSoftskills.includes(softskill)}
          />
        ))}
      </section>
      <BottomNavigation
        onBackClick={() => prev?.(2)}
        isNextDisabled={!Boolean(selectedSoftskills.length)}
        onNextClick={() => next?.()}
      />
    </>
  );
};

export default Softskill;

const sectionCss = css`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 20px;
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
