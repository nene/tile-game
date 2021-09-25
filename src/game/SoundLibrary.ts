import pouringBeer from "./sounds/pouring-beer.mp3";
import openingBeer from "./sounds/opening-beer.mp3";

export class SoundLibrary {
  private static sounds: Record<string, HTMLAudioElement> = {};

  public static async load() {
    this.sounds['pouring-beer'] = await this.loadAudio(pouringBeer);
    this.sounds['opening-beer'] = await this.loadAudio(openingBeer);
  }

  private static async loadAudio(src: string): Promise<HTMLAudioElement> {
    return new Promise((resolve) => {
      const audioEl = new Audio(src);
      audioEl.preload = "auto";
      audioEl.addEventListener("canplay", () => resolve(audioEl));
    });
  }

  public static play(soundName: string) {
    const audioEl = this.sounds[soundName];
    audioEl.currentTime = 0;
    audioEl.play();
  }
}
