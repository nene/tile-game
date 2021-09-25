import pouringBeer from "./sounds/pouring-beer.mp3";
import openingBeer from "./sounds/opening-beer.mp3";

const soundFiles = {
  'pouring-beer': pouringBeer,
  'opening-beer': openingBeer,
};

type SoundName = keyof typeof soundFiles;

export class SoundLibrary {
  private static sounds: Record<string, HTMLAudioElement> = {};

  public static async load() {
    for (const [name, fileName] of Object.entries(soundFiles)) {
      this.sounds[name] = await this.loadAudio(fileName);
    }
  }

  private static async loadAudio(src: string): Promise<HTMLAudioElement> {
    return new Promise((resolve) => {
      const audioEl = new Audio(src);
      audioEl.preload = "auto";
      audioEl.addEventListener("canplay", () => resolve(audioEl));
    });
  }

  public static play(soundName: SoundName) {
    const audioEl = this.sounds[soundName];
    audioEl.currentTime = 0;
    audioEl.play();
  }
}
