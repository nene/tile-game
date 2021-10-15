import { Rect } from "./Coord";
import { Wall } from "./furniture/Wall";
import { PlayerMovement } from "./PlayerMovement";

describe("PlayerMovement", () => {
  it("moves freely when no obstacles", () => {
    const location = { getObjectsInRect: (r: Rect) => [] };
    const player = new Wall({ coord: [10, 10], size: [1, 1] });
    const movement = new PlayerMovement(player);
    expect(movement.move([3, 3], location)).toEqual([13, 13]);
  });

  it("doesn't move when obstacle on its way", () => {
    const location = { getObjectsInRect: (r: Rect) => [new Wall({ coord: [11, 11], size: [16, 16] })] };
    const player = new Wall({ coord: [10, 10], size: [1, 1] });
    const movement = new PlayerMovement(player);
    expect(movement.move([3, 3], location)).toEqual([10, 10]);
  });
});
