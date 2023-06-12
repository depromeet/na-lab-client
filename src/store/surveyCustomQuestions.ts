import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { type CustomQuestionItem } from '~/features/survey/types';

const surveyCustomQuestionsAtom = atomWithStorage<CustomQuestionItem[]>('customQuestions', []);

export const getSurveyCustomQuestionsAtom = atom((get) => get(surveyCustomQuestionsAtom));

export const reorderSurveyCustomQuestionsAtom = atom(null, (get, set, update: CustomQuestionItem[]) => {
  set(surveyCustomQuestionsAtom, update);
});

export const addSurveyCustomQuestionAtom = atom(null, (get, set, question: CustomQuestionItem) => {
  const prev = get(surveyCustomQuestionsAtom);
  set(surveyCustomQuestionsAtom, [...prev, question]);
});

export const deleteSurveyCustomQuestionAtom = atom(null, (get, set, questionTitle: string) => {
  const prev = get(surveyCustomQuestionsAtom);
  set(
    surveyCustomQuestionsAtom,
    prev.filter((item) => item.title !== questionTitle),
  );
});
