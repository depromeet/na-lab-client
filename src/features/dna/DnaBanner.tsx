import Image from 'next/image';
import { css } from '@emotion/react';

const DnaBanner = () => {
  return (
    <section css={containerCss}>
      <div css={leftBoxCss}></div>
      <div css={rightBoxCss}>
        <Image css={dnaImageCss} src="/images/result/dna1.png" alt="DNA 이미지" width={113} height={120} />
        <div css={textWrapperCss}>
          <div css={descCss}>배려와 경청으로 소통하는 서포터</div>
          <div css={titleCss}>유연한 중재자</div>
        </div>
      </div>
    </section>
  );
};

export default DnaBanner;

const containerCss = css`
  display: flex;
  flex-direction: row;

  width: 353px;
  height: 120px;

  border-radius: 8px 0 0 8px;
  box-shadow: 3px 1px 18px -2px rgb(176 183 202 / 35%);
`;

const leftBoxCss = css`
  width: 12px;
  height: 120px;
  background-color: #d8e3ff;
  border-radius: 8px 0 0 8px;
`;

const rightBoxCss = css`
  display: flex;
  flex-direction: row;
`;

const dnaImageCss = css`
  background-color: aqua;
`;

const textWrapperCss = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const descCss = css`
  /* Body 1 */
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 150%;
  color: var(--gray-400-text-tertiary, #677089);
  text-align: center;
  letter-spacing: -0.3px;
`;

const titleCss = css`
  margin-top: 4px;

  font-size: 20px;
  font-weight: 600;
  font-style: normal;
  line-height: 140%;
  color: var(--gray-500-text-secondary, #394258);
  text-align: center;
  letter-spacing: -0.3px;
`;
