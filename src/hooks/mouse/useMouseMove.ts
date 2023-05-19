import { useEffect, useRef, useState } from 'react';

import { clamp } from '~/utils/math';

import useDidMount from '../lifeCycle/useDidMount';

export interface UseMovePosition {
  x: number;
  y: number;
}

interface ScrubHandler {
  onStart?: () => void;
  onEnd?: () => void;
}

const useMouseMove = <T extends HTMLElement = HTMLDivElement>(
  onChange: (value: UseMovePosition) => void,
  handler?: ScrubHandler,
) => {
  const ref = useRef<T>(null);
  const mounted = useRef(false);
  const frame = useRef(0);
  const isSliding = useRef(false);
  const [isActive, setIsActive] = useState(false);

  useDidMount(() => {
    mounted.current = true;
  });

  useEffect(() => {
    const onScrub = ({ x, y }: UseMovePosition) => {
      cancelAnimationFrame(frame.current);

      frame.current = requestAnimationFrame(() => {
        if (!mounted.current) return;
        if (!ref.current) return;

        ref.current.style.userSelect = 'none';
        const rect = ref.current.getBoundingClientRect();

        if (!rect.width) return;
        if (!rect.height) return;

        const _x = clamp((x - rect.left) / rect.width, 0, 1);
        const _y = clamp((y - rect.top) / rect.height, 0, 1);
        onChange({ x: _x, y: _y });
      });
    };

    const bindEvents = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', stopScrub);
      document.addEventListener('touchmove', onTouchMove);
      document.addEventListener('touchend', stopScrub);
    };

    const unbindEvents = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', stopScrub);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', stopScrub);
    };

    const startScrub = () => {
      if (!mounted.current) return;
      if (isSliding.current) return;

      isSliding.current = true;
      setIsActive(true);
      bindEvents();

      if (typeof handler?.onStart === 'function') handler.onStart();
    };

    const stopScrub = () => {
      if (!mounted.current) return;
      if (!isSliding.current) return;

      isSliding.current = false;
      setIsActive(false);
      unbindEvents();

      setTimeout(() => {
        if (typeof handler?.onEnd === 'function') handler.onEnd();
      });
    };

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      startScrub();
      onMouseMove(e);
    };

    const onMouseMove = (e: MouseEvent) => {
      onScrub({ x: e.clientX, y: e.clientY });
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault();

      startScrub();
      onTouchMove(e);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.cancelable) {
        e.preventDefault();
      }

      onScrub({ x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY });
    };

    ref.current?.addEventListener('mousedown', onMouseDown);
    ref.current?.addEventListener('touchstart', onTouchStart, { passive: false });

    return () => {
      if (!ref.current) return;
      ref.current.removeEventListener('mousedown', onMouseDown);
      ref.current.removeEventListener('touchstart', onTouchStart);
    };
  }, [handler, onChange]);

  return { ref, isActive };
};

export default useMouseMove;
