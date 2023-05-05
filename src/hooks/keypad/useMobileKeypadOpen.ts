import { type FocusEventHandler } from 'react';

import useBoolean from '../common/useBoolean';
import { useUserAgent } from '../common/useUserAgent';

type InputAndTextarea = HTMLInputElement | HTMLTextAreaElement;

const useMobileKeypadOpen = () => {
  const { isMobile } = useUserAgent();
  const [isOpen, _, setIsOpenTrue, setIsOpenFalse] = useBoolean(false);

  const onFocus: FocusEventHandler<InputAndTextarea> = () => {
    if (!isMobile()) return;
    setIsOpenTrue();
  };

  const onBlur: FocusEventHandler<InputAndTextarea> = () => {
    if (!isMobile()) return;
    setIsOpenFalse();
  };

  return {
    isOpen,
    onFocus,
    onBlur,
  };
};

export default useMobileKeypadOpen;
