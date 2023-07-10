import satori from 'satori';

import { type Group } from '~/utils/resultLogic';

const baseUrl = 'http://localhost:3000';
const IMAGE_BASE_URL = baseUrl + '/images/dna/result';
const IMAGE_BY_GROUP: Record<Group, string> = {
  A: `${IMAGE_BASE_URL}/A_dna.png`,
  B: `${IMAGE_BASE_URL}/B_dna.png`,
  C: `${IMAGE_BASE_URL}/C_dna.png`,
  D: `${IMAGE_BASE_URL}/D_dna.png`,
  E: `${IMAGE_BASE_URL}/E_dna.png`,
  F: `${IMAGE_BASE_URL}/F_dna.png`,
} as const;

export async function getServerSideProps() {
  // 서버에서 이미지 만듬
  const ogImage = await createOGImage('변수미');

  return {
    props: {
      ogImage,
    },
  };
}

function TestPage({ ogImage }: { ogImage: string }) {
  return (
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: ogImage,
        }}
      />
    </div>
  );
}

export default TestPage;

async function createOGImage(title: string) {
  const notoSansScFont = await fetchFont();

  // SSR에서 주소 만드는 것은 노드 환경임

  if (!notoSansScFont) return;

  const svg = await satori(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <img src={IMAGE_BY_GROUP.A} alt="dna" width={329} height={389} />
      <span
        style={{
          position: 'absolute',
          top: 60,
          left: 20.5,
          color: 'white',
          fontSize: 21.15,
          fontWeight: 700,
          zIndex: 1,
        }}
      >
        {title}
      </span>
    </div>,
    {
      width: 329,
      height: 389,
      fonts: [
        {
          name: 'Noto Sans KR',
          data: notoSansScFont,
          weight: 700,
          style: 'normal',
        },
      ],
    },
  );

  return svg;
}

async function fetchFont(): Promise<ArrayBuffer | null> {
  const API = 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700';

  const css = await (
    await fetch(API, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.1+ (KHTML, like Gecko) Version/10.0.0.1337 Mobile Safari/537.1+',
      },
    })
  ).text();

  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (!resource) return null;

  const res = await fetch(resource[1]);

  return res.arrayBuffer();
}
