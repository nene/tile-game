import { Coord } from "./Coord";

export function createOffScreenCanvas([width, height]: Coord): CanvasRenderingContext2D {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Unable to access Canvas context");
  }
  return ctx;
}
