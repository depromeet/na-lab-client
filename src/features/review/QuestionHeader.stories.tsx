import { type Meta } from '@storybook/react';

import QuestionHeader from './QuestionHeader';

const meta: Meta = {
  title: 'Review Question Header',
  component: QuestionHeader,
};

export default meta;

export const Default = ({ title = '당신이 생각하는 예진 님은 어떤 이미지가 돋보이나요?' }) => {
  return <QuestionHeader title={title} />;
};

export const WithSubTitle = ({
  title = '당신이 생각하는 예진 님은 어떤 이미지가 돋보이나요?',
  subTitle = '키워드를 최대 5개까지 선택해주세요.',
}) => {
  return <QuestionHeader title={title} subTitle={subTitle} />;
};
