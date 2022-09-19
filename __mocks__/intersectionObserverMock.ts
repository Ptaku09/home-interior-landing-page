const intersectionObserverMock = () => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
});

window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);
export {};
