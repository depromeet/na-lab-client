import * as fs from 'fs/promises';
import path from 'path';
import satori from 'satori';

const outImageUrl =
  'data:image/jpeg;base64,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';
const svgTest = `<div
style={{
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
  fontSize: 32,
  fontWeight: 600,
}}
>
<svg
  width="75"
  viewBox="0 0 75 65"
  fill="#000"
  style={{ margin: '0 4.6875rem' }}
>
  <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
</svg>
<div style={{ marginTop: 40 }}>Hello, World</div>
</div>
`;

export async function getServerSideProps() {
  const ogImage = await createOGImage('testtest');
  const { imgSrc: image, filePath } = await getImage();
  console.log('filePath: ', filePath);

  return {
    props: {
      ogImage,
      image,
    },
  };
}

function TestPage({ ogImage, image }: { ogImage: string }) {
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: ogImage,
        }}
      />
      {image}

      <div
        dangerouslySetInnerHTML={{
          __html: svgTest,
        }}
      />
    </>
  );
}

export default TestPage;

async function getImage() {
  const imgSrc = `/images/dna/result/A_dna.png`;
  const filePath = path.join(process.cwd(), 'public', imgSrc);
  try {
    await fs.stat(filePath);

    return { imgSrc, filePath };
  } catch {
    return {
      imgSrc: null,
      filePath: null,
    };
  }
}
async function createOGImage(title: string) {
  const notoSansScFont = await fetchFont();

  // SSR에서 주소 만드는 것은 노드 환경임
  const { imgSrc: image, filePath } = await getImage();
  console.log('filePath: ', filePath);
  if (!notoSansScFont) return;
  if (!image) return;

  const svg = await satori(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <img src={outImageUrl} alt="dna" width={200} height={300} />
      <span
        style={{
          position: 'absolute',
          top: 50,
          left: 20,
          color: 'white',
          zIndex: 1,
        }}
      >
        {title}
      </span>
    </div>,
    {
      width: 600,
      height: 400,
      fonts: [
        {
          name: 'Noto Sans KR',
          data: notoSansScFont,
          weight: 400,
          style: 'normal',
        },
      ],
    },
  );

  return svg;
}

async function fetchFont(): Promise<ArrayBuffer | null> {
  const API = `https://fonts.googleapis.com/css2?family=${'Noto+Sans+KR'}`;

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
