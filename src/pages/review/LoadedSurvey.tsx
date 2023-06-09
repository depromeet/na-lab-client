import { useState } from 'react';
import dynamic from 'next/dynamic';
import { css } from '@emotion/react';
import { AnimatePresence } from 'framer-motion';

import { type Softskills } from '~/components/graphic/softskills/type';
import ChoiceQuestion from '~/features/review/steps/ChoiceQuestion';
import Intro from '~/features/review/steps/Intro';
import Last from '~/features/review/steps/Last';
import { type Position as PositionType } from '~/features/review/steps/type';
import StepStatus from '~/features/review/StepStatus';
import { type Request as SurveyRequest } from '~/hooks/api/surveys/useGetSurveyById';
import useInjectedElementStep from '~/hooks/step/useInjectedElementStep';

const Cowork = dynamic(() => import('~/features/review/steps/Cowork'), { ssr: false });
const Position = dynamic(() => import('~/features/review/steps/Position'), { ssr: false });
const Softskill = dynamic(() => import('~/features/review/steps/Softskill'), { ssr: false });
const ShortQuestion = dynamic(() => import('~/features/review/steps/ShortQuestion'), { ssr: false });
const QuestionIntro = dynamic(() => import('~/features/review/steps/QuestionIntro'), { ssr: false });

const DEFAULT_STEP_LENGTH = 6;

const LoadedSurvey = ({ target, question, question_count }: SurveyRequest) => {
  const { isCoworked, setIsCoworked } = useIsCowork();
  const { position, setPosition } = usePosition();
  const { selectedSoftskills, setSelectedSoftskills } = useSoftskills();
  // const { setStrength } = useStrength();

  const { questionAnswers, setEachQuestionAnswer } = useQuestionAnswers({ question });

  const { currentElement, currentStep } = useInjectedElementStep({
    elements: [
      <Intro key="intro" nickname={target.nickname} />,
      <Cowork key="cowork" isCoworked={isCoworked} setIsCoworked={setIsCoworked} />,
      <Position key="position" position={position} setPosition={setPosition} />,
      <QuestionIntro key="question-intro" />,
      <Softskill
        key="softskill"
        selectedSoftskills={selectedSoftskills}
        setSelectedSoftskills={setSelectedSoftskills}
      />,
      // TODO: 첫 번째 기본 질문 대응
      ...question.map((eachQuestion, index) =>
        eachQuestion.type === 'short' ? (
          <ShortQuestion
            key={eachQuestion.question_id}
            headerTitle={eachQuestion.title}
            setReplies={setEachQuestionAnswer(eachQuestion.question_id)}
            startMessages={[
              { timing: 1000, text: '협업을 한 적이 없다면 일상에서 드러나는 성격이나 행동에 대한 장점을 적어주세요.' },
              { timing: 2000, text: '답변을 적어 저에게 메세지를 보내주시면, 익명으로 전달할게요!' },
            ]}
            isLastQuestion={index === question.length - 1}
          />
        ) : (
          <ChoiceQuestion
            key={eachQuestion.question_id}
            title={eachQuestion.title}
            choices={eachQuestion.choices}
            max_selectable_count={eachQuestion.max_selectable_count}
            isLastQuestion={index === question.length - 1}
          />
        ),
      ),
      <Last key="last" onSubmit={() => console.warn(questionAnswers)} />,
    ],
  });

  return (
    <>
      <StepStatus
        currentStep={currentStep}
        stepLength={DEFAULT_STEP_LENGTH + question_count}
        notContainSteps={[0, 3, DEFAULT_STEP_LENGTH + question_count - 1]}
      />
      <main css={mainCss}>
        <AnimatePresence mode="wait">{currentElement}</AnimatePresence>
      </main>
    </>
  );
};

export default LoadedSurvey;

const mainCss = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const useIsCowork = () => {
  const [isCoworked, setIsCoworked] = useState<null | boolean>(null);

  return { isCoworked, setIsCoworked };
};

const usePosition = () => {
  const [position, setPosition] = useState<PositionType | null>(null);

  return { position, setPosition };
};

const useSoftskills = () => {
  const [selectedSoftskills, setSelectedSoftskills] = useState<Softskills[]>([]);

  return { selectedSoftskills, setSelectedSoftskills };
};

// const useStrength = () => {
//   const [strength, setStrength] = useState<string[]>([]);

//   return { strength, setStrength };
// };

interface ShortQuestionAnswer {
  type: 'short';
  question_id: number;
  reply: string[];
}

interface ChoiceQuestionAnswer {
  type: 'choice';
  question_id: number;
  choices: number[];
}

type QuestionAnswer = ShortQuestionAnswer | ChoiceQuestionAnswer;

const useQuestionAnswers = ({ question }: Pick<SurveyRequest, 'question'>) => {
  const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswer[]>(
    question.map((eachQuestion) =>
      eachQuestion.type === 'short'
        ? { type: 'short', question_id: eachQuestion.question_id, reply: [] }
        : { type: 'choice', question_id: eachQuestion.question_id, choices: [] },
    ),
  );

  const setEachQuestionAnswer =
    <T extends string[] | number[]>(id: number) =>
    (setStateAction: (prevState: T) => T) => {
      setQuestionAnswers((prevQuestionAnswers) => {
        const targetQuestionAnswer = prevQuestionAnswers.find(
          (eachQuestionAnswer) => eachQuestionAnswer.question_id === id,
        );

        if (!targetQuestionAnswer) return prevQuestionAnswers;

        if (targetQuestionAnswer.type === 'short') {
          const newTargetQuestionAnswer = setStateAction(targetQuestionAnswer.reply as T);

          return prevQuestionAnswers.map((eachQuestionAnswer) =>
            eachQuestionAnswer.question_id === id
              ? ({
                  ...eachQuestionAnswer,
                  reply: newTargetQuestionAnswer,
                } as ShortQuestionAnswer)
              : eachQuestionAnswer,
          );
        }

        if (targetQuestionAnswer.type === 'choice') {
          const newTargetQuestionAnswer = setStateAction(targetQuestionAnswer.choices as T);

          return prevQuestionAnswers.map((eachQuestionAnswer) =>
            eachQuestionAnswer.question_id === id
              ? ({
                  ...eachQuestionAnswer,
                  choices: newTargetQuestionAnswer,
                } as ChoiceQuestionAnswer)
              : eachQuestionAnswer,
          );
        }

        return prevQuestionAnswers;
      });
    };

  return { questionAnswers, setEachQuestionAnswer };
};
