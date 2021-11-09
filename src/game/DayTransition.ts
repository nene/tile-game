import { Calendar } from "./Calendar";
import { Rect, rectCenter } from "./Coord";
import { GameEvent } from "./GameEvent";
import { PixelScreen } from "./PixelScreen";
import { Component } from "./ui/Component";
import { Overlay } from "./ui/Overlay";
import { drawUpset, UI_BG_COLOR, UI_SHADOW_COLOR } from "./ui/ui-utils";

interface DayTransitionConfig {
  calendar: Calendar,
  onHalfWay: () => void;
  onFinished: () => void;
}

export class DayTransition implements Component {
  private opacity = 0;
  private phase: "day-ending" | "pause" | "day-starting" = "day-ending";
  private calendar: Calendar;
  private onHalfWay: () => void;
  private onFinished: () => void;

  constructor({ calendar, onHalfWay, onFinished }: DayTransitionConfig) {
    this.calendar = calendar;
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
    const screenRect: Rect = { coord: [0, 0], size: screen.getSize() };
    const rect = rectCenter({ coord: [0, 0], size: [80, 15] }, screenRect);
    const textRect = rectCenter({ coord: [0, 0], size: [1, 9] }, screenRect);
    screen.drawRect(rect, UI_BG_COLOR);
    drawUpset(screen, rect);
    screen.drawText(this.calendar.getDayText(), textRect.coord, { shadowColor: UI_SHADOW_COLOR, align: "center" });
  }

  handleGameEvent(event: GameEvent) {
    if (event.type === "click" && this.phase === "pause") {
      this.phase = "day-starting";
    }
    return undefined;
  }
}
