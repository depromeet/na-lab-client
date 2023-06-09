import { type ComponentProps } from 'react';

import Svg from '../svg/Svg';

const SendIcon = ({ width = 19, height = 18, color = '#677089', ...rest }: ComponentProps<typeof Svg>) => {
  return (
    <Svg width={width} height={height} isUsingFill color={color} {...rest}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.77593 0.218435C2.29322 0.0445307 1.75923 0.0620946 1.28587 0.272478C0.276504 0.721091 -0.178077 1.90302 0.270536 2.91238L2.53178 8.00012H7.99805C8.55033 8.00012 8.99805 8.44784 8.99805 9.00012C8.99805 9.55241 8.55033 10.0001 7.99805 10.0001H2.56885L0.270495 15.1715L0.200639 15.3516C0.0384448 15.8384 0.0688977 16.3718 0.290646 16.8399C0.763497 17.8382 1.95605 18.2641 2.95429 17.7912L17.6093 10.8494L17.7619 10.7689C18.1086 10.5664 18.3876 10.2633 18.5606 9.89809C19.0334 8.89984 18.6075 7.70729 17.6093 7.23444L2.95433 0.292622L2.77593 0.218435Z"
      />
    </Svg>
  );
};

export default SendIcon;
