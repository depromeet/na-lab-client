import Question from '~/features/survey/questionList/Question';
import { type BasicQuestionItem, type CustomQuestionItem } from '~/features/survey/types';

interface Props {
  // TODO : 타입 수정
  items: CustomQuestionItem[] | BasicQuestionItem[];
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
