import { renderHook, act } from '@testing-library/react';
import { useArrayState } from './useArrayState'; // Adjust the import path if needed

describe('useArrayState', () => {
  it('should initialize with an empty array by default', () => {
    const { result } = renderHook(() => useArrayState());

    expect(result.current.value).toEqual([]);
  });

  it('should initialize with a given array', () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));

    expect(result.current.value).toEqual([1, 2, 3]);
  });

  it('should update the array using set', () => {
    const { result } = renderHook(() => useArrayState<number>());

    act(() => {
      result.current.set([10, 20, 30]);
    });

    expect(result.current.value).toEqual([10, 20, 30]);
  });

  it('should push an item to the array', () => {
    const { result } = renderHook(() => useArrayState<number>());

    act(() => {
      result.current.push(5);
    });

    expect(result.current.value).toEqual([5]);

    act(() => {
      result.current.push(10);
    });

    expect(result.current.value).toEqual([5, 10]);
  });

  it('should pop an item from the array', () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));

    act(() => {
      result.current.pop();
    });

    expect(result.current.value).toEqual([1, 2]);

    act(() => {
      result.current.pop();
    });

    expect(result.current.value).toEqual([1]);
  });

  it('should clear the array', () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));

    act(() => {
      result.current.clear();
    });

    expect(result.current.value).toEqual([]);
  });

  it('should reset to the initial value', () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));

    act(() => {
      result.current.set([4, 5, 6]);
    });

    expect(result.current.value).toEqual([4, 5, 6]);

    act(() => {
      result.current.reset();
    });

    expect(result.current.value).toEqual([1, 2, 3]);
  });

  it('should remove a simple item from the array', () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));

    act(() => {
      result.current.remove(2);
    });

    expect(result.current.value).toEqual([1, 3]);
  });

  it('should not remove an object item without exact match using default deep comparison', () => {
    const { result } = renderHook(() =>
      useArrayState([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ])
    );

    act(() => {
      result.current.remove({ id: 2 });
    });

    expect(result.current.value).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
  });

  it('should remove an object item without custom comparator using default deep comparison', () => {
    const { result } = renderHook(() =>
      useArrayState(
        [
          { id: 1, name: 'Alice' },
          { id: 2, name: 'Bob' },
        ],
        {
          isEqual: (entry, comparisonItem) => entry.id === comparisonItem.id,
        }
      )
    );

    act(() => {
      result.current.remove({ id: 2 });
    });

    expect(result.current.value).toEqual([{ id: 1, name: 'Alice' }]);
  });

  it('should toggle an item in the array', () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));

    act(() => {
      result.current.toggle(2);
    });

    expect(result.current.value).toEqual([1, 3]);

    act(() => {
      result.current.toggle(2);
    });

    expect(result.current.value).toEqual([1, 3, 2]);
  });

  it('should toggle an object item using deep comparison', () => {
    const { result } = renderHook(() =>
      useArrayState([{ id: 1, name: 'Alice' }])
    );

    act(() => {
      result.current.toggle({ id: 2, name: 'Bob' });
    });

    expect(result.current.value).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);

    act(() => {
      result.current.toggle({ id: 2, name: 'Bob' });
    });

    expect(result.current.value).toEqual([{ id: 1, name: 'Alice' }]);
  });

  it('should check if an item is included', () => {
    const { result } = renderHook(() => useArrayState([1, 2, 3]));

    expect(result.current.includes(2)).toBe(true);
    expect(result.current.includes(4)).toBe(false);
  });

  it('should check if an object is included using deep comparison', () => {
    const { result } = renderHook(() =>
      useArrayState([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ])
    );

    expect(result.current.includes({ id: 2, name: 'Bob' })).toBe(true);
    expect(result.current.includes({ id: 3, name: 'Charlie' })).toBe(false);
  });
});
