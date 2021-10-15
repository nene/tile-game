import { Coord, Rect, rectTranslate } from "../Coord";
import { Wall } from "../furniture/Wall";
import { GameObject } from "../GameObject";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Building } from "./Building";

export class CfeBuilding implements Building {
  private sprite: Sprite;

  constructor(private coord: Coord) {
    this.sprite = SpriteLibrary.get("cfe-building").getSprite([0, 0]);
  }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.sprite, this.coord);
  }

  getWalls(): GameObject[] {
    const relativeWallLocations: Rect[] = [
      { coord: [1, 62], size: [18, 76] }, // left wing
      { coord: [19, 62], size: [40, 101] }, // tower
      { coord: [24, 163], size: [30, 5] }, // tower bottom
      { coord: [59, 62], size: [58, 97] }, // middle section
      { coord: [117, 62], size: [76, 101] }, // large main section
      { coord: [136, 163], size: [36, 6] }, // main section bottom
      { coord: [193, 62], size: [34, 79] }, // entrance hall
    ];

    return relativeWallLocations
      .map((rect) => rectTranslate(rect, this.coord))
      .map((rect) => new Wall(rect));
  }
}
