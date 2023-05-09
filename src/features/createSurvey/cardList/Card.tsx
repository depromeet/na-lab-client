import { type ReactNode } from 'react';
import { css } from '@emotion/react';

type CardType = 'CHOICE' | 'SHORT_FORM' | 'BASIC';

const TYPE_DESC: Record<CardType, string> = {
  CHOICE: '객관식 추가 질문',
  SHORT_FORM: '주관식 추가 질문',
  BASIC: '기본 질문',
} as const;

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
    <div
      css={css`
        display: flex;
        align-items: center;

        padding: 26px 28px;

        background-color: #eceef2;
        border-radius: 12px;
      `}
    >
      <div
        css={css`
          user-select: none;
          flex-grow: 1;
        `}
      >
        <div
          css={css`
            font-size: 18px;
            line-height: 25px;
            color: #6b7180;
          `}
        >
          {title}
        </div>
        <div
          css={css`
            font-size: 14px;
            line-height: 20px;
            color: #ccd0d7;
          `}
        >
          {TYPE_DESC[type]}
        </div>
      </div>
      {rightElement}
    </div>
  );
};

export default Card;
