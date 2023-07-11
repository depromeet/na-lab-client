import { type SatoriOptions } from 'satori/wasm';

import { BASE_URL as PROD_BASE_URL } from '~/constants/url';
import { isProd } from '~/utils/common';
import { createOGImage, fetchFont } from '~/utils/createImage';
import { type Group } from '~/utils/resultLogic';

const BASE_URL = isProd(process.env.NODE_ENV) ? PROD_BASE_URL : 'http://localhost:3000';
const IMAGE_BASE_URL = BASE_URL + '/images/dna/result';

const IMAGE_BY_GROUP: Record<Group, string> = {
  A: `${IMAGE_BASE_URL}/A_dna.png`,
  B: `${IMAGE_BASE_URL}/B_dna.png`,
  C: `${IMAGE_BASE_URL}/C_dna.png`,
  D: `${IMAGE_BASE_URL}/D_dna.png`,
  E: `${IMAGE_BASE_URL}/E_dna.png`,
  F: `${IMAGE_BASE_URL}/F_dna.png`,
} as const;

export async function getServerSideProps() {
  const notoSansScFont = await fetchFont();
  if (!notoSansScFont) return { props: {} };

  // 서버에서 이미지 만듬
  const imageOptions: SatoriOptions = {
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
  };

  // group 계산 필요
  const ogImage = await createOGImage(<DNAImageView group={'A'} name={'변수미'} />, imageOptions);

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

const DNAImageView = ({ group, name }: { group: Group; name: string }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <img src={IMAGE_BY_GROUP[group]} alt="dna" width={329} height={389} />
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
        {name}
      </span>
    </div>
  );
};
