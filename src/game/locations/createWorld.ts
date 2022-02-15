import { GameWorld } from "../GameWorld";
import { CfeHallLocationFactory } from "./cfe/CfeHallLocationFactory";
import { CfeCellarLocationFactory } from "./cfe/CfeCellarLocationFactory";
import { OutdoorsLocationFactory } from "./outdoors/OutdoorsLocationFactory";
import { SakalaHallLocationFactory } from "./sakala/SakalaHallLocationFactory";
import { FeenoksLocationFactory } from "./feenoks/FeenoksLocationFactory";
import { Scene } from "../scenes/Scene";

export function createWorld(scene: Scene): GameWorld {
  return new GameWorld({
    startPosition: scene.getStartPosition(),
    locations: [
      new FeenoksLocationFactory(),
      new OutdoorsLocationFactory(),
      new CfeHallLocationFactory(),
      new CfeCellarLocationFactory(),
      new SakalaHallLocationFactory(),
    ],
  });
}
