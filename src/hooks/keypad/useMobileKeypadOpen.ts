import { type FocusEventHandler } from 'react';

import { isMobile } from '~/utils/agent';

import useBoolean from '../common/useBoolean';

type InputAndTextarea = HTMLInputElement | HTMLTextAreaElement;

const useMobileKeypadOpen = () => {
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
