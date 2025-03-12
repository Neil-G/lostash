import { useCallback, useState } from 'react';
import isEqual from 'lodash.isequal';

export interface UseArrayState<T> {
  value: T[];
  set: React.Dispatch<React.SetStateAction<T[]>>;
  clear: () => void;
  reset: () => void;
  push: (item: T) => void;
  pop: () => void;
  remove: (item: Partial<T>) => void;
  toggle: (item: T) => void;
  includes: (item: T) => boolean;
}

export function useArrayState<T>(
  initialValue: T[] = [],
  opt: { isEqual?: (entry: T, comparisonItem: any) => boolean } = {}
): UseArrayState<T> {
  const [value, set] = useState<T[]>(initialValue);

  const _isEqual = opt?.isEqual || isEqual;
  const clear = useCallback(() => set([]), []);
  const reset = useCallback(() => set(initialValue), [initialValue]);
  const push = useCallback((item: T) => set((s) => [...s, item]), []);
  const pop = useCallback(() => set((s) => s.slice(0, -1)), []);
  const remove = useCallback(
    (item: Partial<T>) =>
      set((s) => {
        if (typeof item !== 'object') {
          return s.filter((i) => i !== item);
        }
        return s.filter((i) => !_isEqual(i, item));
      }),
    []
  );
  const toggle = useCallback((item: T) => {
    if (typeof item === 'object') {
      set((s) => {
        const exists = s.some((i) => _isEqual(i, item));
        return exists ? s.filter((i) => !_isEqual(i, item)) : [...s, item];
      });
    } else {
      set((s) =>
        s.includes(item) ? s.filter((i) => i !== item) : [...s, item]
      );
    }
  }, []);

  const includes = useCallback(
    (item: T) => value.some((i) => _isEqual(i, item)),
    [value]
  );

  return { value, set, clear, reset, push, pop, remove, toggle, includes };
}
