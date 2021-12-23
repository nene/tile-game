import { Animation } from "../sprites/Animation";
import { CompositeAnimation } from "../sprites/CompositeAnimation";
import { SpriteAnimation } from "../sprites/SpriteAnimation";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Facing } from "./PlayerDirection";

export type PlayerAnimationType = 'stand' | 'walk' | 'drunk';

export class PlayerAnimationLibrary {
  private standAnimations: Record<Facing, SpriteAnimation>;
  private walkAnimations: Record<Facing, SpriteAnimation>;
  private drunkAnimation: Animation;
  private sleepAnimation: Animation;

  constructor() {
    this.standAnimations = {
      down: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), {
        frames: [
          { coord: [0, 6], ticks: 8 },
          { coord: [1, 6], ticks: 8 },
          { coord: [2, 6], ticks: 8 },
          { coord: [3, 6], ticks: 1 },
          { coord: [4, 6], ticks: 8 },
          { coord: [5, 6], ticks: 1 },
          { coord: [6, 6], ticks: 1 },
          { coord: [7, 6], ticks: 1 },
          { coord: [8, 6], ticks: 8 },
        ]
      }),
      up: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: [[3, 0]] }),
      right: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: [[5, 0]] }),
      left: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: [[4, 0]] }),
    }

    this.walkAnimations = {
      down: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: { from: [0, 3], to: [7, 3] } }),
      up: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: { from: [0, 4], to: [7, 4] } }),
      right: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: { from: [0, 1], to: [7, 1] } }),
      left: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: { from: [0, 2], to: [7, 2] } }),
    };

    this.drunkAnimation = this.createDrunkAnimation();

    this.sleepAnimation = new CompositeAnimation([
      this.createDrunkAnimation(1),
      new SpriteAnimation(SpriteLibrary.get("cfe-reb-drunk"), {
        frames: [
          [0, 1],
          [1, 1],
          [2, 1],
          [3, 1],
        ],
        ticksPerFrame: 3,
      }),
    ]);
  }

  private createDrunkAnimation(repeat?: number): Animation {
    return new SpriteAnimation(SpriteLibrary.get("cfe-reb-drunk"), {
      frames: [
        [2, 0],
        [3, 0],
        [4, 0],
        [3, 0],
        [2, 0],
        [1, 0],
        [0, 0],
        [1, 0],
      ],
      ticksPerFrame: 2,
      repeat,
    });
  }

  getStanding(facing: Facing, frame: number = 0): Animation {
    return resetFrame(this.standAnimations[facing]);
  }

  getWalking(facing: Facing, frame: number = 0): Animation {
    return this.walkAnimations[facing];
  }

  getDrunk(): Animation {
    return this.drunkAnimation;
  }

  getSleep(): Animation {
    return this.sleepAnimation;
  }
}

function resetFrame(animation: SpriteAnimation): SpriteAnimation {
  animation.setFrame(0);
  return animation;
}
