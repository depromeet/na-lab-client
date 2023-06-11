import { type ComponentProps, type Dispatch, type SetStateAction, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { m } from 'framer-motion';

import { defaultFadeInVariants } from '~/constants/motions';
import { LOCAL_STORAGE_KEY } from '~/constants/storage';
import { type DefaultQuestion } from '~/hooks/api/surveys/useGetSurveyById';
import useDidMount from '~/hooks/lifeCycle/useDidMount';
import useDidUpdate from '~/hooks/lifeCycle/useDidUpdate';
import useLocalStorage from '~/hooks/storage/useLocalStorage';

import ChatInputBottom from '../chat/ChatInputBottom';
import MessageContainer from '../chat/MessageContainer';
import SubmitButton from '../chat/SubmitButton';
import { type MessageType } from '../chat/type';
import QuestionHeader from '../QuestionHeader';
import { type IsLastQuestion, type StepProps } from './type';

interface OtherMessage {
  /**
   * @description ms
   */
  timing: number;
  text: string;
}

interface Props extends StepProps, IsLastQuestion {
  headerTitle: ComponentProps<typeof QuestionHeader>['title'];
  questionId: DefaultQuestion['question_id'];
  setReplies: (setStateAction: (prevState: string[]) => string[]) => void;
  /**
   * @description 시작할 때 입력될 메세지와 시간
   */
  startMessages: OtherMessage[];
  /**
   * @description 사용자가 발송한 이후 입력될 메세지와 시간
   */
  afterUserMessages?: OtherMessage[];
}

const ShortQuestion = ({
  prev,
  next,
  headerTitle,
  questionId,
  setReplies,
  startMessages,
  afterUserMessages,
  isLastQuestion = false,
}: Props) => {
  const { messages, setMessage, onTextSubmit } = useMessage({ questionId, setReplies });
  useOtherMessage({ messages, setMessage, startMessages, afterUserMessages });
  const { isAbleToSubmit } = useAbleToSubmit({ messages, startMessages, afterUserMessages });

  return (
    <>
      <QuestionHeader title={headerTitle} />
      <m.section css={sectionCss} variants={defaultFadeInVariants} initial="initial" animate="animate" exit="exit">
        <MessageContainer messages={messages} />

        {isAbleToSubmit && (
          <SubmitButton onClick={() => next?.()}>{isLastQuestion ? '피드백 제출하기' : '답변 완료'}</SubmitButton>
        )}
      </m.section>
      <ChatInputBottom onTextSubmit={onTextSubmit} onBackClick={() => prev?.()} />
    </>
  );
};

export default ShortQuestion;

const sectionCss = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

type UseMessageProps = Pick<Props, 'questionId' | 'setReplies'>;

const useMessage = ({ questionId, setReplies }: UseMessageProps) => {
  const [messages, setMessage] = useLocalStorage<MessageType[]>(
    `${LOCAL_STORAGE_KEY.reviewShortQuestionMessages} ${questionId}`,
    [],
  );

  const onTextSubmit = (text: string) => {
    setReplies((prev) => [...prev, text]);
    setMessage((prev) => [...prev, { from: 'me', content: text }]);
  };

  return { messages, setMessage, onTextSubmit };
};

interface UseOtherMessageProps {
  messages: MessageType[];
  setMessage: Dispatch<SetStateAction<MessageType[]>>;
  startMessages: Props['startMessages'];
  afterUserMessages: Props['afterUserMessages'];
}

const useOtherMessage = ({ messages, setMessage, startMessages, afterUserMessages }: UseOtherMessageProps) => {
  useDidMount(() => {
    const timeouts: NodeJS.Timeout[] = [];

    // NOTE: 이미 발송된 적이 있다면 발송하지 않음
    if (messages.length > 0) return;

    startMessages.forEach(({ timing, text }) => {
      const timeout = setTimeout(() => {
        setMessage((prev) => [...prev, { from: 'other', content: text }]);
      }, timing);

      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  });

  const isSetAfterMessage = useRef(false);

  useDidUpdate(() => {
    if (!afterUserMessages) return;
    if (isSetAfterMessage.current) return;

    const timeouts: NodeJS.Timeout[] = [];

    // NOTE: 초기 메시지가 아직 발송되지 않았다면
    if (messages.length <= startMessages.length) return;
    // NOTE: 발송됐었다면
    if (messages.length > startMessages.length + afterUserMessages.length) return;

    isSetAfterMessage.current = true;

    afterUserMessages.forEach(({ timing, text }) => {
      const timeout = setTimeout(() => {
        setMessage((prev) => [...prev, { from: 'other', content: text }]);
      }, timing);

      timeouts.push(timeout);
    });

    return () => {
      isSetAfterMessage.current = false;
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [messages]);
};

interface UseAbleToSubmitProps {
  messages: MessageType[];
  startMessages: Props['startMessages'];
  afterUserMessages: Props['afterUserMessages'];
}

const useAbleToSubmit = ({ messages, startMessages, afterUserMessages }: UseAbleToSubmitProps) => {
  const [isAbleToSubmit, setIsAbleToSubmit] = useState(false);

  useDidUpdate(() => {
    if (isAbleToSubmit) return;

    const allOtherMessageLength = startMessages.length + (afterUserMessages?.length ?? 0);
    if (messages.length <= allOtherMessageLength) return;

    const timeout = setTimeout(() => setIsAbleToSubmit(true), 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [messages]);

  return { isAbleToSubmit };
};
