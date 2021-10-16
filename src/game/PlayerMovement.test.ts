import { Rect, rectOverlaps, rectTranslate } from "./Coord";
import { Wall } from "./furniture/Wall";
import { PlayerMovement } from "./PlayerMovement";

const walls = [
  new Wall({ coord: [10, 10], size: [10, 10] }),
];

const MockPlayer = Wall;

const location = {
  getObjectsInRect(r: Rect) {
    return walls.filter(w => rectOverlaps(r, rectTranslate(w.boundingBox(), w.getCoord())));
  }
};

describe("PlayerMovement", () => {
  it("moves freely when no obstacles", () => {
    const player = new MockPlayer({ coord: [5, 5], size: [1, 1] });
    const movement = new PlayerMovement(player);
    expect(movement.move([1, 1], 3, location)).toEqual([8, 8]);
  });

  it("doesn't move when obstacle on its way", () => {
    const player = new MockPlayer({ coord: [9, 15], size: [1, 1] });
    const movement = new PlayerMovement(player);
    expect(movement.move([1, 0], 3, location)).toEqual([9, 15]);
  });

  it("moves until reaches obstacle", () => {
    const player = new MockPlayer({ coord: [8, 15], size: [1, 1] });
    const movement = new PlayerMovement(player);
    expect(movement.move([1, 0], 3, location)).toEqual([9, 15]);
  });

  it("slides along obstacle when moving diagonally", () => {
    const player = new MockPlayer({ coord: [9, 15], size: [1, 1] });
    const movement = new PlayerMovement(player);
    expect(movement.move([1, 1], 3, location)).toEqual([9, 18]);
  });
});
