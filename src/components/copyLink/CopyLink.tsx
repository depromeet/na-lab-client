import { type ComponentProps } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { BASE_URL } from '~/constants/url';

interface Props {
  copyText: string;
  onCopy: () => void;
  // NOTE: 아래 컴포넌트가 ReactNode 타입의 children을 지원하지 않아 추론해 사용
  children: ComponentProps<typeof CopyToClipboard>['children'];
}

const CopyLink = ({ copyText, children, onCopy }: Props) => {
  return (
    <CopyToClipboard text={copyToClipBoardWithHostUrl(copyText)} onCopy={onCopy}>
      {children}
    </CopyToClipboard>
  );
};

export default CopyLink;

const copyToClipBoardWithHostUrl = (path: string) => {
  if (typeof window === 'undefined') {
    return `${BASE_URL}${path}`;
  } else {
    const { host } = window.location;

    return `${host}${path}`;
  }
};
