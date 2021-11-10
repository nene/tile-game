import { coordConstrain, Rect, rectAlign, rectCenter, rectOverlaps } from "./Coord";

describe("coordConstrain()", () => {
  it("does nothing when coord inside the rectangle", () => {
    expect(coordConstrain([10, 10], { coord: [10, 10], size: [10, 10] })).toEqual([10, 10]);
    expect(coordConstrain([15, 15], { coord: [10, 10], size: [10, 10] })).toEqual([15, 15]);
    expect(coordConstrain([20, 20], { coord: [10, 10], size: [10, 10] })).toEqual([20, 20]);
  });

  it("constrains x when it's outside of rectangle", () => {
    expect(coordConstrain([9, 15], { coord: [10, 10], size: [10, 10] })).toEqual([10, 15]);
    expect(coordConstrain([21, 15], { coord: [10, 10], size: [10, 10] })).toEqual([20, 15]);
  });

  it("constrains y when it's outside of rectangle", () => {
    expect(coordConstrain([15, 9], { coord: [10, 10], size: [10, 10] })).toEqual([15, 10]);
    expect(coordConstrain([15, 21], { coord: [10, 10], size: [10, 10] })).toEqual([15, 20]);
  });

  it("constrains both x & y", () => {
    expect(coordConstrain([5, 4], { coord: [10, 15], size: [10, 10] })).toEqual([10, 15]);
    expect(coordConstrain([30, 40], { coord: [10, 15], size: [10, 10] })).toEqual([20, 25]);
    expect(coordConstrain([2, 40], { coord: [10, 15], size: [10, 10] })).toEqual([10, 25]);
  });
});

describe("rectOverlaps()", () => {
  it("false when rects far from each other", () => {
    expect(rectOverlaps({ coord: [0, 0], size: [5, 5] }, { coord: [20, 20], size: [10, 10] })).toBe(false);
  });

  it("true when rects clearly overlap", () => {
    expect(rectOverlaps({ coord: [0, 0], size: [10, 10] }, { coord: [5, 5], size: [10, 10] })).toBe(true);
  });

  it("false when rects side-by-side", () => {
    expect(rectOverlaps({ coord: [0, 0], size: [10, 10] }, { coord: [10, 10], size: [10, 10] })).toBe(false);
  });

  it("true when only edges overlap", () => {
    expect(rectOverlaps({ coord: [0, 0], size: [10, 10] }, { coord: [9, 9], size: [10, 10] })).toBe(true);
  });
});

describe("rectCenter()", () => {
  it("centers a small 0-positioned rectangle inside large 0-positioned rectangle", () => {
    expect(rectCenter({ coord: [0, 0], size: [32, 32] }, { coord: [0, 0], size: [64, 96] })).toEqual({
      coord: [16, 32],
      size: [32, 32]
    });
  });

  it("centers a small 0-positioned rectangle inside large 0-positioned rectangle (non-exact)", () => {
    expect(rectCenter({ coord: [0, 0], size: [32, 32] }, { coord: [0, 0], size: [63, 63] })).toEqual({
      coord: [15, 15],
      size: [32, 32]
    });
  });

  it("centers a small rectangle inside large rectangle", () => {
    expect(rectCenter({ coord: [5, 5], size: [32, 32] }, { coord: [20, 25], size: [64, 64] })).toEqual({
      coord: [36, 41],
      size: [32, 32]
    });
  });

  it("centers a large rectangle around small rectangle", () => {
    expect(rectCenter({ coord: [0, 0], size: [64, 64] }, { coord: [36, 41], size: [32, 32] })).toEqual({
      coord: [20, 25],
      size: [64, 64]
    });
  });
});

describe("rectAlign()", () => {
  const container: Rect = { coord: [20, 30], size: [100, 120] };
  const rect: Rect = { coord: [0, 0], size: [10, 16] };

  it("top - aligns rectangle to top-center", () => {
    expect(rectAlign(rect, container, "top")).toEqual({ coord: [65, 30], size: [10, 16] });
  });

  it("left - aligns rectangle to left-center", () => {
    expect(rectAlign(rect, container, "left")).toEqual({ coord: [20, 82], size: [10, 16] });
  });

  it("bottom - aligns rectangle to bottom-center", () => {
    expect(rectAlign(rect, container, "bottom")).toEqual({ coord: [65, 134], size: [10, 16] });
  });

  it("right - aligns rectangle to right-center", () => {
    expect(rectAlign(rect, container, "right")).toEqual({ coord: [110, 82], size: [10, 16] });
  });

  it("top-left - simply places the rect at container coordinate", () => {
    expect(rectAlign(rect, container, "top-left")).toEqual({ coord: [20, 30], size: [10, 16] });
  });

  it("top-right - aligns top top-right corner", () => {
    expect(rectAlign(rect, container, "top-right")).toEqual({ coord: [110, 30], size: [10, 16] });
  });

  it("bottom-left - aligns top bottom-left corner", () => {
    expect(rectAlign(rect, container, "bottom-left")).toEqual({ coord: [20, 134], size: [10, 16] });
  });

  it("bottom-right - aligns top bottom-right corner", () => {
    expect(rectAlign(rect, container, "bottom-right")).toEqual({ coord: [110, 134], size: [10, 16] });
  });

  it("center - behaves just like rectCenter()", () => {
    expect(rectAlign(rect, container, "center")).toEqual({ coord: [65, 82], size: [10, 16] });
  });
});
