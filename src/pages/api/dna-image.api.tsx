/* eslint-disable unicorn/filename-case */
import { ImageResponse, type NextRequest } from 'next/server';

import { type Group } from '~/utils/resultLogic';

type ImageOptions = ConstructorParameters<typeof ImageResponse>[1];

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const group = searchParams.get('group');
    const nickname = searchParams.get('nickname');
    const position = searchParams.get('position');

    const notoSansScFont700 = await fetchFont('Noto+Sans+KR', 700);
    if (!notoSansScFont700) {
      throw new Error('Failed to fetch font');
    }

    // TODO: 이미지 크기 및 위치 조절
    const imageOptions: ImageOptions = {
      width: 375,
      height: 666,
      fonts: [
        {
          name: 'Noto Sans KR',
          data: notoSansScFont700,
          weight: 700,
          style: 'normal',
        },
      ],
    };

    return new ImageResponse(
      (
        <div
          style={{
            position: 'relative',
            display: 'flex',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            style={{
              width: '375px',
              height: '666px',
            }}
            src={HOISTING_IMAGE_BY_GROUP[group as Group]}
            alt={'dna_' + group}
            width={375}
            height={666}
          />
          <span
            style={{
              position: 'absolute',
              top: '112px',
              fontWeight: 700,
              fontSize: '20px',
              color: '#fff',
              left: '70px',
              textShadow: '1px 1px 2px #849BDA30',
            }}
          >
            {nickname}
          </span>
          <span
            style={{
              position: 'absolute',
              top: '407px',
              left: '71px',
              color: '#17171B',
              fontWeight: 700,
              fontSize: '16.8px',
            }}
          >
            {position}
          </span>
        </div>
      ),
      imageOptions,
    );
  } catch (error: unknown) {
    return new Response('Failed to generate image', { status: 500 });
  }
}

async function fetchFont(fontFamily = 'Noto+Sans+KR', fontWeight = 700): Promise<ArrayBuffer | null> {
  const fontUrl = `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${fontWeight}`;

  const css = await (await fetch(fontUrl)).text();

  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (!resource) return null;

  const res = await fetch(resource[1]);

  return res.arrayBuffer();
}

const HOISTING_IMAGE_BY_GROUP: Record<Group, string> = {
  A: `https://github.com/depromeet/na-lab-client/assets/49177223/0b224b08-3858-4305-8323-1a6082dbb4f7`,
  B: `https://github.com/depromeet/na-lab-client/assets/49177223/fec4951a-270f-40e8-8520-43eecb89416f`,
  C: `https://github.com/depromeet/na-lab-client/assets/49177223/faefd0ee-7048-4578-8ec5-b70713e6efd9`,
  D: `https://github.com/depromeet/na-lab-client/assets/49177223/4dbecfeb-5492-4c6b-b4a7-cd933cd5621e`,
  E: `https://github.com/depromeet/na-lab-client/assets/49177223/1eb9e7e4-801d-475a-8037-aa35a2776441`,
  F: `https://github.com/depromeet/na-lab-client/assets/49177223/8667e31c-9722-490b-9def-3b952d115275`,
};
