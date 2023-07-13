import { useCallback, useEffect } from 'react';

export const useOnClickOutside = ({
  ref,
  onClickOutside,
  interactive,
}: {
  ref: React.RefObject<HTMLDivElement>;
  onClickOutside?: () => void;
  interactive?: boolean;
}) => {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (!onClickOutside) {
        return;
      }

      const isClickTooltipOutside = ref.current && !ref.current.contains(event.target as Node);

      if (!interactive || isClickTooltipOutside) {
        onClickOutside();
      }
    },
    [ref, onClickOutside, interactive],
  );

  useEffect(() => {
    document.addEventListener('pointerdown', handleClick);

    return () => {
      document.removeEventListener('pointerdown', handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
