import { coordConstrain } from "./Coord";

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
