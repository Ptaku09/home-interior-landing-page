import '@testing-library/jest-dom';
import { act, renderHook } from '../test-utils';
import useLockScroll from '../../hooks/useLockScroll';

describe('useLockScroll hook', () => {
  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('should render', () => {
    const { result } = renderHook(() => useLockScroll());

    expect(result.current).toEqual({ lockScroll: expect.any(Function), unlockScroll: expect.any(Function) });
  });

  it('should lock scroll', () => {
    const { result } = renderHook(() => useLockScroll());

    act(() => {
      result.current.lockScroll();
    });

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should unlock scroll', () => {
    const { result } = renderHook(() => useLockScroll());

    act(() => {
      result.current.lockScroll();
    });

    expect(document.body.style.overflow).toBe('hidden');

    act(() => {
      result.current.unlockScroll();
    });

    expect(document.body.style.overflow).toBe('auto');
  });
});
