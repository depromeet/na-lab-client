import Question from '~/features/survey/questionList/Question';
import { type QuestionItem } from '~/features/survey/types';

interface Props {
  items: QuestionItem[];
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
