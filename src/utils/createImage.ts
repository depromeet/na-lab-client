import { type ReactNode } from 'react';
import { Resvg } from '@resvg/resvg-js';
import satori, { type SatoriOptions } from 'satori';

export async function createOGImage(element: ReactNode, option: SatoriOptions): Promise<Buffer> {
  const svg = await satori(element, option);

  const resvg = new Resvg(svg);
  const pngData = resvg.render();

  return pngData.asPng();
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
