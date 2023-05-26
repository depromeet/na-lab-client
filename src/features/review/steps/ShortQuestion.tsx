import { type ComponentProps, type Dispatch, type SetStateAction, useRef, useState } from 'react';

import useDidMount from '~/hooks/lifeCycle/useDidMount';
import useDidUpdate from '~/hooks/lifeCycle/useDidUpdate';

import ChatInputBottom from '../chat/ChatInputBottom';
import MessageContainer from '../chat/MessageContainer';
import SubmitButton from '../chat/SubmitButton';
import { type MessageType } from '../chat/type';
import QuestionHeader from '../QuestionHeader';
import { type StepProps } from './type';

interface OtherMessage {
  /**
   * @description ms
   */
  timing: number;
  text: string;
}

interface Props extends StepProps {
  headerTitle: ComponentProps<typeof QuestionHeader>['title'];
  setReplies: Dispatch<SetStateAction<string[]>>;
  /**
   * @description 시작할 때 입력될 메세지와 시간
   */
  startMessages: OtherMessage[];
  /**
   * @description 사용자가 발송한 이후 입력될 메세지와 시간
   */
  afterUserMessages?: OtherMessage[];
}

const ShortQuestion = ({ prev, next, headerTitle, setReplies, startMessages, afterUserMessages }: Props) => {
  const { messages, setMessage, onTextSubmit } = useMessage(setReplies);
  useOtherMessage({ messages, setMessage, startMessages, afterUserMessages });
  const { isAbleToSubmit } = useAbleToSubmit({ messages, startMessages, afterUserMessages });

  return (
    <>
      <QuestionHeader title={headerTitle} />
      <MessageContainer messages={messages} />

      {isAbleToSubmit && <SubmitButton onClick={next}>답변 완료</SubmitButton>}

      <ChatInputBottom onTextSubmit={onTextSubmit} onBackClick={prev} />
    </>
  );
};

export default ShortQuestion;

const useMessage = (setReplies: Props['setReplies']) => {
  const [messages, setMessage] = useState<MessageType[]>([]);

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

    if (messages.length > startMessages.length) {
      isSetAfterMessage.current = true;

      afterUserMessages.forEach(({ timing, text }) => {
        const timeout = setTimeout(() => {
          setMessage((prev) => [...prev, { from: 'other', content: text }]);
        }, timing);

        timeouts.push(timeout);
      });
    }

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
