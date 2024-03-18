import Svg from '~/components/svg/Svg';

interface Props {
  color?: string;
}

const QuestionIcon = ({ color }: Props) => {
  return (
    <Svg width={19} height={18} viewBox="0 0 19 18">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.1 0C18.1493 0 19 0.850659 19 1.9V12.1C19 13.1493 18.1493 14 17.1 14H13.1764L10.1994 17.239C9.82306 17.6485 9.17694 17.6485 8.80055 17.239L5.82357 14H1.9C0.850658 14 0 13.1493 0 12.1V1.9C0 0.850658 0.850659 0 1.9 0H17.1Z"
        fill={color ? color : '#C9CFDF'}
      />
      <rect x="4" y="8" width="11" height="2" rx="1" fill="white" />
      <rect x="4" y="4" width="11" height="2" rx="1" fill="white" />
    </Svg>
  );
};

export default QuestionIcon;
