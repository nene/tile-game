import { Animation } from "../sprites/Animation";
import { CompositeAnimation } from "../sprites/CompositeAnimation";
import { SpriteAnimation } from "../sprites/SpriteAnimation";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Facing } from "./PlayerDirection";
import cfeRebJson from "../sprites/data/cfe-reb.json";
import { readAsepriteAnimation } from "../sprites/readAsepriteAnimation";

export type PlayerAnimationType = 'stand' | 'walk' | 'drunk';

export class PlayerAnimationLibrary {
  private standAnimations: Record<Facing, SpriteAnimation>;
  private walkAnimations: Record<Facing, SpriteAnimation>;
  private drunkAnimation: Animation;
  private sleepAnimation: Animation;

  constructor() {
    this.standAnimations = {
      down: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), {
        frames: readAsepriteAnimation("idle", cfeRebJson),
      }),
      up: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), {
        frames: [readAsepriteAnimation("base", cfeRebJson)[3]],
      }),
      right: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), {
        frames: [readAsepriteAnimation("base", cfeRebJson)[5]],
      }),
      left: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), {
        frames: [readAsepriteAnimation("base", cfeRebJson)[4]],
      }),
    }

    this.walkAnimations = {
      down: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), {
        frames: readAsepriteAnimation("w-forward", cfeRebJson),
      }),
      up: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), {
        frames: readAsepriteAnimation("w-back", cfeRebJson),
      }),
      right: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), {
        frames: readAsepriteAnimation("w-right", cfeRebJson),
      }),
      left: new SpriteAnimation(SpriteLibrary.get("cfe-reb"), {
        frames: readAsepriteAnimation("w-left", cfeRebJson),
      }),
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
