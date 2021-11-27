import { GameWorld } from "../GameWorld";
import { CfeHallLocationFactory } from "./CfeHallLocationFactory";
import { CfeLocationFactory } from "./CfeLocationFactory";
import { OutdoorsLocationFactory } from "./OutdoorsLocationFactory";

export function createWorld(day: number): GameWorld {
  return new GameWorld([
    new CfeLocationFactory(),
    new CfeHallLocationFactory(),
    new OutdoorsLocationFactory(),
  ]);
}
