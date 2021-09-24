import pouringBeer from "./sounds/pouring-beer.mp3";

export class SoundLibrary {
  private sounds: Record<string, HTMLAudioElement> = {};

  async load() {
    this.sounds['pouring-beer'] = await this.loadAudio(pouringBeer);
  }

  private async loadAudio(src: string): Promise<HTMLAudioElement> {
    return new Promise((resolve) => {
      const audioEl = new Audio(src);
      audioEl.preload = "auto";
      audioEl.addEventListener("canplay", () => resolve(audioEl));
    });
  }

  play(soundName: string) {
    const audioEl = this.sounds[soundName];
    audioEl.currentTime = 0;
    audioEl.play();
  }
}
