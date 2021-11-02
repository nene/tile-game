export interface Constraints {
  min: number;
  max: number;
}

export function constrain(x: number, { min, max }: Constraints): number {
  return Math.max(min, Math.min(max, x));
}
