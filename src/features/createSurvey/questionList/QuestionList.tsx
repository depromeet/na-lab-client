import { BASIC_QUESTION_LIST } from '~/features/createSurvey/constants';
import Question from '~/features/createSurvey/questionList/Question';

const QuestionList = () => {
  return (
    <section>
      {BASIC_QUESTION_LIST.map((item) => (
        <Question item={item} key={item.title} />
      ))}
    </section>
  );
};
export default QuestionList;
