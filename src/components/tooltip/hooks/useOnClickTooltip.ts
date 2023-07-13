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

      const isClickTooltipTooltip = ref.current && ref.current.contains(event.target as Node);

      if (!interactive || isClickTooltipTooltip) {
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
