import { type ComponentProps } from 'react';

import Svg from '~/components/svg/Svg';

function DownloadCircleIcon({ width = 88, height = 87, color = '#1D2942', ...rest }: ComponentProps<typeof Svg>) {
  return (
    <Svg width={width} height={height} {...rest}>
      <g filter="url(#filter0_d_4281_77401)">
        <rect x="19.5" y="14" width="49" height="49" rx="24.5" fill="white" />
        <path
          d="M54.024 41.8402V43.1766C54.024 45.0476 54.024 45.9832 53.6598 46.6978C53.3395 47.3265 52.8284 47.8376 52.1998 48.1579C51.4851 48.522 50.5496 48.522 48.6785 48.522H39.324C37.4529 48.522 36.5173 48.522 35.8027 48.1579C35.1741 47.8376 34.663 47.3265 34.3427 46.6978C33.9785 45.9832 33.9785 45.0476 33.9785 43.1766V41.8402M49.5694 36.272L44.0012 41.8402M44.0012 41.8402L38.4331 36.272M44.0012 41.8402V28.4766"
          stroke={color}
          strokeWidth="2.22727"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_4281_77401"
          x="0.881838"
          y="0.0363784"
          width="86.2363"
          height="86.2363"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4.65454" />
          <feGaussianBlur stdDeviation="9.30908" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.615686 0 0 0 0 0.690196 0 0 0 0 0.866667 0 0 0 0.13 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4281_77401" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4281_77401" result="shape" />
        </filter>
      </defs>
    </Svg>
  );
}

export default DownloadCircleIcon;
