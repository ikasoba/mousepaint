export const useFrame = (
  fn: (i: number, next: () => void) => void
): (() => void) => {
  let i = 0,
    next = () => void requestAnimationFrame(() => fn(i++, next));

  fn(i++, next);

  return () => (next = () => {});
};

export const createCanvas = (
  width: number,
  height: number
): HTMLCanvasElement => {
  const canvas = document.createElement("canvas");

  canvas.width = width ?? 640;
  canvas.height = height ?? 480;

  return canvas;
};
