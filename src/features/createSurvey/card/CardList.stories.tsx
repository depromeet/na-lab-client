import { type Meta } from '@storybook/react';
import { domMax, LazyMotion } from 'framer-motion';

import { type CardItemType } from '~/features/createSurvey/card/Card';
import CardList from '~/features/createSurvey/card/CardList';

const meta: Meta<typeof CardList> = {
  title: 'Drag and drop',
  component: CardList,
};

export default meta;

export function Default(args: JSX.IntrinsicAttributes & { initItems: CardItemType[] }) {
  return (
    <LazyMotion features={domMax}>
      <CardList {...args} />
    </LazyMotion>
  );
}

const listItems = [
  {
    id: 1,
    title: '기본 정보',
    desc: '나와의 관계, 상대방의 포지션, 나의 성향',
  },
  {
    id: 2,
    title: '나의 직무적 강점은 무엇인가요?',
    desc: '주관식 기본 질문',
  },
  {
    id: 3,
    title: '나의 직무적 약점은 무엇인가요?',
    desc: '주관식 기본 질문',
  },
  {
    id: 4,
    title: '나의 직무적 장단점은 무엇인가요?',
    desc: '추가 질문',
  },
];

Default.args = {
  initItems: listItems,
};
