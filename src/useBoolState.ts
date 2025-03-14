import { useCallback, useMemo, useState } from 'react';

export type PropsConfig<Props> = {
  [K in keyof Props]: [Props[K], Props[K]];
};

export interface UseBoolStateOptions<Props> {
  props?: PropsConfig<Props>;
}

export interface UseBoolState<Props = {}> {
  value: boolean;
  set: React.Dispatch<React.SetStateAction<boolean>>;
  reset: () => void;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
  isTrue: boolean;
  isFalse: boolean;
  props: Props;
}

export function useBoolState<Props = {}>(
  initialValue: boolean = false,
  options: UseBoolStateOptions<Props> = {}
): UseBoolState<Props> {
  const [value, set] = useState(initialValue);

  const reset = useCallback(() => set(initialValue), [initialValue]);
  const toggle = useCallback(() => set((s) => !s), []);
  const setTrue = useCallback(() => set(true), []);
  const setFalse = useCallback(() => set(false), []);

  const props = useMemo(() => {
    const computedProps = {} as Props;
    if (options.props) {
      for (const key in options.props) {
        if (options.props.hasOwnProperty(key)) {
          computedProps[key] = options.props[key][value ? 0 : 1];
        }
      }
    }
    return computedProps;
  }, [options.props, value]);

  return {
    value,
    set,
    reset,
    toggle,
    setTrue,
    setFalse,
    isTrue: value === true,
    isFalse: value === false,
    props,
  };
}
