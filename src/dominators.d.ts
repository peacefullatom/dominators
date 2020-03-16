export {};

declare global {
  interface Window {
    mozRequestAnimationFrame: (callback: FrameRequestCallback) => number;
    requestAnimFrame: ((callback: FrameRequestCallback) => number) &
      ((callback: FrameRequestCallback) => number);
  }
}
