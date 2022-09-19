import '@testing-library/jest-dom';
import useOnScreen from '../../hooks/useOnScreen';
import { act, render, renderHook } from '../test-utils';
import { createRef } from 'react';
import { mockIntersection } from '../../__mocks__/intersectionObserverTestHelper';
import { screen } from '@testing-library/dom';

const TestComponent = () => {
  const ref = createRef<HTMLDivElement>();
  const isOnScreen = useOnScreen(ref);

  return (
    <div>
      <div data-testid="wrapper" ref={ref} />
      {isOnScreen ? 'true' : 'false'}
    </div>
  );
};

describe('useOnScreen hook', () => {
  it('should render', () => {
    const ref = createRef<null>();
    const { result } = renderHook(() => useOnScreen(ref));

    expect(result.current).toEqual(false);
  });

  it('detects if element is on screen', () => {
    render(<TestComponent />);
    expect(document.body.textContent).toBe('false');

    act(() => {
      mockIntersection(screen.getByTestId('wrapper'), true);
    });

    expect(document.body.textContent).toBe('true');

    act(() => {
      mockIntersection(screen.getByTestId('wrapper'), false);
    });

    expect(document.body.textContent).toBe('false');
  });
});
