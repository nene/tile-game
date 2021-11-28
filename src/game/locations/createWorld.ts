import { GameWorld } from "../GameWorld";
import { CfeHallLocationFactory } from "./CfeHallLocationFactory";
import { CfeCellarLocationFactory } from "./CfeCellarLocationFactory";
import { OutdoorsLocationFactory } from "./OutdoorsLocationFactory";

export function createWorld(day: number): GameWorld {
  return new GameWorld([
    new CfeCellarLocationFactory(),
    new CfeHallLocationFactory(),
    new OutdoorsLocationFactory(),
  ]);
}
