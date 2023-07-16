import { useCallback, useEffect } from 'react';

export const useOnClickTooltip = ({
  ref,
  onClickTooltip,
  interactive,
}: {
  ref: React.RefObject<HTMLDivElement>;
  onClickTooltip?: () => void;
  interactive?: boolean;
}) => {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (!onClickTooltip) {
        return;
      }

      const rect = ref.current?.getBoundingClientRect();
      const x = event.clientX;
      const y = event.clientY;

      if (
        !interactive &&
        x >= (rect?.left ?? 0) &&
        x <= (rect?.right ?? 0) &&
        y >= (rect?.top ?? 0) &&
        y <= (rect?.bottom ?? 0)
      ) {
        onClickTooltip();
      }
    },
    [ref, onClickTooltip, interactive],
  );

  useEffect(() => {
    document.addEventListener('pointerdown', handleClick);

    return () => {
      document.removeEventListener('pointerdown', handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
