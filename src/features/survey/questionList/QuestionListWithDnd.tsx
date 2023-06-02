import { type Dispatch } from 'react';
import { Reorder } from 'framer-motion';

import QuestionWithDnd from '~/features/survey/questionList/QuestionWithDnd';
import { type QuestionItem } from '~/features/survey/types';

interface Props {
  items: QuestionItem[];
  setItems: Dispatch<QuestionItem[]>;
  dragRef?: React.RefObject<HTMLDivElement>;
}

const QuestionWithDndList = ({ items, setItems, dragRef }: Props) => {
  return (
    <section>
      <Reorder.Group data-testid="dnd-component" as="ul" values={items} onReorder={setItems}>
        {items.map((item) => (
          <QuestionWithDnd item={item} key={item.title} dragRef={dragRef} />
        ))}
      </Reorder.Group>
    </section>
  );
};

export default QuestionWithDndList;
