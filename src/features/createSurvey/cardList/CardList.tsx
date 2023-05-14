import Card, { type CardItemType } from '~/features/createSurvey/cardList/Card';

const INIT_QUESTION_LIST: CardItemType[] = [
  {
    id: 1,
    title: '기본 정보',
    type: 'BASIC',
  },
  {
    id: 2,
    title: '나의 직무적 강점은 무엇인가요?',
    type: 'BASIC',
  },
  {
    id: 3,
    title: '나의 직무적 약점은 무엇인가요?',
    type: 'BASIC',
  },
];

function CardList() {
  return INIT_QUESTION_LIST.map((item) => {
    return <Card item={item} key={item.id} />;
  });
}

export default CardList;
