import killSound from "./sounds/kill.mp3";

export class SoundLibrary {
  private sounds: Record<string, HTMLAudioElement> = {};

  async load() {
    this.sounds.killSnail = await this.loadAudio(killSound);
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
    audioEl.play();
  }
}
