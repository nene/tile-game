import { Animation } from "../sprites/Animation";
import { SpriteAnimation } from "../sprites/SpriteAnimation";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Facing } from "./PlayerDirection";

export type PlayerAnimationType = 'stand' | 'walk' | 'drunk';

export class PlayerAnimationLibrary {
  private standAnimations: Record<Facing, SpriteAnimation>;
  private walkAnimations: Record<Facing, SpriteAnimation>;
  private drunkAnimation: SpriteAnimation;
  private sleepAnimation: SpriteAnimation;

  constructor() {
    this.standAnimations = {
      down: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: [[0, 0]] }),
      up: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: [[3, 0]] }),
      right: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: [[5, 0]] }),
      left: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: [[4, 0]] }),
    }

    this.walkAnimations = {
      down: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: { from: [0, 0], to: [0, 0] } }),
      up: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: { from: [3, 0], to: [3, 0] } }),
      right: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: { from: [5, 0], to: [5, 0] } }),
      left: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), { frames: { from: [4, 0], to: [4, 0] } }),
    };

    this.drunkAnimation = new SpriteAnimation(SpriteLibrary.get("cfe-reb-drunk"), {
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
    });

    this.sleepAnimation = new SpriteAnimation(SpriteLibrary.get("cfe-reb-drunk"), {
      frames: [
        [0, 1],
        [1, 1],
        [2, 1],
        [3, 1],
      ],
      ticksPerFrame: 2,
    });
  }

  getStanding(facing: Facing, frame: number = 0): Animation {
    return this.standAnimations[facing];
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
