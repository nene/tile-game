import { PixelScreen } from "../PixelScreen";

export interface Paintable {
  paint(screen: PixelScreen): void;
}

export class PaintableGroup {
  constructor(private paintables: Paintable[]) { }

  paint(screen: PixelScreen) {
    this.paintables.forEach((item) => item.paint(screen));
  }
}
