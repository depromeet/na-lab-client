import { type Dispatch, useRef } from 'react';
import { css, type Theme } from '@emotion/react';
import { Reorder } from 'framer-motion';
import { type SetStateAction } from 'jotai';

import BottomSheet from '~/components/bottomSheet/BottomSheet';
import BottomSheetHandleIcon from '~/components/icons/BottomSheetHandleIcon';
import DeleteIcon from '~/components/icons/DeleteIcon';
import useToast from '~/components/toast/useToast';
import AddMyQuestion from '~/features/survey/addSurveyForm/AddMyQuestion';
import AddSurveyForm from '~/features/survey/addSurveyForm/AddSurveyForm';
import QuestionWithDnd from '~/features/survey/questionList/QuestionWithDnd';
import { type QuestionItem } from '~/features/survey/types';
import useBoolean from '~/hooks/common/useBoolean';

interface Props {
  customItems: QuestionItem[];
  setCustomsItems: Dispatch<SetStateAction<QuestionItem[]>>;
}

const AddQuestionList = ({ customItems, setCustomsItems }: Props) => {
  const [isShowing, toggleShowing] = useBoolean(false);
  const [isDrag, , onIsDrag, offIsDrag] = useBoolean(false);
  const { fireToast } = useToast();

  const dragRef = useRef<HTMLDivElement | null>(null);

  const addNewQuestion = (question: QuestionItem) => {
    setCustomsItems((prev) => [...prev, question]);
    toggleShowing();
  };

  const onAddQuestionClick = () => {
    if (customItems.length >= 20) {
      fireToast({ content: '최대 20개의 질문을 추가할 수 있습니다.', higherThanCTA: true });

      return;
    }

    toggleShowing();
  };

  const onDeleteCustomQuestion = (id: string) => {
    setCustomsItems((prev) => prev.filter((item) => item.title !== id));
  };

  return (
    <>
      <Reorder.Group data-testid="dnd-component" as="ul" values={customItems} onReorder={setCustomsItems}>
        {customItems.map((item) => (
          <QuestionWithDnd
            onIsDrag={onIsDrag}
            offIsDrag={offIsDrag}
            item={item}
            key={item.title}
            dragRef={dragRef}
            onDelete={onDeleteCustomQuestion}
          />
        ))}
      </Reorder.Group>

      <AddMyQuestion onAction={onAddQuestionClick} />

      <div css={deleteContainerCss(isDrag)}>
        <div css={deleteCss} ref={dragRef}>
          <DeleteIcon />
        </div>
      </div>

      <BottomSheet isShowing={isShowing}>
        <button type="button" onClick={toggleShowing}>
          <BottomSheetHandleIcon />
        </button>
        <AddSurveyForm onClose={toggleShowing} onAction={addNewQuestion} />
      </BottomSheet>
    </>
  );
};

export default AddQuestionList;

const deleteContainerCss = (isShowing: boolean) => css`
  height: 50px;

  ${isShowing ? 'display: block;' : 'visibility: hidden;'}
`;

const deleteCss = (theme: Theme) => css`
  position: fixed;
  z-index: ${theme.zIndex.aboveDefault};
  right: 0;
  bottom: 90px;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 56px;
  height: 56px;
  margin: 0 auto;

  background-color: ${theme.colors.red};
  border-radius: 50%;
`;
