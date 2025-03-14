import { renderHook, act } from '@testing-library/react';
import { useBoolState } from '..'; // Adjust the import path if needed

describe('useBoolState', () => {
  it('should initialize with default value (false)', () => {
    const { result } = renderHook(() => useBoolState());
    expect(result.current.value).toBe(false);
    expect(result.current.isFalse).toBe(true);
    expect(result.current.isTrue).toBe(false);
  });

  it('should initialize with a provided initial value (true)', () => {
    const { result } = renderHook(() => useBoolState(true));
    expect(result.current.value).toBe(true);
    expect(result.current.isFalse).toBe(false);
    expect(result.current.isTrue).toBe(true);
  });

  it('should toggle value', () => {
    const { result } = renderHook(() => useBoolState());

    act(() => {
      result.current.toggle();
    });

    expect(result.current.value).toBe(true);
    expect(result.current.isTrue).toBe(true);
    expect(result.current.isFalse).toBe(false);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.value).toBe(false);
    expect(result.current.isTrue).toBe(false);
    expect(result.current.isFalse).toBe(true);
  });

  it('should set value to true', () => {
    const { result } = renderHook(() => useBoolState());

    act(() => {
      result.current.setTrue();
    });

    expect(result.current.value).toBe(true);
    expect(result.current.isTrue).toBe(true);
    expect(result.current.isFalse).toBe(false);
  });

  it('should set value to false', () => {
    const { result } = renderHook(() => useBoolState(true));

    act(() => {
      result.current.setFalse();
    });

    expect(result.current.value).toBe(false);
    expect(result.current.isTrue).toBe(false);
    expect(result.current.isFalse).toBe(true);
  });

  it('should reset to initial value', () => {
    const { result } = renderHook(() => useBoolState(true));

    act(() => {
      result.current.setFalse();
    });

    expect(result.current.value).toBe(false);

    act(() => {
      result.current.reset();
    });

    expect(result.current.value).toBe(true);
  });

  it('should allow direct state setting', () => {
    const { result } = renderHook(() => useBoolState());

    act(() => {
      result.current.set(true);
    });

    expect(result.current.value).toBe(true);

    act(() => {
      result.current.set(false);
    });

    expect(result.current.value).toBe(false);
  });

  it('should initialize with default props values', () => {
    const { result } = renderHook(() =>
      useBoolState(false, {
        props: {
          buttonLabel: ['On', 'Off'],
          className: ['btn-on', 'btn-off'],
        },
      })
    );

    expect(result.current.props.buttonLabel).toBe('Off');
    expect(result.current.props.className).toBe('btn-off');
  });

  it('should update props values when state changes', () => {
    const { result } = renderHook(() =>
      useBoolState(false, {
        props: {
          buttonLabel: ['On', 'Off'],
          className: ['btn-on', 'btn-off'],
        },
      })
    );

    act(() => {
      result.current.toggle();
    });

    expect(result.current.props.buttonLabel).toBe('On');
    expect(result.current.props.className).toBe('btn-on');
  });

  it('should handle complex prop structures', () => {
    const { result } = renderHook(() =>
      useBoolState(false, {
        props: {
          styles: [{ color: 'green' }, { color: 'red' }],
        },
      })
    );

    expect(result.current.props.styles).toEqual({ color: 'red' });

    act(() => {
      result.current.toggle();
    });

    expect(result.current.props.styles).toEqual({ color: 'green' });
  });
});
