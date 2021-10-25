import { Coord, coordEq, Rect, rectTranslate } from "../Coord";
import { Table } from "../furniture/Table";
import { GameObject } from "../GameObject";
import { Location } from "../locations/Location";
import { Character } from "../npc/Character";
import { CharacterFigure } from "../npc/CharacterFigure";
import { Activity, ActivityUpdates } from "./Activity";
import { MoveActivity } from "./MoveActivity";

export class MoveToTableActivity implements Activity {
  private finished = false;
  private targetCoord?: Coord;

  constructor(private character: Character) {
  }

  tick(figure: GameObject, location: Location): ActivityUpdates {
    const figureBounds = rectTranslate(figure.boundingBox(), figure.getCoord());
    const allTables = location.allObjects().filter(isTable);

    // Are we already sitting in one of the tables. If yes, then finish.
    for (const table of allTables) {
      if (this.isAtTable(figure, table) && !this.isOccupied(figureBounds, figure, location)) {
        this.finished = true;
        return {};
      }
    }

    // Otherwise try to sit in the first free spot in the first table
    for (const table of allTables) {
      this.targetCoord = this.getFirstFreeSpot(figure, table, location);
      if (this.targetCoord) {
        return {};
      }
    }
    return {};
  }

  private isAtTable(figure: GameObject, table: Table): boolean {
    return table.getSittingPositions().some((coord) => coordEq(figure.getCoord(), coord));
  }

  private isOccupied(rect: Rect, figure: GameObject, location: Location): boolean {
    return location.getObjectsInRect(rect).some((obj) => obj instanceof CharacterFigure && obj !== figure);
  }

  private getFirstFreeSpot(figure: GameObject, table: Table, location: Location): Coord | undefined {
    return table.getSittingPositions().find((coord) => !this.isOccupied(rectTranslate(figure.boundingBox(), coord), figure, location));
  }

  isFinished() {
    return Boolean(this.targetCoord) || this.finished;
  }

  isInteractable() {
    return false;
  }

  interact() { }

  nextActivity(): Activity | undefined {
    if (this.targetCoord) {
      // After reaching the destination, check if we reached a proper spot at the table
      // When not, we'll move again.
      return new MoveActivity(this.targetCoord, this.character, new MoveToTableActivity(this.character));
    }
  }
}

const isTable = (obj: GameObject): obj is Table => obj instanceof Table;
