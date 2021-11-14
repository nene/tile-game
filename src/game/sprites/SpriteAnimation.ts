import { Coord } from "../Coord";
import { Animation } from "./Animation";
import { Sprite } from "./Sprite";
import { SpriteSheet } from "./SpriteSheet";

interface AnimationConfig {
  frames: Coord[] | FrameRange;
  ticksPerFrame?: number;
  currentFrame?: number;
  repeat?: number;
}

interface FrameRange {
  from: Coord;
  to: Coord;
}

// An animated sprite
export class SpriteAnimation implements Animation {
  private frames: Coord[];
  private ticks = 0;
  private ticksPerFrame = 1;
  private currentFrame = 0;
  private repeat: number;
  private cycles = 0;

  constructor(private spriteSheet: SpriteSheet, cfg: AnimationConfig) {
    this.frames = cfg.frames instanceof Array ? cfg.frames : expandFrameRange(cfg.frames);
    this.repeat = cfg.repeat ?? Infinity;
    this.ticksPerFrame = cfg.ticksPerFrame ?? 1;
    this.currentFrame = cfg.currentFrame ?? 0;
  }

  public getSprites(): Sprite[] {
    return [this.spriteSheet.getSprite(this.frames[this.currentFrame])];
  }

  public tick() {
    this.ticks++;
    if (this.ticks >= this.ticksPerFrame) {
      this.ticks = 0;
      this.nextFrame();
    }
  }

  public getFrame(): number {
    return this.currentFrame;
  }

  private nextFrame() {
    const previousFrame = this.currentFrame;
    this.setFrame(this.currentFrame + 1);
    if (this.currentFrame <= previousFrame) {
      this.cycles++;
    }
  }

  public setFrame(n: number) {
    this.currentFrame = n % this.frames.length;
  }

  public isFinished(): boolean {
    return this.cycles >= this.repeat;
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
