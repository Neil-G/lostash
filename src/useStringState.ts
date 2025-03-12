import { useCallback, useState } from 'react';

export interface UseStringState {
  value: string;
  set: React.Dispatch<React.SetStateAction<string>>;
  clear: () => void;
  reset: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function useStringState(initialValue: string = ''): UseStringState {
  const [value, set] = useState(initialValue);

  const clear = useCallback(() => set(''), []);
  const reset = useCallback(() => set(initialValue), [initialValue]);
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => set(e.target.value),
    []
  );

  return { value, set, clear, reset, onChange };
}
