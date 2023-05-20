import { type Meta } from '@storybook/react';

import ArrowIcon from './ArrowIcon';
import CheckIcon from './CheckIcon';
import ChevronArrowRightIcon from './ChevronArrowRightIcon';
import EditIcon from './EditIcon';
import LineThreeDotsIcon from './LineThreeDotsIcon';
import SendIcon from './SendIcon';
import ThreeDotsIcon from './ThreeDotsIcon';
import WarningIcon from './WarningIcon';
import XIcon from './XIcon';

const meta: Meta = {
  title: 'icon',
};

export default meta;

export function Arrow() {
  return (
    <div>
      <ArrowIcon />
      <ArrowIcon direction="up" />
      <ArrowIcon direction="right" />
      <ArrowIcon direction="down" />
    </div>
  );
}

export function X() {
  return <XIcon />;
}

export function LineThreeDots() {
  return <LineThreeDotsIcon />;
}

export function Send() {
  return <SendIcon />;
}

export function ThreeDots() {
  return <ThreeDotsIcon />;
}

export function Warning() {
  return <WarningIcon />;
}

export function Edit() {
  return <EditIcon />;
}

export function ChevronArrowRight() {
  return <ChevronArrowRightIcon />;
}

export function Check() {
  return <CheckIcon />;
}
