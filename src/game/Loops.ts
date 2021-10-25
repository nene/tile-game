const TICK_DURATION = 100; // ten ticks per second
const MAX_DELAY = 5 * 60 * 1000; // 5 minutes (3000 ticks)

export class Loops {
  private running = true;
  private intervalHandle?: NodeJS.Timer;

  // setInterval() will fire about 1x per second when in background tab
  runGameLoop(onTick: () => void) {
    let prevTime = Date.now();

    this.intervalHandle = setInterval(() => {
      const time = Date.now();

      // Avoid huge amount of ticks being called when returning from sleep
      if (prevTime + MAX_DELAY < time) {
        prevTime = time;
      }

      while (prevTime + TICK_DURATION < time) {
        onTick();
        prevTime += TICK_DURATION;
      }
    }, TICK_DURATION / 2);
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
