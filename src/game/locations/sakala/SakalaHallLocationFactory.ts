import { Coord, tileToScreenCoord } from "../../Coord";
import { LocationFactory, LocationName } from "../LocationFactory";
import { Door } from "../../furniture/Door";
import { GameObject } from "../../GameObject";
import { getLevel } from "../Level";
import { TiledLevelFactory } from "../TiledLevelFactory";
import { Lamp } from "../../furniture/Lamp";
import { LightSwitch } from "../../furniture/LightSwitch";

export class SakalaHallLocationFactory implements LocationFactory {
  private levelFactory = new TiledLevelFactory(getLevel("Sakala_hall"));

  private objects: GameObject[];

  constructor() {
    const lamps = [
      new Lamp(tileToScreenCoord([1.5, 4]), "sakala-lamp"),
      new Lamp(tileToScreenCoord([3.5, 4]), "sakala-lamp"),
      new Lamp(tileToScreenCoord([7, 4]), "sakala-lamp"),
      new Lamp(tileToScreenCoord([10, 4]), "sakala-lamp"),
      new Lamp(tileToScreenCoord([16, 4]), "sakala-lamp"),
      new Lamp(tileToScreenCoord([19, 4]), "sakala-lamp"),
    ];

    this.objects = [
      ...this.levelFactory.getWalls(),
      ...this.levelFactory.getFurniture(),
      ...lamps,
      new LightSwitch(tileToScreenCoord([5, 5]), lamps, false),

      new Door({
        coord: tileToScreenCoord([2, 10]),
        area: { coord: [0, 0], size: [32, 32] },
        from: "sakala-hall",
        to: "outdoors",
        teleportOffset: [16, 24],
      }),
    ];
  }

  getName(): LocationName {
    return "sakala-hall";
  }

  getSize(): Coord {
    return tileToScreenCoord(this.levelFactory.getGridSize());
  }

  getBackgrounds() {
    return [this.levelFactory.getBackground()];
  }

  getForeground() {
    return this.levelFactory.getForeground();
  }

  getObjects() {
    return this.objects;
  }
}
