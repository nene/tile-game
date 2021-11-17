import { GameWorld } from "../GameWorld";
import { CfeLocationFactory } from "./CfeLocationFactory";
import { OutdoorsLocationFactory } from "./OutdoorsLocationFactory";

export function createWorld(day: number): GameWorld {
  return new GameWorld([
    new CfeLocationFactory(),
    new OutdoorsLocationFactory(day),
  ]);
}
