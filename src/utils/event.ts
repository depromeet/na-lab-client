import * as ChannelTalk from '@channel.io/channel-web-sdk-loader';
import mixpanel from 'mixpanel-browser';

import { event } from '~/libs/gtag';

import { isProd } from './common';

type GAEventProps = Parameters<typeof event>[0];
type Props = Omit<GAEventProps, 'category'>;

const recordEvent = ({ action, label, value }: Props) => {
  if (!isProd(process.env.NODE_ENV)) return;

  event({ action, category: process.env.WEB_VERSION, label, value });
  mixpanel.track(action, { category: process.env.WEB_VERSION, label, value });
  ChannelTalk.track(action, { category: process.env.WEB_VERSION, label: label || null, value: value || null });
};

export default recordEvent;
