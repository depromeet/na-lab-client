import Intro from '~/features/survey/Intro';
import useInternalRouter from '~/hooks/router/useInternalRouter';

// TODO : 최초 진입 화면
const CreateSurveyPage = () => {
  const router = useInternalRouter();

  const next = () => {
    router.push('/survey/create');
  };

  return <Intro next={next} />;
};

export default CreateSurveyPage;
