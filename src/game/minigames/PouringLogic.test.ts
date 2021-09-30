import { times } from "lodash";
import { PouringLogic } from "./PouringLogic";

function expectRoughly(value: number, expected: number) {
  const threshold = 0.0001;
  expect(value).toBeLessThan(expected + threshold);
  expect(value).toBeGreaterThan(expected - threshold);
}

describe("PouringLogic", () => {
  describe("pouring non-foaming liquid", () => {
    const foaminess = { min: 0, max: 0 };

    // Pouring in 60 seconds (600 ticks)
    it("causes no foam when poured slowly", () => {
      const pouring = new PouringLogic(foaminess);
      times(600, () => {
        pouring.pourToGlass(0.01);
      });
      expectRoughly(pouring.getLiquidInBottle(), 0);
      expectRoughly(pouring.getLiquidInGlass(), 1);
      expectRoughly(pouring.getFoamInGlass(), 0);
      expectRoughly(pouring.getTotalInGlass(), 1);
      expect(pouring.isFinished()).toBe(true);
    });

    // Pouring in 3 seconds (30 ticks)
    it("causes no foam when poured quickly", () => {
      const pouring = new PouringLogic(foaminess);
      times(30, () => {
        pouring.pourToGlass(1);
      });
      expectRoughly(pouring.getLiquidInBottle(), 0);
      expectRoughly(pouring.getLiquidInGlass(), 1);
      expectRoughly(pouring.getFoamInGlass(), 0);
      expectRoughly(pouring.getTotalInGlass(), 1);
      expect(pouring.isFinished()).toBe(true);
    });
  });

  describe("pouring a foaming liquid", () => {
    const foaminess = { min: 0.1, max: 0.2 };

    it("causes the minimum amount of foam when poured slowly", () => {
      const pouring = new PouringLogic(foaminess);
      let ticks = 0;
      while (!pouring.isFinished()) {
        pouring.pourToGlass(0.01);
        ticks++;
      }
      expect(ticks).toBe(600); // ~60 secs
      expectRoughly(pouring.getLiquidInBottle(), 0);
      expectRoughly(pouring.getLiquidInGlass(), 0.9);
      expectRoughly(pouring.getFoamInGlass(), 0.3);
      expectRoughly(pouring.getTotalInGlass(), 1);
    });

    it("causes the medium amount of foam when poured at avg speed", () => {
      const pouring = new PouringLogic(foaminess);
      let ticks = 0;
      while (!pouring.isFinished()) {
        pouring.pourToGlass(0.5);
        ticks++;
      }
      expect(ticks).toBe(294); // ~30 secs
      expectRoughly(pouring.getLiquidInBottle(), 0.0751);
      expectRoughly(pouring.getLiquidInGlass(), 0.7866);
      expectRoughly(pouring.getFoamInGlass(), 0.4133);
      expectRoughly(pouring.getTotalInGlass(), 0.9244);
    });

    it("causes the foam to fill glass to max when poured fast", () => {
      const pouring = new PouringLogic(foaminess);
      let ticks = 0;
      while (!pouring.isFinished()) {
        pouring.pourToGlass(1);
        ticks++;
      }
      expect(ticks).toBe(26); // 2.6 secs
      expectRoughly(pouring.getLiquidInBottle(), 0.1333);
      expectRoughly(pouring.getLiquidInGlass(), 0.6933);
      expectRoughly(pouring.getFoamInGlass(), 0.5066);
      expectRoughly(pouring.getTotalInGlass(), 0.8622);
    });

    it("doesn't allow to pour more than fits to glass", () => {
      const pouring = new PouringLogic(foaminess);
      times(30, () => {
        pouring.pourToGlass(1);
      });
      expectRoughly(pouring.getLiquidInBottle(), 0.1333);
      expectRoughly(pouring.getLiquidInGlass(), 0.6933);
      expectRoughly(pouring.getFoamInGlass(), 0.5066);
      expectRoughly(pouring.getTotalInGlass(), 0.8622);
    });
  });

  describe("pouring to ground", () => {
    const foaminess = { min: 0.1, max: 0.2 };

    it("just empties the bottle, adding nothing to glass", () => {
      const pouring = new PouringLogic(foaminess);
      let ticks = 0;
      while (!pouring.isFinished()) {
        pouring.pourToGround(0.01);
        ticks++;
      }
      expect(ticks).toBe(600); // ~60 secs
      expectRoughly(pouring.getLiquidInBottle(), 0);
      expectRoughly(pouring.getLiquidInGlass(), 0);
      expectRoughly(pouring.getFoamInGlass(), 0);
      expectRoughly(pouring.getTotalInGlass(), 0);
    });
  });
});
