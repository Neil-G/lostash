import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';

export interface UseStringStateOptions {
  debounceTime?: number;
}

export interface UseStringState {
  value: string;
  debouncedValue: string;
  set: React.Dispatch<React.SetStateAction<string>>;
  clear: () => void;
  reset: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function useStringState(
  initialValue: string = '',
  options: UseStringStateOptions = {}
): UseStringState {
  const [value, set] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  const { debounceTime } = options;

  useEffect(() => {
    if (typeof debounceTime === 'number' && debounceTime > 0) {
      const handler = debounce(() => {
        setDebouncedValue(value);
      }, debounceTime);

      handler();

      return () => {
        handler.cancel();
      };
    }
  }, [value, debounceTime]);

  const clear = useCallback(() => set(''), []);
  const reset = useCallback(() => set(initialValue), [initialValue]);
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => set(e.target.value),
    []
  );

  return { value, set, clear, reset, onChange, debouncedValue };
}
