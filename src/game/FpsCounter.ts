import { sum } from "lodash";
import { PixelScreen } from "./PixelScreen";

export class FpsCounter {
  private fpsArray: number[] = [];
  private lastTime = Date.now();

  countFrame() {
    const now = Date.now();
    const frameTime = (Date.now() - this.lastTime);
    this.fpsArray.push(1000 / frameTime);
    if (this.fpsArray.length > 10) {
      this.fpsArray.shift();
    }
    this.lastTime = now;
  }

  paint(screen: PixelScreen) {
    const fps = sum(this.fpsArray) / this.fpsArray.length;
    screen.drawText(Math.floor(fps) + " fps", [25, 2], { size: "small", align: "right", shadowColor: "white" });
  }
}
