import { GameWorld } from "../GameWorld";
import { CfeHallLocationFactory } from "./cfe-hall/CfeHallLocationFactory";
import { CfeCellarLocationFactory } from "./cfe-cellar/CfeCellarLocationFactory";
import { OutdoorsLocationFactory } from "./outdoors/OutdoorsLocationFactory";
import { SakalaHallLocationFactory } from "./sakala/SakalaHallLocationFactory";

export function createWorld(day: number): GameWorld {
  return new GameWorld([
    new OutdoorsLocationFactory(),
    new CfeHallLocationFactory(),
    new CfeCellarLocationFactory(),
    new SakalaHallLocationFactory(),
  ]);
}
