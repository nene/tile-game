import { Coord, coordEq, Rect, rectTranslate } from "../Coord";
import { isTable, Table } from "../furniture/Table";
import { Location } from "../locations/Location";
import { AcademicCharacter } from "../npc/AcademicCharacter";
import { CharacterFigure, isCharacterFigure } from "../npc/CharacterFigure";
import { Activity, ActivityUpdates } from "./Activity";
import { ContinuationActivity } from "./ContinuationActivity";
import { MoveActivity } from "./MoveActivity";
import { PauseActivity } from "./PauseActivity";

export class MoveToTableActivity implements Activity {
  private finished = false;
  private targetCoord?: Coord;

  constructor(private character: AcademicCharacter) {
  }

  tick(figure: CharacterFigure, location: Location): ActivityUpdates {
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

  private isAtTable(figure: CharacterFigure, table: Table): boolean {
    return table.getSittingPositions().some((coord) => coordEq(figure.getCoord(), coord));
  }

  private isOccupied(rect: Rect, figure: CharacterFigure, location: Location): boolean {
    return location.getObjectsInRect(rect).some((obj) => isCharacterFigure(obj) && obj !== figure);
  }

  private getFirstFreeSpot(figure: CharacterFigure, table: Table, location: Location): Coord | undefined {
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
      return new ContinuationActivity(
        new PauseActivity(Math.floor(Math.random() * 10), this.character),
        new ContinuationActivity(
          new MoveActivity(this.targetCoord, this.character),
          new MoveToTableActivity(this.character),
        )
      );
    }
  }
}
