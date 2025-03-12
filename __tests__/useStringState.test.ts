import { renderHook, act } from '@testing-library/react';
import { useStringState } from '..'; // Adjust the import path if needed

describe('useStringState', () => {
  it('should initialize with default value (empty string)', () => {
    const { result } = renderHook(() => useStringState());

    expect(result.current.value).toBe('');
  });

  it('should initialize with a provided initial value', () => {
    const { result } = renderHook(() => useStringState('Hello'));

    expect(result.current.value).toBe('Hello');
  });

  it('should update the value using set', () => {
    const { result } = renderHook(() => useStringState());

    act(() => {
      result.current.set('Test String');
    });

    expect(result.current.value).toBe('Test String');
  });

  it('should clear the value', () => {
    const { result } = renderHook(() => useStringState('Initial'));

    act(() => {
      result.current.clear();
    });

    expect(result.current.value).toBe('');
  });

  it('should reset to initial value', () => {
    const { result } = renderHook(() => useStringState('Original'));

    act(() => {
      result.current.set('Changed');
    });

    expect(result.current.value).toBe('Changed');

    act(() => {
      result.current.reset();
    });

    expect(result.current.value).toBe('Original');
  });

  it('should update value via onChange event', () => {
    const { result } = renderHook(() => useStringState(''));

    const event = {
      target: { value: 'New Value' },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.onChange(event);
    });

    expect(result.current.value).toBe('New Value');
  });
});
