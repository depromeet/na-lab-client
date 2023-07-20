import { type PropsWithChildren } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { BASE_URL } from '~/constants/url';

interface Props {
  copyText: string;
  onCopy: () => void;
}

const CopyLink = ({ copyText, children, onCopy }: PropsWithChildren<Props>) => {
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
