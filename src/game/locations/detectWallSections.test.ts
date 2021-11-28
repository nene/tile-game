import { detectWallSections } from "./detectWallSections";

describe("detectWallSections()", () => {
  it("detects nothing from empty grid", () => {
    expect(detectWallSections([])).toEqual([]);
  });

  it("detects nothing from grid with no wall tiles", () => {
    expect(detectWallSections([
      [false, false],
      [false, false],
    ])).toEqual([]);
  });

  it("detects single 1x1 wall from 1x1 grid with single wall tile", () => {
    expect(detectWallSections([[true]])).toEqual([
      { coord: [0, 0], size: [1, 1] },
    ]);
  });

  it("detects single 1x1 wall from 3x3 grid with single wall tile", () => {
    expect(detectWallSections([
      [false, false, false],
      [false, true, false],
      [false, false, false],
    ])).toEqual([
      { coord: [1, 1], size: [1, 1] },
    ]);
  });

  it("detects single 3x1 wall from 3x3 grid with 3 wall tiles", () => {
    expect(detectWallSections([
      [false, false, false],
      [true, true, true],
      [false, false, false],
    ])).toEqual([
      { coord: [0, 1], size: [3, 1] },
    ]);
  });

  it("detects two separate 2x1 walls from 3x3 grid", () => {
    expect(detectWallSections([
      [true, true, false],
      [false, false, false],
      [false, true, true],
    ])).toEqual([
      { coord: [0, 0], size: [2, 1] },
      { coord: [1, 2], size: [2, 1] },
    ]);
  });

  it("detects vertical 1x3 wall from 3x3 grid with 3 wall tiles", () => {
    expect(detectWallSections([
      [false, true, false],
      [false, true, false],
      [false, true, false],
    ])).toEqual([
      { coord: [1, 0], size: [1, 3] },
    ]);
  });

  it("detects 2x2 wall from 3x3 grid with 4 wall tiles", () => {
    expect(detectWallSections([
      [false, false, false],
      [false, true, true],
      [false, true, true],
    ])).toEqual([
      { coord: [1, 1], size: [2, 2] },
    ]);
  });

  it("handles multiple connected walls", () => {
    const T = true;
    const F = false;
    expect(detectWallSections([
      [T, T, F],
      [T, T, F],
      [T, T, T],
      [F, T, T],
      [F, T, T],
    ])).toEqual([
      { coord: [0, 0], size: [2, 2] },
      { coord: [0, 2], size: [3, 1] },
      { coord: [1, 3], size: [2, 2] },
    ]);
  });
});
