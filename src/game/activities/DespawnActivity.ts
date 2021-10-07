import { GameObject } from "../GameObject";
import { GameWorld } from "../GameWorld";
import { Character } from "../npc/Character";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Activity, ActivityUpdates } from "./Activity";

export class DespawnActivity implements Activity {
  private sprite: Sprite;
  private removed = false;

  constructor(private character: Character) {
    this.sprite = SpriteLibrary.get(character.spriteSet).getSprite([0, 0]);
  }

  public tick(bursh: GameObject, world: GameWorld): ActivityUpdates {
    world.remove(bursh);
    this.removed = true;

    return { sprites: [this.sprite] };
  }

  public isFinished() {
    return this.removed;
  }

  interact() { }

  nextActivity() {
    return undefined;
  }
}
