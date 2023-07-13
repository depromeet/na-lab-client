import { type LegacyRef, type MutableRefObject, type Ref } from 'react';

export function mergeRefs<T = any>(...refs: Array<MutableRefObject<T> | LegacyRef<T>>): Ref<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as MutableRefObject<T | null>).current = value;
      }
    });
  };
}
