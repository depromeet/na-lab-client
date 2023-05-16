import { useState } from 'react';
import { css } from '@emotion/react';

import { type CardItemType } from '~/features/createSurvey/cardList/Card';
import CardList from '~/features/createSurvey/cardList/CardList';
import CardListWithDnd from '~/features/createSurvey/cardList/CardListWithDnd';
import PlusIcon from '~/features/createSurvey/cardList/PlusIcon';

const CreateSurvey = () => {
  const [cardItems, setCardItems] = useState<CardItemType[]>([]);

  // TODO : 서버 API 명세서 참고해서 type 변경
  const handleNewItemAdd = () => {
    setCardItems((prev) => {
      const newId = prev.length;
      return [
        ...prev,
        {
          id: newId,
          title: `나의 질문 ${newId}`,
          type: 'CHOICE',
        },
      ];
    });
  };

  return (
    <section css={containerCss}>
      <CardList />
      <CardListWithDnd items={cardItems} setItems={setCardItems} />
      <button type="button" onClick={handleNewItemAdd} css={buttonCss}>
        <PlusIcon />
        <span>나만의 질문 추가하기</span>
      </button>
    </section>
  );
};

export default CreateSurvey;

const containerCss = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const buttonCss = css`
  all: unset;

  cursor: pointer;

  display: flex;
  flex-direction: column;
  gap: 11px;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 25px 106px;

  color: #37c3ff;

  background-color: #f7f8f9;
  border-radius: 12px;
`;
