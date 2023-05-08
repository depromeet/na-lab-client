/* eslint-disable unicorn/filename-case */
import React from 'react';
import { Reorder } from 'framer-motion';

interface Props {
  item: {
    title: string;
    content: string;
    id: number;
  };
}
const DndItem = ({ item }: Props) => {
  return (
    <Reorder.Item value={item} as="div">
      <div className="reorder-handle">
        <div>{item.content}</div>
        <div>{item.title}</div>
      </div>
    </Reorder.Item>
  );
};

export default DndItem;
