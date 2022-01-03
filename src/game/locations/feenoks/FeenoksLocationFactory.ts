import { Coord, tileToScreenCoord } from "../../Coord";
import { LocationFactory, LocationName } from "../LocationFactory";
import { Door } from "../../furniture/Door";
import { GameObject } from "../../GameObject";
import { getLevel } from "../Level";
import { TiledLevelFactory } from "../TiledLevelFactory";
import { SolidBackground } from "../SolidBackground";
import { CharacterFigure } from "../../npc/CharacterFigure";
import { getCharacter } from "../../npc/characters";

export class FeenoksLocationFactory implements LocationFactory {
  private levelFactory = new TiledLevelFactory(getLevel("Feenoks"));

  private objects: GameObject[];

  constructor() {

    this.objects = [
      ...this.levelFactory.getWalls(),
      ...this.levelFactory.getFurniture(),

      new Door({
        coord: tileToScreenCoord([1, 12]),
        area: { coord: [0, 0], size: [32, 32] },
        from: "feenoks",
        to: "outdoors",
        teleportOffset: [16, 24],
        autoTeleportSide: "bottom",
      }),

      new CharacterFigure(tileToScreenCoord([12, 5]), getCharacter("feenoks-lady")),
    ];
  }

  getName(): LocationName {
    return "feenoks";
  }

  getSize(): Coord {
    return tileToScreenCoord(this.levelFactory.getGridSize());
  }

  getBackgrounds() {
    return [
      new SolidBackground(),
      this.levelFactory.getBackground(),
    ];
  }

  getForeground() {
    return this.levelFactory.getForeground();
  }

  getObjects() {
    return this.objects;
  }
}
