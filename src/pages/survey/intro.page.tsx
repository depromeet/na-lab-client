import SEO from '~/components/SEO/SEO';
import Intro from '~/features/survey/Intro';
import useInternalRouter from '~/hooks/router/useInternalRouter';

const IntroPage = () => {
  const router = useInternalRouter();

  const next = () => {
    router.push('/survey/create');
  };

  return (
    <>
      <SEO />

      <Intro next={next} />
    </>
  );
};

export default IntroPage;
