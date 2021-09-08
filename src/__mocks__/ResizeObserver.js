class ResizeObserver {
  disconnect() {
    return jest.fn();
  }
  observe() {
    return jest.fn();
  }
  unobserve() {
    return jest.fn();
  }
}
window.ResizeObserver = ResizeObserver;
export default ResizeObserver;
