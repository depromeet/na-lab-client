/* eslint-disable @next/next/no-img-element */
import { type CSSProperties } from 'react';
import { css } from '@emotion/react';
import { type SatoriOptions } from 'satori/wasm';

import Button from '~/components/button/Button';
import Header from '~/components/header/Header';
import useToast from '~/components/toast/useToast';
import { BASE_URL as PROD_BASE_URL } from '~/constants/url';
import colors from '~/styles/color';
import { isProd } from '~/utils/common';
import { createOGImage, fetchFont } from '~/utils/createImage';
import { detectMobileDevice } from '~/utils/device';
import { imageDownloadPC } from '~/utils/image';
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

const IMAGE_WIDTH = 333;
export async function getServerSideProps() {
  const notoSansScFont700 = await fetchFont('Noto+Sans+KR', 700);
  const notoSansScFont400 = await fetchFont('Noto+Sans+KR', 400);
  const notoSansScFont500 = await fetchFont('Noto+Sans+KR', 500);
  if (!notoSansScFont700 || !notoSansScFont400 || !notoSansScFont500) return { props: {} };

  const { group, userInfo, dnaInfo } = MOCK_DATA;
  const imageOptions: SatoriOptions = {
    width: IMAGE_WIDTH,
    height: 700,
    fonts: [
      {
        name: 'Noto Sans KR',
        data: notoSansScFont700,
        weight: 700,
        style: 'normal',
      },
      {
        name: 'Noto Sans KR',
        data: notoSansScFont500,
        weight: 600,
        style: 'normal',
      },
      {
        name: 'Noto Sans KR',
        data: notoSansScFont500,
        weight: 500,
        style: 'normal',
      },
      {
        name: 'Noto Sans KR',
        data: notoSansScFont400,
        weight: 400,
        style: 'normal',
      },
    ],
  };

  // group 계산 필요
  const { image: ogImage } = await createOGImage(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '8px',
        overflow: 'hidden',
        width: IMAGE_WIDTH,
        alignItems: 'center',
        background: 'linear-gradient(180deg, #DCE9FA 0%, #E5EEFA 34.38%, #D2E2F5 64.06%, #D3E1F3 92.71%)',
      }}
    >
      <DNAImageView group={group as Group} name={userInfo.nickname} />
      <DnaInfoView dnaInfo={dnaInfo} userInfo={userInfo} />
    </div>,
    imageOptions,
  );
  const imageData = JSON.stringify({ base64: ogImage.toString('base64') });

  return {
    props: {
      imageData,
      dnaInfo,
    },
  };
}

function ResultDownloadPage({
  imageData,
  dnaInfo,
}: {
  imageData: string;
  dnaInfo: {
    title: string;
    descriptions: string[];
  };
}) {
  const { fireToast } = useToast();

  const imageObj = JSON.parse(imageData);
  const imageBase64 = 'data:image/png;base64,' + imageObj.base64 ?? '';

  const onImageDownload = () => {
    if (detectMobileDevice(window.navigator.userAgent)) {
      fireToast({
        content: '이미지를 꾹 눌러서 저장해주세요. ',
      });

      return;
    }
    imageDownloadPC(imageBase64, 'dna.png');
  };

  return (
    <div css={containerCss}>
      <Header
        overrideCss={css`
          background-color: transparent;
          border-color: transparent;
        `}
        isContainRemainer
      />
      <article css={cardCss}>
        <img src={imageBase64} alt="dna images" />
      </article>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '8px',
          overflow: 'hidden',
          width: IMAGE_WIDTH,
          alignItems: 'center',
          background: 'linear-gradient(180deg, #DCE9FA 0%, #E5EEFA 34.38%, #D2E2F5 64.06%, #D3E1F3 92.71%)',
        }}
      >
        <DNAImageView group={'E' as Group} name={MOCK_DATA.userInfo.nickname} />
        <DnaInfoView dnaInfo={dnaInfo} userInfo={MOCK_DATA.userInfo} />
      </div>
      <Button onClick={onImageDownload}>다운로드</Button>
    </div>
  );
}

export default ResultDownloadPage;

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

const containerCss = css`
  width: 100%;
  height: 100vh;
  background: rgb(216 227 255 / 60%);
  backdrop-filter: blur(12.5px);
`;

const cardCss = css`
  overflow: hidden;
  width: 333px;
  margin: 7px auto;
  border-radius: 8px;

  img {
    width: 100%;
  }
`;

const MOCK_DATA = {
  tendencies: ['도전적인', '꼼꼼한', '사교적인'],
  group: 'E',
  dnaInfo: {
    title: '굴하지 않는 개척자 DNA',
    descriptions: [
      '남들의 생각을 따라하기보다는 나의 주관을 가지고 새로운 길을 개척하는 모험가에요.',
      '위기 상황에서도 다재다능하고 융통성 있는 면모로 해결사 역할을 해요.',
    ],
    fitDna: {
      title: '독창적인 트렌드세터',
      subtitle: '특별함을 추구하는 예술가적 성향',
    },
  },
  userInfo: {
    target_id: 26,
    nickname: '수미',
    position: '개발자',
  },
};

const DnaInfoView = ({
  dnaInfo,
  userInfo,
}: {
  dnaInfo: {
    title: string;
    descriptions: string[];
  };
  userInfo: {
    nickname: string;
    position: string;
  };
}) => {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        padding: '23px 22px',
        backgroundColor: colors.white,
      }}
    >
      <span style={titleStyle}>{dnaInfo.title}를 가진</span>
      <span style={titleStyle}>{userInfo.position}</span>
      <ul
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          marginTop: '12px',
          listStyle: 'none',
        }}
      >
        {dnaInfo.descriptions.map((desc) => (
          <div
            style={{
              display: 'flex',
              gap: '4px',
            }}
            key={desc}
          >
            <div
              style={{
                position: 'relative',
                top: '1px',
              }}
            >
              ▪
            </div>
            <li
              style={{
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '150%',
                letterSpacing: '-0.3px',
                color: colors.gray_500,
              }}
            >
              {desc}
            </li>
          </div>
        ))}
      </ul>
    </section>
  );
};

const titleStyle: CSSProperties = {
  fontSize: '22px',
  fontWeight: 700,
  color: colors.black,
  lineHeight: '130%',
  position: 'relative',
  left: '4px',
};
