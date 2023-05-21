import Question from '~/features/createSurvey/questionList/Question';
import { type QuestionItem } from '~/features/createSurvey/types';

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
