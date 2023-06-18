import { type MouseEventHandler, type ReactElement, type ReactNode } from 'react';
import { atom } from 'jotai';

export interface SnackBarProps {
  id: string;
  content: string | ReactElement;
  onClick?: MouseEventHandler<HTMLDivElement>;

  /**
   * @description `deleteElement`가 렌더링되는지 여부
   * @default true
   */
  isRenderDeleteElement?: boolean;
  /**
   * @description <button> 안에 렌더링되는 삭제를 담당할 ReactNode
   * @default <button>닫기</button>
   */
  deleteElement?: ReactNode;
}

export const snackBarsAtom = atom<SnackBarProps[]>([]);
