import { type Meta } from '@storybook/react';

import { pretendard } from '~/assets/fonts/pretendard';

import { BODY_1, BODY_2_BOLD, BODY_2_REGULAR, HEAD_1, HEAD_2_BOLD, HEAD_2_REGULAR } from './typo';

const meta: Meta<typeof Default> = {
  title: 'Typographies',
  component: Default,
};

export default meta;

export function Default() {
  return (
    <div className={pretendard.className}>
      <p>HEAD 1</p>
      <p css={HEAD_1}>동료의 익명 피드백으로 완성시키는 나의 커리어 브랜딩 서비스</p>

      <p>HEAD 2 BOLD</p>
      <p css={HEAD_2_BOLD}>동료의 익명 피드백으로 완성시키는 나의 커리어 브랜딩 서비스</p>

      <p>HEAD 2 REGULAR</p>
      <p css={HEAD_2_REGULAR}>동료의 익명 피드백으로 완성시키는 나의 커리어 브랜딩 서비스</p>

      <p>BODY 1</p>
      <p css={BODY_1}>동료의 익명 피드백으로 완성시키는 나의 커리어 브랜딩 서비스</p>

      <p>BODY 2 BOLD</p>
      <p css={BODY_2_BOLD}>동료의 익명 피드백으로 완성시키는 나의 커리어 브랜딩 서비스</p>

      <p>BODY 2 REGULAR</p>
      <p css={BODY_2_REGULAR}>동료의 익명 피드백으로 완성시키는 나의 커리어 브랜딩 서비스</p>
    </div>
  );
}
