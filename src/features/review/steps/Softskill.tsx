import { type ChangeEventHandler } from 'react';
import { css } from '@emotion/react';

import { type Softskills } from '~/components/graphic/softskills/type';
import WarningIcon from '~/components/icons/WarningIcon';
import Toast from '~/components/toast/Toast';
import useToast from '~/components/toast/useToast';
import useDidMount from '~/hooks/lifeCycle/useDidMount';
import { type Choice } from '~/remotes/question';
import recordEvent from '~/utils/event';

import BottomNavigation from '../BottomNavigation';
import QuestionHeader from '../QuestionHeader';
import PillCheckbox from './softskill/PillCheckbox';
import { type StepProps } from './type';

interface Props extends StepProps {
  nickname: Reviewer['nickname'];
  choices: Choice[];
  selectedChoiceIds: string[];
  setChoices: (setStateAction: (prevState: string[]) => string[]) => void;
}

const MAX_LENGTH = 5;

const Softskill = ({ prev, next, nickname, choices, selectedChoiceIds, setChoices }: Props) => {
  const { fireToast } = useToast();

  useDidMount(() => {
    recordEvent({ action: '리뷰어 - 소프트 스킬' });
  });

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const clickedChoiceId = e.target.value;

    if (!e.target.checked) {
      setChoices((prevChoices) => prevChoices.filter((choice) => choice !== clickedChoiceId));

      return;
    }

    if (selectedChoiceIds.length >= MAX_LENGTH) {
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
      setChoices((prevSoftskills) => [...prevSoftskills, clickedChoiceId]);
    }
  };

  return (
    <>
      <QuestionHeader
        title={`당신이 생각하는 ${nickname} 님은 어떤 이미지가 돋보이나요?`}
        subTitle="키워드를 최대 5개까지 선택해주세요."
      />
      <section css={sectionCss}>
        {choices.map((softskill) => (
          <PillCheckbox
            key={softskill.choice_id}
            graphicName={softskill.content as Softskills}
            name={softskill.content.replaceAll('_', ' ')}
            onChange={onChange}
            value={softskill.choice_id}
            checked={selectedChoiceIds.includes(softskill.choice_id)}
          />
        ))}
      </section>
      <BottomNavigation
        onBackClick={() => prev?.(2)}
        isNextDisabled={!Boolean(choices.length)}
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
