import { rectCenter } from "./Coord";
import { GameEvent } from "./GameEvent";
import { PixelScreen } from "./PixelScreen";
import { Component } from "./ui/Component";
import { Overlay } from "./ui/Overlay";
import { SCREEN_RECT } from "./ui/screen-size";
import { drawUpset, UI_BG_COLOR, UI_SHADOW_COLOR } from "./ui/ui-utils";

interface DayTransitionConfig {
  day: number,
  onHalfWay: () => void;
  onFinished: () => void;
}

export class DayTransition implements Component {
  private opacity = 0;
  private phase: "day-ending" | "pause" | "day-starting" = "day-ending";
  private day: number;
  private onHalfWay: () => void;
  private onFinished: () => void;

  constructor({ day, onHalfWay, onFinished }: DayTransitionConfig) {
    this.day = day;
    this.onHalfWay = onHalfWay;
    this.onFinished = onFinished;
  }

  tick() {
    switch (this.phase) {
      case "day-ending":
        this.opacity += 1;
        if (this.opacity === 10) {
          this.phase = "pause";
          this.onHalfWay();
        }
        break;
      case "pause":
        // Waiting for click
        break;
      case "day-starting":
        this.opacity -= 1;
        if (this.opacity === 0) {
          this.onFinished();
        }
        break;
    }
  }

  paint(screen: PixelScreen) {
    Overlay.paint(screen, this.opacity / 10);
    if (this.phase === "pause") {
      this.drawNewDayMessage(screen);
    }
  }

  private drawNewDayMessage(screen: PixelScreen) {
    const rect = rectCenter({ coord: [0, 0], size: [80, 15] }, SCREEN_RECT);
    const textRect = rectCenter({ coord: [0, 0], size: [1, 9] }, SCREEN_RECT);
    screen.drawRect(rect, UI_BG_COLOR);
    drawUpset(screen, rect);
    screen.drawText(`${this.day}. päev`, textRect.coord, { shadowColor: UI_SHADOW_COLOR, align: "center" });
  }

  handleGameEvent(event: GameEvent) {
    if (event.type === "click" && this.phase === "pause") {
      this.phase = "day-starting";
    }
    return undefined;
  }
}
