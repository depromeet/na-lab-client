import { type Meta } from '@storybook/react';
import { domMax, LazyMotion } from 'framer-motion';

import { type DndItemType } from '~/features/createSurvey/dnd/DndItem';

import Dnd from './Dnd';

const meta: Meta<typeof Dnd> = {
  title: 'Drag and drop',
  component: Dnd,
};

export default meta;

export function Default(args: JSX.IntrinsicAttributes & { initItems: DndItemType[] }) {
  return (
    <LazyMotion features={domMax}>
      <Dnd {...args} />
    </LazyMotion>
  );
}

const listItems = [
  {
    id: 1,
    title: '기본 정보',
    content: '나와의 관계, 상대방의 포지션, 나의 성향',
  },
  {
    id: 2,
    title: '나의 직무적 강점은 무엇인가요?',
    content: '주관식 기본 질문',
  },
  {
    id: 3,
    title: '나의 직무적 약점은 무엇인가요?',
    content: '주관식 기본 질문',
  },
];

Default.args = {
  initItems: listItems,
};
