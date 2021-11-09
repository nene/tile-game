import { GameEvent } from "./GameEvent";
import { PixelScreen } from "./PixelScreen";
import { Component } from "./ui/Component";
import { Overlay } from "./ui/Overlay";

interface DayTransitionConfig {
  onHalfWay: () => void;
  onFinished: () => void;
}

export class DayTransition implements Component {
  private opacity = 0;
  private darkening = true;
  private onHalfWay: () => void;
  private onFinished: () => void;

  constructor({ onHalfWay, onFinished }: DayTransitionConfig) {
    this.onHalfWay = onHalfWay;
    this.onFinished = onFinished;
  }

  tick() {
    if (this.darkening) {
      this.opacity += 1;
      if (this.opacity === 10) {
        this.darkening = false;
        this.onHalfWay();
      }
    } else {
      this.opacity -= 1;
      if (this.opacity === 0) {
        this.onFinished();
      }
    }
  }

  paint(screen: PixelScreen) {
    Overlay.paint(screen, this.opacity / 10);
  }

  handleGameEvent(event: GameEvent) {
    return undefined;
  }
}
