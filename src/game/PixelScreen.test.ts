import { worldOffset, WorldOffsetOpts } from "./PixelScreen";

describe("PixelScreen.worldOffset()", () => {
  describe("when world larger than screen", () => {
    const opts: WorldOffsetOpts = { screenSize: [100, 100], worldSize: [1000, 1000] };

    // +----------+----+
    // | X        |    |
    // |          |    |
    // +----------+    |
    // |               |
    // +---------------+
    it("when coord inside top-left half of screen, offset is zero", () => {
      expect(worldOffset([0, 0], opts)).toEqual([0, 0]);
      expect(worldOffset([10, 5], opts)).toEqual([0, 0]);
      expect(worldOffset([50, 50], opts)).toEqual([0, 0]);
    });

    // +---------------+
    // |               |
    // |    +----------+
    // |    |          |
    // |    |        X |
    // +----+----------+
    it("when coord inside bottom-right half of screen, offset is at max", () => {
      expect(worldOffset([950, 950], opts)).toEqual([900, 900]);
      expect(worldOffset([980, 980], opts)).toEqual([900, 900]);
      expect(worldOffset([999, 999], opts)).toEqual([900, 900]);
    });

    // +---------------+
    // |   +------+    |
    // |   |  X   |    |
    // |   |      |    |
    // |   +------+    |
    // +---------------+
    it("when coord at the center of the world, offset is at half (minus half screen-size)", () => {
      expect(worldOffset([500, 500], opts)).toEqual([450, 450]);
    });
  });

  describe("when world smaller than screen", () => {
    const opts: WorldOffsetOpts = { screenSize: [200, 200], worldSize: [100, 100] };

    // +---------------+
    // |   +------+    |
    // |   |  X   |    |
    // |   |      |    |
    // |   +------+    |
    // +---------------+
    it("centers world on screen", () => {
      expect(worldOffset([0, 0], opts)).toEqual([-50, -50]);
    });
  });
});
