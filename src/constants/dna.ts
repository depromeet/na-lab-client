import { type Group } from '~/utils/resultLogic';

export interface DNA {
  title: string;
  descriptions: readonly string[];
  fitDna: {
    title: string;
    subtitle: string;
  };
}

export const DNA_MAP_BY_GROUP: Readonly<Record<Group, DNA>> = {
  A: {
    title: '카리스마 지휘관 DNA',
    descriptions: [
      '어딜가서나 자연스럽게 리더의 역할을 맡아요.',
      '높은 결단력으로 빠르게 공동의 방향을 제시해요.',
      '강한 책임감과 뛰어난 실행력으로 프로젝트를 관리하며 팀원들의 신뢰를 얻어요.',
    ],
    fitDna: { title: '유연한 중재자', subtitle: '배려와 경청으로 소통하는 서포터' },
  },
  B: {
    title: '철두철미한 설계자 DNA',
    descriptions: [
      '작은 것도 놓치는 법이 없는 당신은 이성적이고 현실적으로 계획을 세우는 편이에요.',
      '완벽주의적 성향이 있어서 꼼꼼한 장인정신으로 결과물의 완성도를 높여줘요.',
    ],
    fitDna: { title: '굴하지 않는 개척자', subtitle: '벽을 뚫고 새로운 길을 찾는 의지' },
  },
  C: {
    title: '활동적인 외교관 DNA',
    descriptions: [
      '팀의 분위기 메이커인 당신은 뛰어난 스피치 능력과 긍정적인 에너지로 팀에 사기를 불어넣어요.',
      '뛰어난 사회성으로 의견을 조율하며 팀을 하나로 모아주는 역할을 해요.',
    ],
    fitDna: { title: '철두철미한 설계자', subtitle: '작은 것도 놓치지 않는 장인정신' },
  },
  D: {
    title: '독창적인 트렌드세터 DNA',
    descriptions: [
      '독창적인 사고를 가진 당신은 남들과 다른 특별함을 추구하는 예술가적 성향을 지녔어요.',
      '새로운 시도에 호기심을 보이며 신기술, 최신 트렌드에 빠삭한 지식을 가지고 있어요.',
    ],
    fitDna: { title: '활동적인 외교관', subtitle: '팀을 하나로 모으는 긍정적 에너지' },
  },
  E: {
    title: '굴하지 않는 개척자 DNA',
    descriptions: [
      '남들의 생각을 따라하기보다는 나의 주관을 가지고 새로운 길을 개척하는 모험가에요.',
      '위기 상황에서도 다재다능하고 융통성 있는 면모로 해결사 역할을 해요.',
    ],
    fitDna: { title: '독창적인 트렌드세터', subtitle: '특별함을 추구하는 예술가적 성향' },
  },
  F: {
    title: '유연한 중재자 DNA',
    descriptions: [
      '뛰어난 배려심과 경청 능력으로 소통을 잘하는 당신은 서포터로써의 능력이 뛰어나요.',
      '팀 내의 갈등이 생겼을 때 이를 평화적으로 해결하는 타입이며 인내심을 가지고 꾸준히 노력하며 성과를 내요.',
    ],
    fitDna: { title: '카리스마 지휘관', subtitle: '책임감과 실행력을 겸비한 리더' },
  },
} as const;
