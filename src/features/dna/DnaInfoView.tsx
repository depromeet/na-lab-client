import { type CSSProperties } from 'react';

import colors from '~/styles/color';

const DnaInfoView = ({
  dnaInfo,
}: {
  dnaInfo: {
    title: string;
    descriptions: string[];
  };
}) => {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        padding: '23px 21px',
        backgroundColor: colors.white,
      }}
    >
      <span style={titleStyle}>{dnaInfo.title}를 가진</span>
      <span style={titleStyle}>UXUI 디자이너</span>
      <ul style={ulStyle}>
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
            <li style={liStyle}>{desc}</li>
          </div>
        ))}
      </ul>
    </section>
  );
};

export default DnaInfoView;

const titleStyle: CSSProperties = {
  fontSize: '22px',
  fontWeight: 700,
  color: colors.black,
  lineHeight: '130%',
};

const ulStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  marginTop: '12px',
  listStyle: 'none',
};

const liStyle: CSSProperties = {
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '150%',
  letterSpacing: '-0.3px',
  color: colors.gray_500,
};
