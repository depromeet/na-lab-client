import { css } from '@emotion/react';

import Message from './Message';
import { type MessageType } from './type';
import { getOrderFromMessagesAndIndex } from './util';

interface Props {
  messages: MessageType[];
}

const MessageContainer = ({ messages }: Props) => {
  return (
    <section css={sectionCss}>
      {messages.map(({ from, content }, index) => (
        <Message key={index} from={from} order={getOrderFromMessagesAndIndex(messages, index)}>
          {content}
        </Message>
      ))}
    </section>
  );
};

export default MessageContainer;

const sectionCss = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
