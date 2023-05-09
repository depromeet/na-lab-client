/* eslint-disable unicorn/filename-case */
import Head from 'next/head';

import useInternalRouter from '~/hooks/router/useInternalRouter';

const BASE_URL = 'https://www.nalab.me';
// TODO: 디자인 리소스 받아서 적용 필요
const DEFAULT_OG_IMAGE = '/images/og-image.png';

interface Props {
  /**
   * @description title에 적용될 문자열 입니다. 넣은 문자열 뒤에 ' | 나랩'이 붙습니다.
   * @default '나랩'
   */
  title?: string;
  /**
   * @description description에 적용될 문자열 입니다.
   * @default '나를 위한 연구소, 나랩'
   */
  description?: string;
  /**
   * @description og:image에 적용될 문자열 입니다.
   * @default '/images/og-image.png'
   */
  ogImage?: string;
}

/**
 * @description next/head를 사용하는 SEO 컴포넌트입니다. title, og, twitter 등 SEO에 필요한 태그를 렌더링 합니다.
 */
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
