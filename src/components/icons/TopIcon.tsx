import Svg from '../svg/Svg';

const TopIcon = ({ size = 68, ...rest }) => {
  return (
    <Svg size={size} {...rest}>
      <g filter="url(#filter0_bd_3604_60925)">
        <rect
          x="62"
          y="2"
          width="56"
          height="56"
          rx="28"
          transform="rotate(90 62 2)"
          fill="white"
          fillOpacity="0.5"
          shapeRendering="crispEdges"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M42.9903 28.4923C42.5347 28.9479 41.796 28.9479 41.3404 28.4923L35.1654 22.3172L35.1654 40.5007C35.1654 41.145 34.643 41.6673 33.9987 41.6673C33.3544 41.6673 32.832 41.145 32.832 40.5007L32.832 22.3172L26.657 28.4923C26.2014 28.9479 25.4627 28.9479 25.0071 28.4923C24.5515 28.0367 24.5515 27.298 25.0071 26.8424L33.1737 18.6757C33.6294 18.2201 34.368 18.2201 34.8237 18.6757L42.9903 26.8424C43.4459 27.298 43.4459 28.0367 42.9903 28.4923Z"
          fill="#677089"
        />
        <rect
          x="61.5"
          y="2.5"
          width="55"
          height="55"
          rx="27.5"
          transform="rotate(90 61.5 2.5)"
          stroke="#E7E9EC"
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_bd_3604_60925"
          x="-2"
          y="-6"
          width="72"
          height="74"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="4" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_3604_60925" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="effect1_backgroundBlur_3604_60925" result="effect2_dropShadow_3604_60925" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_3604_60925" result="shape" />
        </filter>
      </defs>
    </Svg>
  );
};

export default TopIcon;
