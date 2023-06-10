import { type ComponentProps } from 'react';

import Svg from '../svg/Svg';

const MessageIcon = ({
  width = 29,
  height = 21,
  color = '#E6BFEF',
  stroke = '#F4E0F9',
  ...rest
}: ComponentProps<typeof Svg>) => {
  return (
    <Svg width={width} height={height} isUsingFill {...rest}>
      <rect x="0.6875" width="27.6316" height="17.6842" rx="2.21053" fill={color} />
      <path
        d="M13.6477 19.1683C14.1326 19.7982 14.3751 20.1132 14.6718 20.2237C14.9207 20.3165 15.1948 20.3165 15.4438 20.2237C15.7405 20.1132 15.9829 19.7982 16.4678 19.1683L16.6811 18.8913C17.3969 17.9613 17.7549 17.4964 17.7458 17.106C17.7383 16.781 17.5881 16.4758 17.3351 16.2716C17.0313 16.0263 16.4446 16.0263 15.271 16.0263H14.8445C13.671 16.0263 13.0842 16.0263 12.7804 16.2716C12.5274 16.4758 12.3772 16.781 12.3697 17.106C12.3607 17.4964 12.7186 17.9613 13.4345 18.8913L13.6477 19.1683Z"
        fill={color}
      />
      <path d="M5.10938 11.0527H23.8988" stroke={stroke} strokeWidth="2.21053" strokeLinecap="round" />
      <path d="M5.10938 5.52539H23.8988" stroke={stroke} strokeWidth="2.21053" strokeLinecap="round" />
    </Svg>
  );
};

export default MessageIcon;
