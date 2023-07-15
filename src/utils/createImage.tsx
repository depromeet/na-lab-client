/* eslint-disable @next/next/no-img-element */
import { type ReactNode } from 'react';
import { Resvg } from '@resvg/resvg-js';
import satori, { type SatoriOptions } from 'satori';

import { BASE_URL as PROD_BASE_URL } from '~/constants/url';
import { isProd } from '~/utils/common';
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

const BASE_URL = isProd(process.env.NODE_ENV) ? PROD_BASE_URL : 'http://localhost:3000';

const imageBaseUrl = BASE_URL + '/images/dna/download';

const DOWNLOAD_IMAGE_BY_GROUP: Record<Group, string> = {
  A: `${imageBaseUrl}/a_dna.png`,
  B: `${imageBaseUrl}/b_dna.png`,
  C: `${imageBaseUrl}/c_dna.png`,
  D: `${imageBaseUrl}/d_dna.png`,
  E: `${imageBaseUrl}/e_dna.png`,
  F: `${imageBaseUrl}/f_dna.png`,
};

export const createImage = async ({
  group,
  userInfo,
}: {
  group: Group;
  userInfo: {
    nickname: string;
    position: string;
  };
}) => {
  const notoSansScFont700 = await fetchFont('Noto+Sans+KR', 700);
  if (!notoSansScFont700) return { props: {} };

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
        src={DOWNLOAD_IMAGE_BY_GROUP[group as Group]}
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
          left: '72px',
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

  return imageData;
};
