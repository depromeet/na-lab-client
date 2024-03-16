import { type NextPage } from 'next';
import Link from 'next/link';
import { css, type Theme } from '@emotion/react';

import BottomBar from '~/components/bottomBar/BottomBar';
import Button from '~/components/button/Button';
import { HEAD_1 } from '~/styles/typo';

const SurveyBasePage: NextPage = () => {
  return (
    <>
      <main css={mainCss}>
        <h1 css={h1Css}>
          질문 폼을 생성하고
          <br />
          동료에게 피드백을 요청해보세요
        </h1>

        <Link href="/survey/create" css={linkCss}>
          <Button color="blue">폼 생성하기</Button>
        </Link>
      </main>

      <BottomBar />
    </>
  );
};

export default SurveyBasePage;

const mainCss = css`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: 100dvh;
  padding: 120px 0 130px;
`;

const h1Css = (theme: Theme) => css`
  ${HEAD_1};
  color: ${theme.colors.black};
  text-align: center;
`;

const linkCss = css`
  text-decoration: none;
`;
