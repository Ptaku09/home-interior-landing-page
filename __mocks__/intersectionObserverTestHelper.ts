const observerMap = new Map();
const instanceMap = new Map();

beforeAll(() => {
  // @ts-ignore
  window.IntersectionObserver = jest.fn((callback, options) => {
    const instance = {
      threshold: Array.isArray(options?.threshold) ? options?.threshold : [options?.threshold],
      root: options?.root,
      rootMargin: options?.rootMargin,
      observe: jest.fn((element: Element) => {
        instanceMap.set(element, instance);
        observerMap.set(element, callback);
      }),
      unobserve: jest.fn((element: Element) => {
        instanceMap.delete(element);
        observerMap.delete(element);
      }),
      disconnect: jest.fn(),
    };

    return instance;
  });
});

afterEach(() => {
  // @ts-ignore
  window.IntersectionObserver.mockReset();
  observerMap.clear();
  instanceMap.clear();
});

export const mockIntersection = (element: Element, isIntersecting: boolean) => {
  const callback = observerMap.get(element);

  if (callback) {
    callback([{ target: element, isIntersecting, intersectionRatio: isIntersecting ? 1 : -1 }]);
  }
};
