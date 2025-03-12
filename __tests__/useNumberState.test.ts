import { renderHook, act } from '@testing-library/react';
import { useNumberState } from '..'; // Adjust the import path if needed

describe('useNumberState', () => {
  it('should initialize with default value (0)', () => {
    const { result } = renderHook(() => useNumberState());

    expect(result.current.value).toBe(0);
  });

  it('should initialize with a provided initial value', () => {
    const { result } = renderHook(() => useNumberState(10));

    expect(result.current.value).toBe(10);
  });

  it('should update the value using set', () => {
    const { result } = renderHook(() => useNumberState(5));

    act(() => {
      result.current.set(20);
    });

    expect(result.current.value).toBe(20);
  });

  it('should increment by 1 when no step is provided', () => {
    const { result } = renderHook(() => useNumberState(5));

    act(() => {
      result.current.increment();
    });

    expect(result.current.value).toBe(6);
  });

  it('should increment by a given step', () => {
    const { result } = renderHook(() => useNumberState(5));

    act(() => {
      result.current.increment(3);
    });

    expect(result.current.value).toBe(8);
  });

  it('should decrement by 1 when no step is provided', () => {
    const { result } = renderHook(() => useNumberState(5));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.value).toBe(4);
  });

  it('should decrement by a given step', () => {
    const { result } = renderHook(() => useNumberState(10));

    act(() => {
      result.current.decrement(4);
    });

    expect(result.current.value).toBe(6);
  });

  it('should reset to initial value', () => {
    const { result } = renderHook(() => useNumberState(10));

    act(() => {
      result.current.increment(5);
    });

    expect(result.current.value).toBe(15);

    act(() => {
      result.current.reset();
    });

    expect(result.current.value).toBe(10);
  });
});
