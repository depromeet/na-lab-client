/* eslint-disable unicorn/filename-case */
import Head from 'next/head';

import { BASE_URL } from '~/constants/url';
import useInternalRouter from '~/hooks/router/useInternalRouter';

const DEFAULT_OG_IMAGE = '/default-og.png';

interface Props {
  /**
   * @description title에 적용될 문자열 입니다. 넣은 문자열 뒤에 ' | 나랩'이 붙습니다.
   * @default '나의 커리어 DNA 연구소 Na Lab'
   */
  title?: string;
  /**
   * @description description에 적용될 문자열 입니다.
   * @default '익명 피드백으로 나의 직무 강점 찾기'
   */
  description?: string;
  /**
   * @description og:image에 적용될 문자열 입니다.
   * @default '/default-og.png'
   */
  ogImage?: string;
}

/**
 * @description next/head를 사용하는 SEO 컴포넌트입니다. title, og, twitter 등 SEO에 필요한 태그를 렌더링 합니다.
 */
const SEO = ({ title, description, ogImage }: Props) => {
  const router = useInternalRouter();

  // TODO: 브랜딩에 따라 다르게 나타낼 수 있음
  const TITLE = title ? `${title} | 나랩` : '나의 커리어 DNA 연구소 Na Lab';
  const DESCRIPTION = description || '익명 피드백으로 나의 직무 강점 찾기';
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
