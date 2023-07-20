/* eslint-disable @next/next/no-img-element */
import colors from '~/styles/color';
import { type Group } from '~/utils/resultLogic';

interface DnaProps {
  title: string;
  desc: string;
  imageBaseUrl: string;
}

const DNA_TITLE_TO_GROUP: Record<string, Group> = {
  '카리스마 지휘관': 'A',
  '철두철미한 설계자': 'B',
  '활동적인 외교관': 'C',
  '독창적인 트렌드세터': 'D',
  '굴하지 않는 개척자': 'E',
  '유연한 중재자': 'F',
};

const IMAGE_BY_GROUP: Record<Group, string> = {
  A: `/images/dna/01_dna.png`,
  B: `/images/dna/02_dna.png`,
  C: `/images/dna/03_dna.png`,
  D: `/images/dna/04_dna.png`,
  E: `/images/dna/05_dna.png`,
  F: `/images/dna/06_dna.png`,
} as const;

const DnaBannerView = ({
  imageBaseUrl,
  title = '독창적인 트렌드세터',
  desc = '특별함을 추구하는 예술가적 성향',
}: DnaProps) => {
  return (
    <section
      style={{
        position: 'relative',
        marginTop: '21px',
        overflow: 'hidden',
        display: 'flex',
        backgroundColor: colors.gray_50,
        borderRadius: '6px',
        width: '100%',
        height: '78px',
        paddingLeft: '86px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '0',
          width: '9px',
          backgroundColor: colors.primary_100,
          height: '100%',
        }}
      />
      <img
        style={{
          position: 'absolute',
          bottom: '15px',
          left: '24px',
          objectFit: 'cover',
          width: '48.95px',
        }}
        src={`${imageBaseUrl}${IMAGE_BY_GROUP[DNA_TITLE_TO_GROUP[title]]}`}
        alt="dna"
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '17px 0',
        }}
      >
        <div
          style={{
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '150%',
            letterSpacing: '-0.3px',
          }}
        >
          {desc}
        </div>
        <div
          style={{
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '150%',
            letterSpacing: '-0.3px',
            color: colors.gray_500,
          }}
        >
          {title}
        </div>
      </div>
    </section>
  );
};

export default DnaBannerView;
