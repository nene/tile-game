import { Coord } from "./Coord";
import { Sprite } from "./Sprite";
import { SpriteSheet } from "./SpriteSheet";

interface AnimationConfig {
  frames: Coord[] | FrameRange;
  ticksPerFrame?: number;
  currentFrame?: number;
}

interface FrameRange {
  from: Coord;
  to: Coord;
}

// An animated sprite
export class SpriteAnimation {
  private frames: Coord[];
  private ticks = 0;
  private ticksPerFrame = 1;
  private currentFrame = 0;
  private finished = false;

  constructor(private spriteSheet: SpriteSheet, cfg: AnimationConfig) {
    this.frames = cfg.frames instanceof Array ? cfg.frames : expandFrameRange(cfg.frames);
    this.ticksPerFrame = cfg.ticksPerFrame ?? 1;
    this.currentFrame = cfg.currentFrame ?? 0;
  }

  getSprite(): Sprite {
    return this.spriteSheet.getSprite(this.frames[this.currentFrame]);
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
    this.currentFrame = n % this.frames.length;
  }

  isFinished(): boolean {
    return this.finished;
  }
}

function expandFrameRange({ from, to }: FrameRange): Coord[] {
  const frames: Coord[] = [];
  for (let y = from[1]; y <= to[1]; y++) {
    for (let x = from[0]; x <= to[0]; x++) {
      frames.push([x, y]);
    }
  }
  return frames;
}
