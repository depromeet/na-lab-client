import { describe, expect, test } from 'vitest';

import { getResultGroup } from '~/utils/resultLogic';

// 1차 도출 : 키워드 선택 개수를 합산하여 가장 많은 그룹 선택
// A : 5개, 16점, B : 4개, 11점
const TENDENCY_GROUP_TEST_DATA = [
  {
    order: 4,
    content: '리더십_있는', // A
    choice_id: '462826061802358396',
    selected_count: 2,
  },
  {
    order: 14,
    content: '책임감_강한', // A
    choice_id: '462826061802358406',
    selected_count: 2,
  },
  {
    order: 3,
    content: '계획적인', // A, B
    choice_id: '462826061802358395',
    selected_count: 1,
  },
  {
    order: 1,
    content: '완벽주의적인', // B
    choice_id: '462826061802358393',
    selected_count: 1,
  },
  {
    order: 2,
    content: '현실적인', // B
    choice_id: '462826061802358394',
    selected_count: 1,
  },
  {
    order: 6,
    content: '성실한', // B, F
    choice_id: '462826061802358394',
    selected_count: 1,
  },
  {
    order: 5,
    content: '긍정적인', // C
    choice_id: '462826061802358397',
    selected_count: 1,
  },
];

// 2차 도출 : 최대 개수 그룹이 여러개일 때, 점수가 높은 그룹을 선택
// B 3점 키워드 1개 추가
// A : 5개, 16점, B : 5개, 14점
const TENDENCY_GROUP_TEST_DATA_2 = [
  ...TENDENCY_GROUP_TEST_DATA,
  {
    order: 7,
    content: '논리적인', // B
    choice_id: '462826061802358398',
    selected_count: 1,
  },
];

// 3차 도출 : 최대 개수 그룹이 여러개이고, 점수가 같을 때,  A>B>C>D>E>F
// A : 5개, 16점, B : 5개, 16점
const TENDENCY_GROUP_TEST_DATA_3 = [
  ...TENDENCY_GROUP_TEST_DATA,
  {
    order: 7,
    content: '꼼꼼한', // B
    choice_id: '462826061802358398',
    selected_count: 1,
  },
];

describe('util/getResultGroup', () => {
  test('정의되어 있는가', () => {
    expect(getResultGroup).toBeDefined();
  });

  test('1차 도출/A그룹 개수가 가장 많은 테스트 데이터를 넘겼을 때, A 그룹이 나오는가', () => {
    const resultGroup = getResultGroup(TENDENCY_GROUP_TEST_DATA);
    expect(resultGroup).toBe('A');
  });

  test('2차 도출/A, B그룹 개수가 같을때, A 그룹 점수가 더 높은 테스트 데이터를 넘겼을 때, A 그룹이 나오는가', () => {
    const resultGroup = getResultGroup(TENDENCY_GROUP_TEST_DATA_2);
    expect(resultGroup).toBe('A');
  });

  test('3차 도출/A, B그룹 개수가 같을때, A 그룹 점수가 같을 때, A 그룹이 나오는가', () => {
    const resultGroup = getResultGroup(TENDENCY_GROUP_TEST_DATA_3);
    expect(resultGroup).toBe('A');
  });
});
