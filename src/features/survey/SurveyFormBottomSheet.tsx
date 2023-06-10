import React from 'react';

import BottomSheet from '~/components/bottomSheet/BottomSheet';
import BottomSheetHandleIcon from '~/components/icons/BottomSheetHandleIcon';
import AddSurveyForm from '~/features/survey/addSurveyForm/AddSurveyForm';
import { type QuestionItem } from '~/features/survey/types';

interface Props {
  isShowing: boolean;
  toggleShowing: () => void;
  onAction: (question: QuestionItem) => void;
}

function SurveyFormBottomSheet({ isShowing, toggleShowing, onAction }: Props) {
  return (
    <BottomSheet isShowing={isShowing}>
      <button type="button" onClick={toggleShowing}>
        <BottomSheetHandleIcon />
      </button>
      <AddSurveyForm onClose={toggleShowing} onAction={onAction} />
    </BottomSheet>
  );
}

export default SurveyFormBottomSheet;
