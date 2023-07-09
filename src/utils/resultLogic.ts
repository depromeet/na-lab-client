export type Group = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
const groupList: Group[] = ['A', 'B', 'C', 'D', 'E', 'F'];

// NOTE:  : Record<string, Record<Softskills, number>>  이런식으로 하고 싶었는데 실패
const tendencyGroup: Record<Group, Record<string, number>> = {
  A: {
    리더십_있는: 5,
    책임감_강한: 5,
    결단력_있는: 4,
    추진력_있는: 3,
    통찰력_있는: 2,
    열정적인: 1,
    계획적인: 1,
  },
  B: {
    꼼꼼한: 5,
    완벽주의적인: 5,
    현실적인: 4,
    계획적인: 3,
    논리적인: 2,
    성실한: 1,
    통찰력_있는: 1,
  },
  C: {
    사교적인: 5,
    사기를_불어넣는: 5,
    긍정적인: 4,
    눈치_빠른: 3,
    협력적인: 2,
    적응력_좋은: 1,
    공감_능력이_좋은: 1,
  },
  D: {
    개성있는: 5,
    창의적인: 5,
    트렌드_빠른: 4,
    도전적인: 3,
    주관있는: 2,
    열정적인: 2,
  },
  E: {
    융통성_있는: 5,
    도전적인: 5,
    추진력_있는: 4,
    주관있는: 3,
    결단력_있는: 2,
    논리적인: 1,
    눈치_빠른: 1,
  },

  F: {
    경청하는: 5,
    협력적인: 5,
    성실한: 4,
    공감_능력이_좋은: 3,
    적응력_좋은: 2,
    눈치_빠른: 2,
  },
};

const tendencyGroupKeyword = {
  A: Object.keys(tendencyGroup.A),
  B: Object.keys(tendencyGroup.B),
  C: Object.keys(tendencyGroup.C),
  D: Object.keys(tendencyGroup.D),
  E: Object.keys(tendencyGroup.E),
  F: Object.keys(tendencyGroup.F),
};

interface TendencyCountData {
  count: number;
  choice_id: string;
  content: string;
  order: number;
}

const getTendencyGroup = (tendencyCountData: TendencyCountData[]) => {
  const groupCount = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
  const groupScore = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };

  tendencyCountData.forEach(({ content, count }) => {
    groupList.forEach((group) => {
      if (tendencyGroupKeyword[group].includes(content)) {
        groupCount[group] += count;
        groupScore[group] += tendencyGroup[group][content] * count;
      }
    });
  });

  return { groupCount, groupScore };
};

const getSecondaryFiltering = (groupScore: Record<Group, number>, maxGroup: Group[]) => {
  let maxScore = {
    score: 0,
    group: maxGroup[0],
  };

  // 키워드 점수를 합산해서 가장 높은 점수를 가진 그룹
  // 3차 결과 도출 : A > B > C > D > E > F
  maxGroup.forEach((group) => {
    if (groupScore[group] > maxScore.score) {
      maxScore = {
        score: groupScore[group],
        group,
      };
    }
  });

  return maxScore.group;
};

export const getResultGroup = (tendencyCountData: TendencyCountData[]): Group => {
  const { groupCount, groupScore } = getTendencyGroup(tendencyCountData);
  const maxGroupCount = Math.max(...Object.values(groupCount));

  const maxGroup = groupList.filter((group) => groupCount[group] === maxGroupCount);
  // 1차 결과 도출 : 키워드 선택 개수를 합산해서 가장 많이 선택된 그룹
  if (maxGroup.length === 1) {
    return maxGroup[0];
  }

  // 2, 3차 결과 도출 : 키워드 선택 개수가 같은 그룹이 2개 이상일 경우, 키워드 합산 점수로 계산
  return getSecondaryFiltering(groupScore, maxGroup);
};
