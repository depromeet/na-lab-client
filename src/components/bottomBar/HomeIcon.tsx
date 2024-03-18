import Svg from '~/components/svg/Svg';

interface Props {
  color?: string;
}

const HomeIcon = ({ color }: Props) => {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22">
      <rect width="22" height="22" fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.8906 2.73959C10.5624 2.29172 11.4376 2.29172 12.1094 2.73959L19.1094 7.40625C19.6658 7.77718 20 8.40165 20 9.07035V18C20 19.1046 19.1046 20 18 20H4C2.89543 20 2 19.1046 2 18V9.07035C2 8.40165 2.3342 7.77718 2.8906 7.40625L9.8906 2.73959Z"
        fill={color ? color : '#C9CFDF'}
      />
    </Svg>
  );
};

export default HomeIcon;
