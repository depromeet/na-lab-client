/* eslint-disable unicorn/filename-case */
import Head from 'next/head';

import useInternalRouter from '~/hooks/router/useInternalRouter';

const BASE_URL = 'https://www.nalab.me';
// TODO: 디자인 리소스 받아서 적용 필요
const DEFAULT_OG_IMAGE = '/images/og-image.png';

interface Props {
  title?: string;
  description?: string;
  ogImage?: string;
}

const SEO = ({ title, description, ogImage }: Props) => {
  const router = useInternalRouter();

  // TODO: 브랜딩에 따라 다르게 나타낼 수 있음
  const TITLE = title ? `${title} | 나랩` : '나랩';
  const DESCRIPTION = description || '나를 위한 연구소, 나랩';
  const URL = BASE_URL + router.asPath;
  const IMAGE = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Head>
      <title>{TITLE}</title>
      <link rel="canonical" href={URL} />
      <meta name="description" content={DESCRIPTION} />

      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:image" content={IMAGE} />
      <meta property="og:url" content={URL} />

      {/* for twitter */}
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESCRIPTION} />
      <meta name="twitter:image" content={IMAGE} />
    </Head>
  );
};

export default SEO;
