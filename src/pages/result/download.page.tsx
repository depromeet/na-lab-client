/* eslint-disable @next/next/no-img-element */
import { css } from '@emotion/react';

import Button from '~/components/button/Button';
import Header from '~/components/header/Header';
import useToast from '~/components/toast/useToast';
import { createImage } from '~/utils/createImage';
import { detectMobileDevice } from '~/utils/device';
import { imageDownloadPC } from '~/utils/image';

const MOCK_DATA = {
  tendencies: ['도전적인', '꼼꼼한', '사교적인'],
  group: 'B',
  dnaInfo: {
    title: '굴하지 않는 개척자 DNA',
    descriptions: [
      '남들의 생각을 따라하기보다는 나의 주관을 가지고 새로운 길을 개척하는 모험가에요.',
      '강한 책임감과 뛰어난 실행력으로 프로젝트를 관리하며 팀원들의 신뢰를 얻어요.',
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

export async function getServerSideProps() {
  const imageData = await createImage({
    group: 'A',
    userInfo: MOCK_DATA.userInfo,
  });

  return {
    props: {
      imageData,
    },
  };
}

function ResultDownloadPage({ imageData }: { imageData: string }) {
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
      <Button onClick={onImageDownload}>다운로드</Button>
    </div>
  );
}

export default ResultDownloadPage;

const containerCss = css`
  transform: translateX(-16px);
  width: calc(100% + 32px);
  background: rgb(216 227 255 / 60%);
  backdrop-filter: blur(12.5px);
`;

const cardCss = css`
  position: absolute;
  top: 0;

  overflow: hidden;

  width: 100%;
  margin: 0 auto;

  border-radius: 8px;

  img {
    width: 100%;
  }
`;
