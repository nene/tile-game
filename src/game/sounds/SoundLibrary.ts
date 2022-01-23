import pouringWater from "./data/pouring-water.mp3";
import pouringBeer from "./data/pouring-beer.mp3";
import openingBeer from "./data/opening-beer.mp3";
import openingCabinetDoor from "./data/opening-cabinet-door.mp3";
import openingFridgeDoor from "./data/opening-fridge-door.mp3";
import coins from "./data/coins.wav";
import glassBottles from "./data/glass-bottles.mp3";
import { Howl } from "howler";

const soundFiles = {
  'pouring-water': pouringWater,
  'pouring-beer': pouringBeer,
  'opening-beer': openingBeer,
  'opening-cabinet-door': openingCabinetDoor,
  'opening-fridge-door': openingFridgeDoor,
  'coins': coins,
  'glass-bottles': glassBottles,
};

type SoundName = keyof typeof soundFiles;

export class SoundLibrary {
  private static sounds: Record<string, Howl> = {};

  public static async load() {
    for (const [name, fileName] of Object.entries(soundFiles)) {
      this.sounds[name] = await this.loadAudio(fileName);
    }
  }

  private static async loadAudio(src: string): Promise<Howl> {
    return new Promise((resolve) => {
      const howl: Howl = new Howl({
        src,
        onload: () => resolve(howl),
      });
    });
  }

  public static play(soundName: SoundName) {
    const howl = this.sounds[soundName];
    howl.stop();
    howl.play();
  }
}
