import { useCallback, useState } from 'react';

export interface UseNumberState {
  value: number;
  set: React.Dispatch<React.SetStateAction<number>>;
  increment: (step?: number) => void;
  decrement: (step?: number) => void;
  reset: () => void;
}

export function useNumberState(initialValue: number = 0): UseNumberState {
  const [value, set] = useState(initialValue);

  const increment = useCallback(
    (step: number = 1) => set((prev) => prev + step),
    []
  );
  const decrement = useCallback(
    (step: number = 1) => set((prev) => prev - step),
    []
  );
  const reset = useCallback(() => set(initialValue), [initialValue]);

  return { value, set, increment, decrement, reset };
}
