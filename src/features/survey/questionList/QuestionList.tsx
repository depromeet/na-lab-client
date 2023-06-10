import Question from '~/features/survey/questionList/Question';
import { type BasicQuestionItem, type QuestionItem } from '~/features/survey/types';

interface Props {
  // TODO : 타입 수정
  items: QuestionItem[] | BasicQuestionItem[];
}
const QuestionList = ({ items }: Props) => {
  return (
    <section>
      {items.map((item) => (
        <Question item={item} key={item.title} />
      ))}
    </section>
  );
};

export default QuestionList;
