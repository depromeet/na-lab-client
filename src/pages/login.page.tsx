import Image from 'next/image';
import { css } from '@emotion/react';

import LogoBig from '~/assets/LogoBig';
import LogoSmall from '~/assets/LogoSmall';

import RainbowIcecream from '../../public/images/RainvowIcecream.png';

// todo color font 모두 전역에서 가져오기

export default function Login() {
  return (
    <div>
      <LogoSmall />
      <section>
        <div css={TitleWrapper}>
          <main className="title">나의 커리어 DNA 연구</main>
          <LogoBig />
        </div>
        <Image src={RainbowIcecream} width={99} height={112} alt="Picture of the author" />
      </section>
      <section>
        <button type="button" css={StartButton}>
          질문 폼 생성으로 시작하기
        </button>
        <div>
          이미 계정이 있다면? <span>카카오 로그인 하기</span>
        </div>
      </section>
    </div>
  );
}

const TitleWrapper = css`
  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-size: 24px;
    font-weight: semibold;
    line-height: 33px;
    line-height: 138%;
    color: #17171b;
    letter-spacing: -0.3px;
  }
`;

const StartButton = css`
  cursor: pointe;

  overflow: visible;

  width: 327px;
  height: 56px;
  padding: 0;

  font-size: 18px;
  font-weight: 500;
  color: #fff;

  background-color: #638fff;
  border: none;
  border-radius: 8px;
  box-shadow: none;
`;
