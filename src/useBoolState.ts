import { useCallback, useState } from 'react';

export interface UseBoolState {
  value: boolean;
  set: React.Dispatch<React.SetStateAction<boolean>>;
  reset: () => void;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
  isTrue: boolean;
  isFalse: boolean;
}

export function useBoolState(initialValue: boolean = false): UseBoolState {
  const [value, set] = useState(initialValue);

  const reset = useCallback(() => set(initialValue), [initialValue]);
  const toggle = useCallback(() => set((s) => !s), []);
  const setTrue = useCallback(() => set(true), []);
  const setFalse = useCallback(() => set(false), []);

  return {
    value,
    set,
    reset,
    toggle,
    setTrue,
    setFalse,
    isTrue: value === true,
    isFalse: value === false,
  };
}
