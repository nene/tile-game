import { Coord } from "./Coord";
import { groupByTiles } from "./groupByTiles";

const mkObj = (coord: Coord, size: Coord) => ({
  id: (coord.join(",") + " : " + size.join(",")),
  boundingBox: () => ({ coord, size }),
});

describe("groupByTiles()", () => {
  describe("given no objects", () => {
    it("returns empty map", () => {
      expect(groupByTiles([])).toEqual({});
    });
  });

  describe("objects covering full tiles", () => {
    it("single top-left tile", () => {
      const obj1 = mkObj([0, 0], [16, 16]);
      expect(groupByTiles([obj1])).toEqual({ "0,0": [obj1] });
    });

    it("multiple objects", () => {
      const obj1 = mkObj([16, 0], [16, 16]);
      const obj2 = mkObj([32, 32], [16, 16]);
      const obj3 = mkObj([16, 64], [16, 16]);
      expect(groupByTiles([obj1, obj2, obj3])).toEqual({
        "1,0": [obj1],
        "2,2": [obj2],
        "1,4": [obj3],
      });
    });

    it("overlapping objects", () => {
      const obj1 = mkObj([16, 32], [16, 16]);
      const obj2 = mkObj([16, 32], [16, 16]);
      const obj3 = mkObj([16, 64], [16, 16]);
      expect(groupByTiles([obj1, obj2, obj3])).toEqual({
        "1,2": [obj1, obj2],
        "1,4": [obj3],
      });
    });

    it("multi-tile spanning objects", () => {
      // 21..
      // 2133
      // 2.33
      const obj1 = mkObj([16, 0], [16, 32]);
      const obj2 = mkObj([0, 0], [16, 48]);
      const obj3 = mkObj([32, 16], [32, 32]);
      expect(groupByTiles([obj1, obj2, obj3])).toEqual({
        "1,0": [obj1],
        "1,1": [obj1],
        "0,0": [obj2],
        "0,1": [obj2],
        "0,2": [obj2],
        "2,1": [obj3],
        "3,1": [obj3],
        "2,2": [obj3],
        "3,2": [obj3],
      });
    });

    it("multi-tile overlapping objects", () => {
      // 1#.
      // 1#2
      // .22
      const obj1 = mkObj([0, 0], [32, 32]);
      const obj2 = mkObj([16, 16], [32, 32]);
      expect(groupByTiles([obj1, obj2])).toEqual({
        "0,0": [obj1],
        "1,0": [obj1],
        "0,1": [obj1],
        "1,1": [obj1, obj2],
        "2,1": [obj2],
        "1,2": [obj2],
        "2,2": [obj2],
      });
    });
  });

  describe("objects covering partial tiles", () => {
    it("object in top-left corner of top-left tile", () => {
      const obj1 = mkObj([0, 0], [5, 5]);
      expect(groupByTiles([obj1])).toEqual({ "0,0": [obj1] });
    });

    it("object within top-left tile", () => {
      const obj1 = mkObj([5, 5], [5, 5]);
      expect(groupByTiles([obj1])).toEqual({ "0,0": [obj1] });
    });

    it("object in bottom-right corner of top-left tile", () => {
      const obj1 = mkObj([10, 10], [5, 5]);
      expect(groupByTiles([obj1])).toEqual({ "0,0": [obj1] });
    });

    it("object sitting in corner between 4 tiles", () => {
      const obj1 = mkObj([8, 8], [16, 16]);
      expect(groupByTiles([obj1])).toEqual({
        "0,0": [obj1],
        "1,0": [obj1],
        "0,1": [obj1],
        "1,1": [obj1],
      });
    });

    it("tiny object sitting in corner between 4 tiles", () => {
      const obj1 = mkObj([13, 13], [6, 6]);
      expect(groupByTiles([obj1])).toEqual({
        "0,0": [obj1],
        "1,0": [obj1],
        "0,1": [obj1],
        "1,1": [obj1],
      });
    });

    it("large object sitting in corner between 4 tiles", () => {
      const obj1 = mkObj([1, 1], [30, 30]);
      expect(groupByTiles([obj1])).toEqual({
        "0,0": [obj1],
        "1,0": [obj1],
        "0,1": [obj1],
        "1,1": [obj1],
      });
    });

    it("overlapping objects", () => {
      const obj1 = mkObj([8, 8], [16, 16]);
      const obj2 = mkObj([20, 20], [32, 32]);
      expect(groupByTiles([obj1, obj2])).toEqual({
        "0,0": [obj1],
        "1,0": [obj1],
        "0,1": [obj1],
        "1,1": [obj1, obj2],
        "2,1": [obj2],
        "3,1": [obj2],
        "1,2": [obj2],
        "2,2": [obj2],
        "3,2": [obj2],
        "1,3": [obj2],
        "2,3": [obj2],
        "3,3": [obj2],
      });
    });
  });
});
