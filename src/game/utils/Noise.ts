import SimplexNoise from "simplex-noise";
import { Coord } from "../Coord";

export class Noise {
  private noise: SimplexNoise;

  constructor(seed?: string | number) {
    this.noise = new SimplexNoise(seed);
  }

  // Gives number between -1..1
  noise2D(x: number, y: number): number {
    return this.noise.noise2D(x, y);
  }

  // Gives number between -1..1
  noise1D(x: number): number {
    return this.noise.noise2D(x, 1);
  }

  // Gives number between 0..1 like the builtin Math.random()
  random(x: number): number {
    return (this.noise1D(x) + 1) / 2;
  }

  // Produces a random coordinate where x,y are values between -1..1
  coord(n: number): Coord {
    const x = this.noise.noise2D(n, 1);
    const y = this.noise.noise2D(1, n);
    return [x, y];
  }
}
