import { Sprite } from "./Sprite";
import { SpriteSheet } from "./SpriteSheet";

interface AnimationConfig {
  ticksPerFrame?: number;
  currentFrame?: number;
}

// An animated sprite
export class SpriteAnimation {
  private ticks = 0;
  private ticksPerFrame = 1;
  private currentFrame = 0;
  private finished = false;

  constructor(private spriteSheet: SpriteSheet, cfg: AnimationConfig = {}) {
    this.ticksPerFrame = cfg.ticksPerFrame ?? 1;
    this.currentFrame = cfg.currentFrame ?? 0;
  }

  getSprite(): Sprite {
    return this.spriteSheet.getSprite([0, this.currentFrame]);
  }

  tick() {
    this.ticks++;
    if (this.ticks >= this.ticksPerFrame) {
      this.ticks = 0;
      this.nextFrame();
    }
  }

  getFrame(): number {
    return this.currentFrame;
  }

  nextFrame() {
    this.setFrame(this.currentFrame + 1);
    if (!this.finished && this.currentFrame === 0) {
      this.finished = true;
    }
  }

  setFrame(n: number) {
    this.currentFrame = n % this.spriteSheet.getCount();
  }

  isFinished(): boolean {
    return this.finished;
  }
}
