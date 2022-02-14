import { constrain } from "../utils/constrain";

interface CounterAnimationConfig {
  ticksPerFrame: number;
  total: number;
}

export class CounterAnimation {
  private ticks = 0;

  constructor(private cfg: CounterAnimationConfig) {
  }

  tick() {
    this.ticks++;
  }

  getCount() {
    return constrain(Math.floor(this.ticks / this.cfg.ticksPerFrame), { min: 0, max: this.cfg.total });
  }
}
