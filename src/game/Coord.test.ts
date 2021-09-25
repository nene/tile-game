import { coordConstrain } from "./Coord";

describe("coordConstrain()", () => {
  it("does nothing when coord inside the rectangle", () => {
    expect(coordConstrain([10, 10], [10, 10], [20, 20])).toEqual([10, 10]);
    expect(coordConstrain([15, 15], [10, 10], [20, 20])).toEqual([15, 15]);
    expect(coordConstrain([20, 20], [10, 10], [20, 20])).toEqual([20, 20]);
  });

  it("constrains x when it's outside of rectangle", () => {
    expect(coordConstrain([9, 15], [10, 10], [20, 20])).toEqual([10, 15]);
    expect(coordConstrain([21, 15], [10, 10], [20, 20])).toEqual([20, 15]);
  });

  it("constrains y when it's outside of rectangle", () => {
    expect(coordConstrain([15, 9], [10, 10], [20, 20])).toEqual([15, 10]);
    expect(coordConstrain([15, 21], [10, 10], [20, 20])).toEqual([15, 20]);
  });

  it("constrains both x & y", () => {
    expect(coordConstrain([5, 4], [10, 15], [20, 25])).toEqual([10, 15]);
    expect(coordConstrain([30, 40], [10, 15], [20, 25])).toEqual([20, 25]);
    expect(coordConstrain([2, 40], [10, 15], [20, 25])).toEqual([10, 25]);
  });
});
