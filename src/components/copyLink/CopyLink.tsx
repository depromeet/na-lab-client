import { type PropsWithChildren } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { copyToClipBoardWithHostUrl } from '~/utils/clipboard';

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
