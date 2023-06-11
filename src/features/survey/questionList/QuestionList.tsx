import Question from '~/features/survey/questionList/Question';
import { type BasicQuestionItem, type CustomQuestionItem } from '~/features/survey/types';

interface Props {
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
