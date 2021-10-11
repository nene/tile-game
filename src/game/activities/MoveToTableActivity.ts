import { Coord, coordAdd } from "../Coord";
import { Table } from "../furniture/Table";
import { GameObject } from "../GameObject";
import { GameWorld } from "../GameWorld";
import { Character } from "../npc/Character";
import { Activity, ActivityUpdates } from "./Activity";
import { MoveActivity } from "./MoveActivity";

export class MoveToTableActivity implements Activity {
  private targetCoord?: Coord;

  constructor(private character: Character) {
  }

  public tick(figure: GameObject, world: GameWorld): ActivityUpdates {
    const table = world.allObjects().find((o) => o instanceof Table) as Table;
    const chairOffset = coordAdd([8, -8], [this.character.chairIndex * 16, 0]);
    this.targetCoord = coordAdd(table.getCoord(), chairOffset);
    return {};
  }

  public isFinished() {
    return Boolean(this.targetCoord);
  }

  isInteractable() {
    return false;
  }

  interact() { }

  nextActivity() {
    if (this.targetCoord) {
      return new MoveActivity(this.targetCoord, this.character);
    }
  }
}
