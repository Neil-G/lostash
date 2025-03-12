import { renderHook, act } from '@testing-library/react';
import { useObjectState } from '..';

jest.mock('lodash.debounce', () =>
  jest.fn((fn) => {
    const debouncedFn = (...args: any[]) => fn(...args);
    debouncedFn.cancel = jest.fn();
    return debouncedFn;
  })
);

describe('useObjectState', () => {
  it('should initialize with default empty object', () => {
    const { result } = renderHook(() => useObjectState());

    expect(result.current.value).toEqual({});
    expect(result.current.debouncedValue).toBeNull();
  });

  it('should initialize with a given object', () => {
    const { result } = renderHook(() =>
      useObjectState({ name: 'Alice', age: 30 })
    );

    expect(result.current.value).toEqual({ name: 'Alice', age: 30 });
  });

  it('should set a new object state', () => {
    const { result } = renderHook(() => useObjectState({ name: 'Alice' }));

    act(() => {
      result.current.set({ name: 'Bob' });
    });

    expect(result.current.value).toEqual({ name: 'Bob' });
  });

  it('should set a new object state when set takes a function', () => {
    const { result } = renderHook(() => useObjectState({ name: 'Alice' }));

    act(() => {
      result.current.set((prev) => {
        const newState = { ...prev };
        newState.name += ' is my name';
        return newState;
      });
    });

    expect(result.current.value).toEqual({ name: 'Alice is my name' });
  });

  it('should clear the object state', () => {
    const { result } = renderHook(() => useObjectState({ name: 'Alice' }));

    act(() => {
      result.current.clear();
    });

    expect(result.current.value).toEqual({});
  });

  it('should reset to the initial state', () => {
    const { result } = renderHook(() => useObjectState({ name: 'Alice' }));

    act(() => {
      result.current.set({ name: 'Bob' });
    });

    expect(result.current.value).toEqual({ name: 'Bob' });

    act(() => {
      result.current.reset();
    });

    expect(result.current.value).toEqual({ name: 'Alice' });
  });

  it('should merge new state into the existing object', () => {
    const { result } = renderHook(() =>
      useObjectState<{ name: string; age?: number }>({ name: 'Alice' })
    );

    act(() => {
      result.current.merge({ age: 30 });
    });

    expect(result.current.value).toEqual({ name: 'Alice', age: 30 });
  });

  it('should replace the object state completely', () => {
    const { result } = renderHook(() =>
      useObjectState<{ name?: string; age?: number }>({ name: 'Alice' })
    );

    act(() => {
      result.current.replace({ age: 30 });
    });

    expect(result.current.value).toEqual({ age: 30 });
  });

  it('should add a new key-value pair', () => {
    const { result } = renderHook(() => useObjectState<{ name?: string }>({}));

    act(() => {
      result.current.add('name', 'Alice');
    });

    expect(result.current.value).toEqual({ name: 'Alice' });
  });

  it('should remove a key from the object state', () => {
    const { result } = renderHook(() =>
      useObjectState({ name: 'Alice', age: 30 })
    );

    act(() => {
      result.current.remove('age');
    });

    expect(result.current.value).toEqual({ name: 'Alice' });
  });

  // it('should debounce value updates when debounceTime > 0', () => {
  //   jest.useFakeTimers();
  //   const { result } = renderHook(() => useObjectState({ name: 'Alice' }, 300));

  //   act(() => {
  //     result.current.set({ name: 'Bob' });
  //   });

  //   expect(result.current.value).toEqual({ name: 'Bob' });
  //   expect(result.current.debouncedValue).toEqual({ name: 'Alice' });

  //   act(() => {
  //     jest.runAllTimers();
  //   });

  //   expect(result.current.debouncedValue).toEqual({ name: 'Bob' });

  //   jest.useRealTimers();
  // });

  // it('should not debounce updates when debounceTime = 0', () => {
  //   const { result } = renderHook(() => useObjectState({ name: 'Alice' }, 0));

  //   act(() => {
  //     result.current.set({ name: 'Bob' });
  //   });

  //   expect(result.current.value).toEqual({ name: 'Bob' });
  //   expect(result.current.debouncedValue).toBeNull();
  // });

  // it('should cancel debounce on unmount', () => {
  //   const { unmount } = renderHook(() =>
  //     useObjectState({ name: 'Alice' }, 300)
  //   );

  //   unmount();

  //   expect(debounce().cancel).toHaveBeenCalled();
  // });
});
