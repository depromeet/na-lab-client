import { type ComponentProps } from 'react';

import colors from '~/styles/color';

import Svg from '../svg/Svg';

interface Props extends ComponentProps<typeof Svg> {
  isBookmarked: boolean;
}

const BookmarkIcon = ({ size = 32, isBookmarked = false, ...rest }: Props) => {
  return (
    <Svg size={size} viewBox="0 0 32 32" {...rest}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.90039 5.81349C6.90039 4.91057 7.43372 4.26562 8.18039 4.26562H23.7537C24.5004 4.26562 25.0337 4.91057 25.0337 5.81349V27.9996C25.0337 28.6446 24.5004 29.0315 24.0737 28.6446L16.6071 23.485C16.1804 23.227 15.7537 23.227 15.3271 23.485L7.86039 28.6446C7.43372 28.9025 6.90039 28.5156 6.90039 27.9996V5.81349Z"
        fill={isBookmarked ? colors.primary_200 : colors.gray_300}
      />
    </Svg>
  );
};

export default BookmarkIcon;
