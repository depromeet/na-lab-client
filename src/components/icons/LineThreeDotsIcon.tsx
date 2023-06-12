import Svg from '../svg/Svg';

const LineThreeDotsIcon = ({ color = '#3D4350', ...rest }: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={24} color={color} isUsingFill {...rest}>
      <circle cx="4.83" cy="5.99992" r="1.33" fill="#3D4350" />
      <path d="M9.5 6.00977L20.5 6.00977" stroke="#3D4350" strokeWidth="2" strokeLinecap="round" />
      <circle cx="4.83" cy="11.9999" r="1.33" fill="#3D4350" />
      <path d="M9.5 12.0098L20.5 12.0098" stroke="#3D4350" strokeWidth="2" strokeLinecap="round" />
      <circle cx="4.83" cy="17.9999" r="1.33" fill="#3D4350" />
      <path d="M9.5 18.0098L20.5 18.0098" stroke="#3D4350" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
};

export default LineThreeDotsIcon;
