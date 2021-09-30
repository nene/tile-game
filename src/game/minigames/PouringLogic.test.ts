import { times } from "lodash";
import { PouringLogic } from "./PouringLogic";

describe("PouringLogic", () => {
  describe("pouring non-foaming liquid", () => {
    // Pouring in 60 seconds (600 ticks)
    it("causes no foam when poured slowly", () => {
      const pouring = new PouringLogic(0);
      times(600, () => {
        pouring.pourToGlass(1 / 600);
      });
      expect(pouring.getBeerInBottle()).toBeLessThan(0.0001)
      expect(pouring.getBeerInGlass()).toBeGreaterThan(0.9999);
      expect(pouring.getFoamInGlass()).toBeLessThan(0.0001);
      expect(pouring.isFinished()).toBe(true);
    });

    // Pouring in 1 seconds (10 ticks)
    it("causes no foam when poured quickly", () => {
      const pouring = new PouringLogic(0);
      times(10, () => {
        pouring.pourToGlass(1 / 10);
      });
      expect(pouring.getBeerInBottle()).toBeLessThan(0.0001)
      expect(pouring.getBeerInGlass()).toBeGreaterThan(0.9999);
      expect(pouring.getFoamInGlass()).toBeLessThan(0.0001);
      expect(pouring.isFinished()).toBe(true);
    });

    it("finishes when poured to ground", () => {
      const pouring = new PouringLogic(0);
      times(10, () => {
        pouring.pourToGround(1 / 10);
      });
      expect(pouring.getBeerInBottle()).toBeLessThan(0.0001)
      expect(pouring.getBeerInGlass()).toBeLessThan(0.0001);
      expect(pouring.getFoamInGlass()).toBeLessThan(0.0001);
      expect(pouring.isFinished()).toBe(true);
    });
  });
});
