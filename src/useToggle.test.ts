import {act, renderHook} from '@testing-library/react';
import useToggle from './useToggle';

describe('useToggle', () => {
  it('should return a tuple of [value, toggle]', () => {
    const {result} = renderHook(() => useToggle());

    // [value, toggle], explicitly [false, () => void] expected.
    expect(result.current).toEqual([false, expect.any(Function)]);
  });

  it('should change value when calling toggle', () => {
    const {result} = renderHook(() => useToggle());
    const toggle = result.current[1];

    act(() => toggle());

    // expect value to be true now.
    expect(result.current[0]).toBe(true);

    act(() => toggle());

    // expect value to be false now.
    expect(result.current[0]).toBe(false);
  });

  it('should use initial value', () => {
    const {result} = renderHook(() => useToggle(true));

    expect(result.current[0]).toBe(true);
  });
});
