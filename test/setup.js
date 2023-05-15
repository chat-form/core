import '@testing-library/jest-dom'

jest
  .spyOn(HTMLCanvasElement.prototype, 'getContext')
  .mockImplementation(() => {})

HTMLElement.prototype.getAnimations = () => []

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node) => node,
}))
