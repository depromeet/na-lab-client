import { type PropsWithChildren } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import LinkIcon from '~/components/icons/LinkIcon';
import Toast from '~/components/toast/Toast';
import useToast from '~/components/toast/useToast';
import { copyToClipBoardWithHostUrl } from '~/utils/clipboard';

interface Props {
  copyText: string;
  copyToastText: React.ReactNode | string;
}

const CopyLink = ({ copyText, children, copyToastText }: PropsWithChildren<Props>) => {
  const { fireToast } = useToast();

  return (
    <CopyToClipboard
      text={copyToClipBoardWithHostUrl(copyText)}
      onCopy={() => {
        fireToast({
          content: (
            <>
              <LinkIcon />
              <Toast.Text>{copyToastText}</Toast.Text>
            </>
          ),
        });
      }}
    >
      {children}
    </CopyToClipboard>
  );
};

export default CopyLink;
