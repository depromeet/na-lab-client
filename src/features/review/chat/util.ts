import { type MessageOrder, type MessageType } from './type';

export const getOrderFromMessagesAndIndex = (messages: MessageType[], index: number): MessageOrder => {
  const isFirst = index === 0;
  const isLast = index === messages.length - 1;

  const currentFrom = messages[index].from;
  const prevFrom = isFirst ? null : messages[index - 1].from;
  const nextFrom = isLast ? null : messages[index + 1].from;

  if (prevFrom === null && nextFrom === null) {
    return 'single';
  }
  if (prevFrom !== currentFrom && nextFrom !== currentFrom) {
    return 'single';
  }
  if (prevFrom !== currentFrom && nextFrom === currentFrom) {
    return 'first';
  }
  if (prevFrom === currentFrom && nextFrom === currentFrom) {
    return 'middle';
  }
  if (prevFrom === currentFrom && nextFrom !== currentFrom) {
    return 'end';
  }

  return 'single';
};
