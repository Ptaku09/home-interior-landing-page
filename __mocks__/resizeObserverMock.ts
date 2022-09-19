const resizeObserverMock = () => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
});

window.ResizeObserver = jest.fn().mockImplementation(resizeObserverMock);

export {};
