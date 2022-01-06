import { GameWorld } from "../GameWorld";
import { CfeHallLocationFactory } from "./cfe/CfeHallLocationFactory";
import { CfeCellarLocationFactory } from "./cfe/CfeCellarLocationFactory";
import { OutdoorsLocationFactory } from "./outdoors/OutdoorsLocationFactory";
import { SakalaHallLocationFactory } from "./sakala/SakalaHallLocationFactory";
import { FeenoksLocationFactory } from "./feenoks/FeenoksLocationFactory";

export function createWorld(day: number): GameWorld {
  return new GameWorld({
    startLocation: "sakala-hall",
    locations: [
      new FeenoksLocationFactory(),
      new OutdoorsLocationFactory(),
      new CfeHallLocationFactory(),
      new CfeCellarLocationFactory(),
      new SakalaHallLocationFactory(),
    ],
  });
}
