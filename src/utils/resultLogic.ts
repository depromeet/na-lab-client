const tendency_choices = [
  {
    order: 4,
    content: '공감_능력이_좋은',
    choice_id: '462826061802358396',
    count: 2,
  },
  {
    order: 14,
    content: '열정적인',
    choice_id: '462826061802358406',
    count: 2,
  },
  {
    order: 1,
    content: '결단력_있는',
    choice_id: '462826061802358393',
    count: 1,
  },
  {
    order: 2,
    content: '경청하는',
    choice_id: '462826061802358394',
    count: 1,
  },
  {
    order: 3,
    content: '계획적인',
    choice_id: '462826061802358395',
    count: 1,
  },
  {
    order: 5,
    content: '긍정적인',
    choice_id: '462826061802358397',
    count: 1,
  },
  {
    order: 8,
    content: '눈치_빠른',
    choice_id: '462826061802358400',
    count: 1,
  },
  {
    order: 9,
    content: '도전적인',
    choice_id: '462826061802358401',
    count: 1,
  },
  {
    order: 10,
    content: '리더십_있는',
    choice_id: '462826061802358402',
    count: 1,
  },
  {
    order: 11,
    content: '사교적인',
    choice_id: '462826061802358403',
    count: 1,
  },
  {
    order: 12,
    content: '사기를_불어넣는',
    choice_id: '462826061802358404',
    count: 1,
  },
  {
    order: 15,
    content: '완벽주의적인',
    choice_id: '462826061802358407',
    count: 1,
  },
  {
    order: 17,
    content: '적응력_좋은',
    choice_id: '462826061802358409',
    count: 1,
  },
];

type Group = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
const groupList: Group[] = ['A', 'B', 'C', 'D', 'E', 'F'];

// NOTE:  : Record<string, Record<Softskills, number>>  이런식으로 하고 싶었는데 실패
const tendencyGroup = {
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

const getTendencyGroupCount = (
  tendencyCountData: {
    count: number;
    choice_id: string;
    content: string;
    order: number;
  }[],
) => {
  const groupCount = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };

  tendencyCountData.forEach(({ content }) => {
    groupList.forEach((group) => {
      if (tendencyGroupKeyword[group].includes(content)) {
        groupCount[group] += 1;
      }
    });
  });

  return groupCount;
};

const getTendencyMaxGroup = (groupCount: Record<Group, number>) => {
  // const maxGroupCount = Math.max(...Object.values(groupCount));
  // TODo : 4개 => maxGroupCount === 4
  const maxGroup = groupList.filter((group) => groupCount[group] === 4);

  if (maxGroup.length === 1) {
    return maxGroup[0];
  }
  console.log('maxGroup: ', maxGroup);
};

const groupCount = getTendencyGroupCount(tendency_choices);
export const testData = getTendencyMaxGroup(groupCount);
