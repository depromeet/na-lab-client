import { type EffectCallback, useEffect, useRef } from 'react';

const useDidMount = (callback: EffectCallback) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) return;
    didMountRef.current = true;

    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useDidMount;
