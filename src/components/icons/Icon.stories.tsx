import { type Meta } from '@storybook/react';

import ArrowIcon from './ArrowIcon';
import BottomSheetHandleIcon from './BottomSheetHandleIcon';
import LineThreeDotsIcon from './LineThreeDotsIcon';
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

export function BottomSheetHandle() {
  return <BottomSheetHandleIcon />;
}
