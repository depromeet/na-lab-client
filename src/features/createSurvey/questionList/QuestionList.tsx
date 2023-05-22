import Question from '~/features/createSurvey/questionList/Question';
import { type QuestionItem } from '~/features/createSurvey/types';

interface Props {
  list: QuestionItem[];
}
const QuestionList = ({ list }: Props) => {
  return (
    <section>
      {list.map((item) => (
        <Question item={item} key={item.title} />
      ))}
    </section>
  );
};

export default QuestionList;
