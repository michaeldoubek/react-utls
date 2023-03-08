import {act, renderHook} from '@testing-library/react';
import useBoolean from './useBoolean';

describe('useBoolean', () => {
  it('should return a tuple of [value, on, off, toggle]', () => {
    const {result} = renderHook(() => useBoolean());

    // [value, on, off, toggle], explicitly [false, () => void, () => void, () => void] expected.
    expect(result.current).toEqual([
      false,
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
    ]);
  });

  it('should change value when calling on', () => {
    const {result} = renderHook(() => useBoolean());
    const on = result.current[1];

    act(() => on());

    // expect value to be true now.
    expect(result.current[0]).toBe(true);

    act(() => on());

    // expect value to stay true.
    expect(result.current[0]).toBe(true);
  });

  it('should change value when calling off', () => {
    const {result} = renderHook(() => useBoolean(true));
    const off = result.current[2];

    act(() => off());

    // expect value to be false now.
    expect(result.current[0]).toBe(false);

    act(() => off());

    // expect value to stay false.
    expect(result.current[0]).toBe(false);
  });

  it('should change value when calling toggle', () => {
    const {result} = renderHook(() => useBoolean());
    const toggle = result.current[3];

    act(() => toggle());

    // expect value to be true now.
    expect(result.current[0]).toBe(true);

    act(() => toggle());

    // expect value to be false now.
    expect(result.current[0]).toBe(false);
  });

  it('should use initial value', () => {
    const {result} = renderHook(() => useBoolean(true));

    expect(result.current[0]).toBe(true);
  });
});
