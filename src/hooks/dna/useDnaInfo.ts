import { useEffect, useState } from 'react';

import { type DNA, DNA_MAP_BY_GROUP } from '~/constants/dna';
import useGetTendencyFeedbackBySurveyId from '~/hooks/api/feedbacks/useGetTendencyFeedbackBySurveyId';
import { getResultGroup, type Group } from '~/utils/resultLogic';

// src/pages/dna/[id].page.tsx 동일
// NOTE: 서버에서 dna 정보 가져올 수 있다면 제거
const useDnaInfo = (surveyId: string | string[] | undefined) => {
  const [dnaInfo, setDnaInfo] = useState<DNA | null>(null);
  const [group, setGroup] = useState<Group | null>(null);
  const { data } = useGetTendencyFeedbackBySurveyId(String(surveyId), { enabled: Boolean(surveyId) });

  useEffect(() => {
    if (!data) return;
    const notSortedTendencies = [...data.question_feedback[0].choices];
    const nextGroup = getResultGroup(notSortedTendencies);
    setGroup(nextGroup);
    setDnaInfo(DNA_MAP_BY_GROUP[nextGroup]);
  }, [data]);

  return { dnaInfo, group };
};

export default useDnaInfo;
