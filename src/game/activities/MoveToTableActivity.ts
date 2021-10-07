import { Coord, coordAdd } from "../Coord";
import { Table } from "../furniture/Table";
import { GameObject } from "../GameObject";
import { GameWorld } from "../GameWorld";
import { Character } from "../npc/Character";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Activity, ActivityUpdates } from "./Activity";
import { MoveActivity } from "./MoveActivity";

export class MoveToTableActivity implements Activity {
  private sprite: Sprite;
  private targetCoord?: Coord;

  constructor(private character: Character) {
    this.sprite = SpriteLibrary.get(character.spriteSet).getSprite([0, 0]);
  }

  public tick(entity: GameObject, world: GameWorld): ActivityUpdates {
    const table = world.allObjects().find((o) => o instanceof Table) as Table;
    const chairOffset = coordAdd([8, -8], [this.character.chairIndex * 16, 0]);
    this.targetCoord = coordAdd(table.getCoord(), chairOffset);

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
