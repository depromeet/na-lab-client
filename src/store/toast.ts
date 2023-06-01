import { type ReactElement } from 'react';
import { atom } from 'jotai';

export interface ToastProps {
  id: string;
  content: string | ReactElement;
  higherThanCTA?: boolean;
}

export const toastAtom = atom<ToastProps | null>(null);
