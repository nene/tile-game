
export class Loops {
  private running = true;
  private intervalHandle?: NodeJS.Timer;

  // setInterval() will fire about 1x per second when in background tab
  runGameLoop(onTick: () => void) {
    const duration = 100;
    let prevTime = Date.now();

    this.intervalHandle = setInterval(() => {
      const time = Date.now();
      while (prevTime + duration < time) {
        onTick();
        prevTime += duration;
      }
    }, duration / 2);
  }

  runPaintLoop(onPaint: (time: number) => void) {
    const paint = (time: number) => {
      onPaint(time);
      if (this.running) {
        window.requestAnimationFrame(paint);
      }
    };
    window.requestAnimationFrame(paint);
  }

  cleanup() {
    this.running = false;
    this.intervalHandle ?? clearInterval(this.intervalHandle);
  }
}
