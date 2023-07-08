import { useEffect, useState } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';
import dna01Png from 'public/images/dna/01_dna.png';
import dna02Png from 'public/images/dna/02_dna.png';
import dna03Png from 'public/images/dna/03_dna.png';
import dna04Png from 'public/images/dna/04_dna.png';
import dna05Png from 'public/images/dna/05_dna.png';
import dna06Png from 'public/images/dna/06_dna.png';

import colors from '~/styles/color';
import { BODY_1, HEAD_1_BOLD } from '~/styles/typo';

interface DnaProps {
  title: string;
  desc: string;
}

const DnaBanner = ({ title = '독창적인 트렌드세터', desc = '특별함을 추구하는 예술가적 성향' }: DnaProps) => {
  const [dnaImage, setDnaImage] = useState(dna01Png);

  useEffect(() => {
    if (title === '카리스마 지휘관') {
      setDnaImage(dna01Png);
    } else if (title === '철두철미한 설계자') {
      setDnaImage(dna02Png);
    } else if (title === '활동적인 외교관') {
      setDnaImage(dna03Png);
    } else if (title === '독창적인 트렌드세터') {
      setDnaImage(dna04Png);
    } else if (title === '굴하지 않는 개척자') {
      setDnaImage(dna05Png);
    } else if (title === '유연한 중재자') {
      setDnaImage(dna06Png);
    }
  }, []);

  return (
    <div css={dnaCss}>
      <Image quality={100} css={dnaImageCss} src={dnaImage} alt="dna" width={180} height={155} />

      <div css={textWrapperCss}>
        <div css={dnaDesc}>{desc}</div>
        <div css={dnaTitle}>{title}</div>
      </div>
    </div>
  );
};

export default DnaBanner;

const dnaCss = css`
  position: relative;

  overflow: hidden;
  display: flex;

  width: 377px;
  height: 120px;

  background-color: #e6f1fd;
  border-radius: 8px 0 0 8px;
`;

const dnaImageCss = css`
  position: absolute;
  top: 5px;
  left: -10px;
  object-fit: cover;
`;

const textWrapperCss = css`
  position: absolute;
  top: 30px;
  left: 150px;

  display: flex;
  flex-direction: column;
`;

const dnaDesc = css`
  ${BODY_1}

  color: ${colors.gray_400};
  margin-top: 4px;
`;

const dnaTitle = css`
  ${HEAD_1_BOLD}

  color: ${colors.gray_500};
`;
