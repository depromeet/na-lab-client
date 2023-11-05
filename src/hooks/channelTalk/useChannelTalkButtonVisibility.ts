import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as ChannelTalk from '@channel.io/channel-web-sdk-loader';

const DIABLED_PATHS: RegExp[] = [/^\/review\/.*/];

const useChannelTalkButtonVisibility = () => {
  const router = useRouter();

  useEffect(() => {
    if (DIABLED_PATHS.some((path) => path.test(router.asPath))) {
      ChannelTalk.hideChannelButton();
    } else {
      ChannelTalk.showChannelButton();
    }
  }, [router.asPath]);
};

export default useChannelTalkButtonVisibility;
