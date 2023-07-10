import satori from 'satori';

export async function getServerSideProps() {
  const ogImage = await createOGImage('test');

  return {
    props: {
      ogImage,
    },
  };
}

function TestPage({ ogImage }: { ogImage: string }) {
  console.log('results: ', ogImage);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: ogImage,
      }}
    />
  );
}

export default TestPage;

export async function createOGImage(title: string) {
  // const fontSansData = await fontSans();
  // Example. Pass this `ArrayBuffer` to the `ImageResponse`.
  const notoSansScFont = await fetchFont(title);

  if (!notoSansScFont) return;
  // Design the image and generate an SVG with "satori"
  const svg = await satori(<div style={{ color: 'black' }}>hello, world</div>, {
    width: 600,
    height: 400,
    fonts: [
      {
        name: 'Roboto',
        // Use `fs` (Node.js only) or `fetch` to read the font as Buffer/ArrayBuffer and provide `data` here.
        data: notoSansScFont,
        weight: 400,
        style: 'normal',
      },
    ],
  });

  console.log('svg: ', svg);

  return svg;
}

// Pulled from the OG playground code
async function fetchFont(text: string): Promise<ArrayBuffer | null> {
  const API = `https://fonts.googleapis.com/css2?family=${'Noto+Sans+KR'}&text=${encodeURIComponent(text)}`;

  const css = await (
    await fetch(API, {
      headers: {
        // Make sure it returns TTF.
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
