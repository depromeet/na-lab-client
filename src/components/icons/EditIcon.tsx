import { type ComponentProps } from 'react';

import Svg from '../svg/Svg';

const EditIcon = ({ size = 21, color = '#3D4350', ...rest }: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={size} isUsingFill {...rest}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.8787 1.70729C13.0034 0.582583 14.799 0.537595 15.9773 1.57233L16.1213 1.70729L19.2929 4.87887C20.4176 6.00358 20.4626 7.79914 19.4279 8.97752L19.2929 9.12151L8.29289 20.1215C7.77717 20.6372 7.09301 20.9458 6.36971 20.9936L6.17157 21.0002H3C1.40232 21.0002 0.0963391 19.7513 0.00509269 18.1765L0 18.0002V14.8286C0 14.0993 0.265587 13.3973 0.743204 12.852L0.87868 12.7073L11.8787 1.70729ZM3.499 12.9136L2.29289 14.1215C2.13661 14.2778 2.0374 14.4805 2.00867 14.6972L2 14.8286V18.0002C2 18.513 2.38604 18.9357 2.88338 18.9935L3 19.0002H6.17157C6.39259 19.0002 6.60606 18.927 6.7796 18.7941L6.87868 18.7073L8.085 17.4996L3.499 12.9136ZM14.7071 3.12151C14.3466 2.76102 13.7794 2.73329 13.3871 3.03832L13.2929 3.12151L4.914 11.4996L9.5 16.0856L17.8787 7.70729C18.2392 7.34681 18.2669 6.77958 17.9619 6.38729L17.8787 6.29308L14.7071 3.12151Z"
        fill={color}
      />
    </Svg>
  );
};

export const FillEditIcon = ({ size = 30, color = '#3D4350', ...rest }: ComponentProps<typeof Svg>) => {
  return (
    <Svg size={size} {...rest}>
      <g clipPath="url(#clip0_2998_54290)">
        <path
          d="M3.4312 26.4536L2.5694 20.5318L5.25728 17.8756L11.9648 24.7943L9.2769 27.4504L3.4312 26.4536Z"
          fill={color}
          stroke={color}
          strokeWidth="2"
        />
        <rect
          width="11.6363"
          height="19.6832"
          rx="0.941028"
          transform="matrix(-0.696065 -0.717979 0.711295 -0.702894 14.5039 23.6895)"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_2998_54290">
          <rect width="30" height="30" fill="white" />
        </clipPath>
      </defs>
    </Svg>
  );
};
export default EditIcon;
