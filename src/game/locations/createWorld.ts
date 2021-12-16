import { GameWorld } from "../GameWorld";
import { CfeHallLocationFactory } from "./cfe-hall/CfeHallLocationFactory";
import { CfeCellarLocationFactory } from "./cfe-cellar/CfeCellarLocationFactory";
import { OutdoorsLocationFactory } from "./outdoors/OutdoorsLocationFactory";

export function createWorld(day: number): GameWorld {
  return new GameWorld([
    new OutdoorsLocationFactory(),
    new CfeHallLocationFactory(),
    new CfeCellarLocationFactory(),
  ]);
}
