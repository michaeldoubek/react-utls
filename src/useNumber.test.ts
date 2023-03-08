import {act, renderHook} from '@testing-library/react';
import useNumber from './useNumber';

describe('useNumber', () => {
  it('should return a tuple of [value, increment, decrement, set]', () => {
    const {result} = renderHook(() => useNumber());

    expect(result.current).toStrictEqual([
      0,
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
    ]);
  });

  it('should change value when calling increment', () => {
    const {result} = renderHook(() => useNumber());
    const increment = result.current[1];

    act(() => increment());

    expect(result.current[0]).toBe(1);

    act(() => increment());

    expect(result.current[0]).toBe(2);
  });

  it('should change value when calling decrement', () => {
    const {result} = renderHook(() => useNumber());
    const decrement = result.current[2];

    act(() => decrement());

    expect(result.current[0]).toBe(-1);

    act(() => decrement());

    expect(result.current[0]).toBe(-2);
  });

  it('should change value when calling set', () => {
    const {result} = renderHook(() => useNumber());
    const set = result.current[3];

    act(() => set(10));

    expect(result.current[0]).toBe(10);

    act(() => set(20));

    expect(result.current[0]).toBe(20);
  });

  it('should use initial value', () => {
    const {result} = renderHook(() => useNumber(10));

    expect(result.current[0]).toBe(10);
  });
});
