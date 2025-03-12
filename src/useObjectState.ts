import { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

type DebouncedFunction<T> = ((value: T) => void) & { cancel: () => void };

export interface UseObjectState<T> {
  value: T; // Immediate value
  debouncedValue: T | null; // Debounced value
  set: React.Dispatch<React.SetStateAction<T>>; // Sets immediate value
  clear: () => void;
  reset: () => void;
  merge: (newState: Partial<T>) => void;
  replace: (newState: T) => void;
  add: (key: keyof T, value: T[keyof T]) => void;
  remove: (key: keyof T) => void;
}

export function useObjectState<T>(
  initialValue: T = {} as T,
  debounceTime: number = 0 // Default debounce time (no debouncing by default)
): UseObjectState<T> {
  const [value, setValue] = useState<T>(initialValue); // Immediate value
  const [debouncedValue, setDebouncedValue] = useState<T | null>(
    debounceTime > 0 ? initialValue : null
  ); // Debounced value only if debounceTime > 0

  const debouncedSet = useRef<DebouncedFunction<T> | null>(null);

  useEffect(() => {
    if (debounceTime > 0) {
      // Create a debounced version of setDebouncedValue
      debouncedSet.current = debounce((newValue: T) => {
        setDebouncedValue(newValue);
      }, debounceTime);
    } else {
      // If debounceTime is 0, do not set a debounced function
      debouncedSet.current = null;
      setDebouncedValue(null); // Reset debouncedValue to null
    }

    // Cleanup debounce on unmount or debounceTime change
    return () => {
      if (debouncedSet.current) {
        debouncedSet.current.cancel?.();
      }
    };
  }, [debounceTime]);

  // Update both values when `setValue` is called
  const set = useCallback((update: React.SetStateAction<T>) => {
    setValue((prev) => {
      const newValue =
        typeof update === 'function'
          ? (update as (prevState: T) => T)(prev)
          : update;

      // Update debounced value only if debouncing is enabled
      if (debouncedSet.current) {
        debouncedSet.current(newValue);
      }

      return newValue;
    });
  }, []);

  const clear = useCallback(() => set({} as T), [set]);
  const reset = useCallback(() => set(initialValue), [initialValue, set]);
  const merge = useCallback(
    (newState: Partial<T>) => set((prev) => ({ ...prev, ...newState })),
    [set]
  );
  const replace = useCallback((newState: T) => set(newState), [set]);
  const add = useCallback(
    (key: keyof T, value: T[keyof T]) =>
      set((prev) => ({ ...prev, [key]: value })),
    [set]
  );
  const remove = useCallback(
    (key: keyof T) => {
      set((prev) => {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      });
    },
    [set]
  );

  return {
    value,
    debouncedValue,
    set,
    clear,
    reset,
    merge,
    replace,
    add,
    remove,
  };
}
