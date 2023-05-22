import { css } from '@emotion/react';
import { type Meta } from '@storybook/react';

import Message from './Message';

const meta: Meta = {
  title: 'Chat',
  component: Message,
};

export default meta;

export const ChatMessage = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <Message from="me" order="single">
        안녕하세요
      </Message>

      <Message from="other" order="single">
        안녕하세요
      </Message>

      <Message from="me" order="first">
        예진이는 2D그래픽을 꼼꼼하게 잘 하는 것 같아. 그리고 리서치를 하면서 재미있고 논리적인 인사이트를 잘 도출하는
        모습이 보였어! 디프만 프로젝트를 할 때 그 인사이트를 잘 녹여내서 와이어프레임을 제작해줘서 도움이 됐어.
      </Message>
      <Message from="me" order="middle">
        대충 아무말 대충 아무말 대충 아무말 대충 아무말 대충 아무
      </Message>
      <Message from="me" order="end">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ab enim nemo id quam quas sequi voluptatem
        numquam ratione minus ut libero minima eum, culpa perferendis eligendi dolores praesentium animi.
      </Message>

      <Message from="other" order="first">
        예진이는 2D그래픽을 꼼꼼하게 잘 하는 것 같아. 그리고 리서치를 하면서 재미있고 논리적인 인사이트를 잘 도출하는
        모습이 보였어! 디프만 프로젝트를 할 때 그 인사이트를 잘 녹여내서 와이어프레임을 제작해줘서 도움이 됐어.
      </Message>
      <Message from="other" order="middle">
        대충 아무말 대충 아무말 대충 아무말 대충 아무말 대충 아무
      </Message>
      <Message from="other" order="end">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ab enim nemo id quam quas sequi voluptatem
        numquam ratione minus ut libero minima eum, culpa perferendis eligendi dolores praesentium animi.
      </Message>
    </div>
  );
};
