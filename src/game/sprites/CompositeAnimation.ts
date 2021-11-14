import { constrain } from "../utils/constrain";
import { Animation } from "./Animation";
import { Sprite } from "./Sprite";

export class CompositeAnimation implements Animation {
  private current = 0;

  constructor(private animations: Animation[]) {
    if (this.animations.length === 0) {
      throw new Error("At least one Animation expected");
    }
  }

  public getSprites(): Sprite[] {
    return this.currentAnimation().getSprites();
  }

  public tick() {
    this.currentAnimation().tick();
    if (this.currentAnimation().isFinished()) {
      this.current = constrain(this.current + 1, { min: 0, max: this.animations.length - 1 });
    }
  }

  private currentAnimation() {
    return this.animations[this.current];
  }

  public isFinished(): boolean {
    return this.isLastAnimation() && this.currentAnimation().isFinished();
  }

  private isLastAnimation() {
    return this.current === this.animations.length - 1;
  }
}
