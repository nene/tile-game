import { Coord, Rect, rectTranslate } from "../../Coord";
import { Wall } from "../../furniture/Wall";
import { GameObject } from "../../GameObject";
import { Building } from "./Building";

export class CfeBuilding implements Building {
  constructor(private offset: Coord) {
  }

  getWalls(): GameObject[] {
    const relativeWallLocations: Rect[] = [
      { coord: [1, 62], size: [18, 77] }, // left wing
      { coord: [19, 62], size: [40, 101] }, // tower
      { coord: [24, 163], size: [30, 5] }, // tower bottom
      { coord: [59, 62], size: [58, 102] }, // middle section
      { coord: [117, 62], size: [76, 102] }, // large main section
      { coord: [136, 164], size: [36, 5] }, // main section bottom
      { coord: [193, 62], size: [34, 80] }, // entrance hall
    ];

    return relativeWallLocations
      .map((rect) => rectTranslate(rect, this.offset))
      .map((rect) => new Wall(rect));
  }
}
