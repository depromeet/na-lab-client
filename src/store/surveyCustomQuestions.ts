import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { type QuestionItem } from '~/features/survey/types';

const surveyCustomQuestionsAtom = atomWithStorage<QuestionItem[]>('customQuestions', []);

export const getSurveyCustomQuestionsAtom = atom((get) => get(surveyCustomQuestionsAtom));

export const reorderSurveyCustomQuestionsAtom = atom(null, (get, set, update: QuestionItem[]) => {
  set(surveyCustomQuestionsAtom, update);
});

export const addSurveyCustomQuestionAtom = atom(null, (get, set, question: QuestionItem) => {
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
