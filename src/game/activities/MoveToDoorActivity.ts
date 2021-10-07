import { Coord, coordAdd } from "../Coord";
import { Door } from "../furniture/Door";
import { GameWorld } from "../GameWorld";
import { Character } from "../npc/Character";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Activity, ActivityUpdates } from "./Activity";
import { MoveActivity } from "./MoveActivity";

export class MoveToDoorActivity implements Activity {
  private sprite: Sprite;
  private targetCoord?: Coord;

  constructor(private character: Character) {
    this.sprite = SpriteLibrary.get(character.spriteSet).getSprite([0, 0]);
  }

  public tick(coord: Coord, world: GameWorld): ActivityUpdates {
    const door = world.allObjects().find((o) => o instanceof Door) as Door;
    this.targetCoord = coordAdd(door.getCoord(), [8, 8]);

    return { sprites: [this.sprite] };
  }

  public isFinished() {
    return Boolean(this.targetCoord);
  }

  interact() { }

  nextActivity() {
    if (this.targetCoord) {
      return new MoveActivity(this.targetCoord, this.character);
    }
  }
}
