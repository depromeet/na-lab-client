import { type ReactNode } from 'react';
import { css } from '@emotion/react';

type CardType = 'CHOICE' | 'SHORT_FORM' | 'BASIC';

// TODO : description으로 변경하기
export const TYPE_DESC: Record<CardType, string> = {
  CHOICE: '객관식 추가 질문',
  SHORT_FORM: '주관식 추가 질문',
  BASIC: '기본 질문',
} as const;

// TODO : type 폴더로 빼기
export interface CardItemType {
  title: string;
  type: CardType;
  id: number;
}

interface Props {
  item: CardItemType;
  rightElement?: ReactNode;
}

const Card = ({ item, rightElement }: Props) => {
  const { title, type } = item;

  return (
    <li css={listItemCss}>
      <div css={textContainerCss}>
        <p css={titleCss}>{title}</p>
        <p css={descCss}>{TYPE_DESC[type]}</p>
      </div>
      {rightElement}
    </li>
  );
};

export default Card;

const listItemCss = css`
  display: flex;
  align-items: center;

  padding: 26px 28px;

  background-color: #eceef2;
  border-radius: 12px;
`;

const textContainerCss = css`
  user-select: none;
  flex-grow: 1;
`;

const titleCss = css`
  font-size: 18px;
  line-height: 25px;
  color: #6b7180;
`;

const descCss = css`
  font-size: 14px;
  line-height: 20px;
  color: #ccd0d7;
`;
