import { css } from '@emotion/react';
import { Reorder } from 'framer-motion';

import { type CardItemType } from '~/features/createSurvey/cardList/Card';
import CardWithDnd from '~/features/createSurvey/cardList/CardWithDnd';

interface Props {
  items: CardItemType[];
  setItems: (items: CardItemType[]) => void;
}

const CardListWithDnd = ({ items, setItems }: Props) => {
  return (
    <Reorder.Group data-testid="dnd-component" as="ul" values={items} onReorder={setItems} css={containerCss}>
      {items.map((item) => {
        return <CardWithDnd item={item} key={item.id} />;
      })}
    </Reorder.Group>
  );
};

export default CardListWithDnd;

const containerCss = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
