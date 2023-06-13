import { useEffect } from 'react';

const useWillUnmount = (callback: VoidFunction) => {
  useEffect(() => {
    return callback;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useWillUnmount;
