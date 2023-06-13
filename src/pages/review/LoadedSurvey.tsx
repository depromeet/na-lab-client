import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';

import useToast from '~/components/toast/useToast';
import { LOCAL_STORAGE_KEY } from '~/constants/storage';
import Intro from '~/features/review/steps/Intro';
import StepStatus from '~/features/review/StepStatus';
import { type Response as SurveyResponse } from '~/hooks/api/surveys/useGetSurveyById';
import usePostFeedbackBySurveyId, {
  type ChoiceQuestionFeedback,
  type QuestionFeedback,
  type ShortQuestionFeedback,
} from '~/hooks/api/surveys/usePostFeedbackBySurveyId';
import useWillUnmount from '~/hooks/lifeCycle/useWillUnmount';
import useInjectedElementStep from '~/hooks/step/useInjectedElementStep';
import recordEvent from '~/utils/event';
import { removeLocalStorageItemWithPrefix } from '~/utils/localStorage';

const Cowork = dynamic(() => import('~/features/review/steps/Cowork'), { ssr: false });
const Position = dynamic(() => import('~/features/review/steps/Position'), { ssr: false });
const QuestionIntro = dynamic(() => import('~/features/review/steps/QuestionIntro'), { ssr: false });
const Softskill = dynamic(() => import('~/features/review/steps/Softskill'), { ssr: false });
const ShortQuestion = dynamic(() => import('~/features/review/steps/ShortQuestion'), { ssr: false });
const ChoiceQuestion = dynamic(() => import('~/features/review/steps/ChoiceQuestion'), { ssr: false });
const Last = dynamic(() => import('~/features/review/steps/Last'), { ssr: false });

const DEFAULT_STEP_LENGTH = 6;

const LoadedSurvey = ({ survey_id, target, question, question_count }: SurveyResponse) => {
  const { isCoworked, setIsCoworked } = useIsCowork();
  const { position, setPosition } = usePosition();
  const { questionAnswers, setEachQuestionAnswer } = useQuestionAnswers({ question });

  const { isLoading, mutate } = usePostMutation({ survey_id, isCoworked, position, questionAnswers });

  useWillUnmount(() => {
    removeStoragedMessages();
  });

  const { currentElement, currentStep } = useInjectedElementStep({
    elements: [
      <Intro key="intro" nickname={target.nickname} />,
      <Cowork key="cowork" nickname={target.nickname} isCoworked={isCoworked} setIsCoworked={setIsCoworked} />,
      <Position key="position" position={position} setPosition={setPosition} />,
      <QuestionIntro key="question-intro" nickname={target.nickname} />,
      ...question.map((eachQuestion, index) => {
        if (eachQuestion.form_type === 'tendency' && eachQuestion.type === 'choice') {
          return (
            <Softskill
              key="softskill"
              nickname={target.nickname}
              choices={eachQuestion.choices}
              selectedChoiceIds={(questionAnswers[index] as ChoiceQuestionFeedback).choices}
              setChoices={setEachQuestionAnswer(eachQuestion.question_id)}
            />
          );
        }

        if (eachQuestion.form_type === 'strength') {
          return (
            <ShortQuestion
              key="strength"
              questionId={eachQuestion.question_id}
              headerTitle={eachQuestion.title}
              setReplies={setEachQuestionAnswer(eachQuestion.question_id)}
              startMessages={[
                {
                  timing: 1000,
                  text: '협업을 한 적이 없다면 일상에서 드러나는 성격이나 행동에 대한 장점을 적어주세요.',
                },
                { timing: 2000, text: '답변을 적어 저에게 메세지를 보내주시면, 익명으로 전달할게요!' },
              ]}
              afterUserMessages={[{ timing: 1000, text: '못한 말이 있다면 더 보낼 수 있어요.' }]}
              isLastQuestion={index === question.length - 1}
            />
          );
        }

        return eachQuestion.type === 'short' ? (
          <ShortQuestion
            key={eachQuestion.question_id}
            questionId={eachQuestion.question_id}
            headerTitle={eachQuestion.title}
            setReplies={setEachQuestionAnswer(eachQuestion.question_id)}
            startMessages={[{ timing: 1000, text: `${target.nickname} 님이 직접 입력한 질문이에요.` }]}
            isLastQuestion={index === question.length - 1}
          />
        ) : (
          <ChoiceQuestion
            key={eachQuestion.question_id}
            nickname={target.nickname}
            title={eachQuestion.title}
            selectedChoicesId={(questionAnswers[index] as ChoiceQuestionFeedback).choices}
            choices={eachQuestion.choices}
            setChoices={setEachQuestionAnswer(eachQuestion.question_id)}
            max_selectable_count={eachQuestion.max_selectable_count}
            isLastQuestion={index === question.length - 1}
          />
        );
      }),
      <Last key="last" onSubmit={mutate} isLoading={isLoading} />,
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
  min-height: 100vh;
`;

const useIsCowork = () => {
  const [isCoworked, setIsCoworked] = useState<null | boolean>(null);

  return { isCoworked, setIsCoworked };
};

const usePosition = () => {
  const [position, setPosition] = useState<ReviewerPosition | null>(null);

  return { position, setPosition };
};

const useQuestionAnswers = ({ question }: Pick<SurveyResponse, 'question'>) => {
  const [questionAnswers, setQuestionAnswers] = useState<QuestionFeedback[]>(
    question.map((eachQuestion) =>
      eachQuestion.type === 'short'
        ? { type: 'short', question_id: eachQuestion.question_id, reply: [] }
        : { type: 'choice', question_id: eachQuestion.question_id, choices: [] },
    ),
  );

  const setEachQuestionAnswer =
    <T extends string[]>(id: string) =>
    // TODO: (setStateAction: T | ((prevState: T) => T)) => { // react.SetStateAction 대응
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
                } as ShortQuestionFeedback)
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
                } as ChoiceQuestionFeedback)
              : eachQuestionAnswer,
          );
        }

        return prevQuestionAnswers;
      });
    };

  return { questionAnswers, setEachQuestionAnswer };
};

const removeStoragedMessages = () => {
  const prefix = LOCAL_STORAGE_KEY.reviewShortQuestionMessages;
  removeLocalStorageItemWithPrefix(prefix);
};

interface UsePostFeedbackProps {
  survey_id: Parameters<typeof usePostFeedbackBySurveyId>[0];
  isCoworked: ReturnType<typeof useIsCowork>['isCoworked'];
  position: ReturnType<typeof usePosition>['position'];
  questionAnswers: ReturnType<typeof useQuestionAnswers>['questionAnswers'];
}

const usePostMutation = ({ survey_id, isCoworked, position, questionAnswers }: UsePostFeedbackProps) => {
  const { fireToast } = useToast();
  const router = useRouter();
  const postFeedback = usePostFeedbackBySurveyId(survey_id);

  const mutation = useMutation(
    () => {
      if (isCoworked === null) {
        throw new Error('협업 경험을 선택해 주세요.');
      }
      if (position === null) {
        throw new Error('포지션을 선택해 주세요.');
      }

      return postFeedback({
        reviewer: { collaboration_experience: isCoworked, position },
        question_feedback: questionAnswers,
      });
    },
    {
      onSuccess: () => {
        removeStoragedMessages();
        recordEvent({ action: '리뷰어 - 마지막 - 질문 응답 성공' });
      },
      onError: () => {
        fireToast({ content: '문제가 발생했어요. 다시 실행해 주세요.' });
        setTimeout(() => router.reload(), 2000);
      },
    },
  );

  return mutation;
};
