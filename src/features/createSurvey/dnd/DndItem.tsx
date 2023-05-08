/* eslint-disable unicorn/filename-case */
import React from 'react';
import { css } from '@emotion/react';
import { Reorder, useDragControls } from 'framer-motion';

import ReorderIcon from './ReorderIcon';

export interface DndItemType {
  title: string;
  content: string;
  id: number;
}

interface Props {
  item: DndItemType;
}

const DndItem = ({ item }: Props) => {
  const dragControls = useDragControls();

  return (
    <Reorder.Item value={item} as="div" dragListener={false} dragControls={dragControls}>
      <div
        css={css`
          display: flex;
          align-items: center;

          width: fit-content;
          padding: 10px;

          border: 1px solid #ddd;
        `}
      >
        <div
          className="reorder-handle"
          css={css`
            user-select: none;
            width: 300px;
          `}
        >
          <div>{item.content}</div>
          <div>{item.title}</div>
        </div>
        <ReorderIcon dragControls={dragControls} />
      </div>
    </Reorder.Item>
  );
};

export default DndItem;
