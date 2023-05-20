import { type DependencyList, type EffectCallback, useEffect, useRef } from 'react';

const useDidUpdate = (callback: EffectCallback, dependencyList: DependencyList) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      return;
    }

    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencyList]);
};

export default useDidUpdate;
