/* eslint-disable @next/next/no-img-element */
import { type ReactNode } from 'react';
import { Resvg } from '@resvg/resvg-js';
import satori, { type SatoriOptions } from 'satori';

import { type Group } from '~/utils/resultLogic';

export async function createOGImage(element: ReactNode, option: SatoriOptions) {
  const svg = await satori(element, option);

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  });
  const pngData = resvg.render();

  return { image: pngData.asPng(), svg: svg };
}

export async function fetchFont(fontFamily = 'Noto+Sans+KR', fontWeight = 700): Promise<ArrayBuffer | null> {
  const API = `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${fontWeight}`;

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

const HOISTING_IMAGE_BY_GROUP: Record<Group, string> = {
  A: `https://github.com/depromeet/na-lab-client/assets/49177223/0b224b08-3858-4305-8323-1a6082dbb4f7`,
  B: `https://github.com/depromeet/na-lab-client/assets/49177223/fec4951a-270f-40e8-8520-43eecb89416f`,
  C: `https://github.com/depromeet/na-lab-client/assets/49177223/faefd0ee-7048-4578-8ec5-b70713e6efd9`,
  D: `https://github.com/depromeet/na-lab-client/assets/49177223/4dbecfeb-5492-4c6b-b4a7-cd933cd5621e`,
  E: `https://github.com/depromeet/na-lab-client/assets/49177223/1eb9e7e4-801d-475a-8037-aa35a2776441`,
  F: `https://github.com/depromeet/na-lab-client/assets/49177223/8667e31c-9722-490b-9def-3b952d115275`,
};

export interface CreateImage {
  base64: string;
}

export const createImage = async ({
  group,
  userInfo,
}: {
  group: Group;
  userInfo: {
    nickname: string;
    position: string;
  };
}): Promise<CreateImage> => {
  const notoSansScFont700 = await fetchFont('Noto+Sans+KR', 700);
  if (!notoSansScFont700)
    return {
      base64: '',
    };

  const imageOptions: SatoriOptions = {
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

  // group 계산 필요
  const { image: ogImage } = await createOGImage(
    <div
      style={{
        position: 'relative',
        display: 'flex',
      }}
    >
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
        {userInfo.nickname}
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
        {userInfo.position}
      </span>
    </div>,
    imageOptions,
  );

  const imageData = JSON.stringify({ base64: ogImage.toString('base64') });

  return { base64: imageData };
};
