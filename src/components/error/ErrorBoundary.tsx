import { Component, type PropsWithChildren, type ReactNode } from 'react';
import { css, type Theme } from '@emotion/react';
import { captureException } from '@sentry/nextjs';

import { BODY_1, HEAD_1 } from '~/styles/typo';

import Button from '../button/Button';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMsg: string | null;
}

class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {
  constructor(props: PropsWithChildren<ErrorBoundaryProps>) {
    super(props);
    this.state = {
      hasError: false,
      errorMsg: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMsg: error.name };
  }

  componentDidCatch(error: Error) {
    captureException(error);
  }

  render() {
    const { hasError, errorMsg } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      if (fallback) return fallback;

      return <DefaultFallback errorMsg={errorMsg} />;
    }

    return children;
  }
}

export default ErrorBoundary;

export const DefaultFallback = ({ errorMsg }: Pick<ErrorBoundaryState, 'errorMsg'>) => {
  return (
    <main css={defaultLayoutCss}>
      <section css={sectionCss}>
        <h1 css={headingCss}>알 수 없는 에러가 발생했어요.</h1>
        <small css={smallCss}>{errorMsg}</small>
      </section>

      <section css={sectionCss}>
        <p css={paragraphCss}>
          에러가 지속적으로 발생할 시<br />
          아래 이메일로 연락해 주세요.
        </p>
        <a href="mailto:ahmatda.app@gmail.com" css={linkCss}>
          <Button>samillmu.team@gmail.com</Button>
        </a>
      </section>
    </main>
  );
};

const defaultLayoutCss = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  max-width: ${theme.size.maxWidth};
  min-height: 100vh;
  margin: 0 auto;
  padding: 20dvh 16px;
`;

const sectionCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const headingCss = css`
  ${HEAD_1}

  margin-bottom: 6px;
`;

const smallCss = (theme: Theme) => css`
  ${BODY_1};

  color: ${theme.colors.gray_300};
`;

const paragraphCss = (theme: Theme) => css`
  ${BODY_1};

  margin-bottom: 14px;
  color: ${theme.colors.gray_500};
`;

const linkCss = css`
  all: unset;
`;
