import { isCoordInRect } from "../Coord";
import { GameEvent } from "../GameEvent";
import { PixelScreen } from "../PixelScreen";
import { Component } from "../ui/Component";
import { ScrollView } from "../ui/ScrollView";
import { Window } from "../ui/Window";
import { Character } from "./Character";
import { CharacterOpinionRenderer } from "./CharacterOpinionRenderer";

interface OpinionsViewConfig {
  characters: Character[],
  onClose: () => void;
}

export class OpinionsView implements Component {
  private window: Window;
  private scrollView: ScrollView<Character>;
  private onClose: () => void;

  constructor({ characters, onClose }: OpinionsViewConfig) {
    this.onClose = onClose;

    this.window = new Window({
      headline: {
        title: "Värvikandjate arvamus",
        description: "Kuivõrd sa oled valmis värve kandma erinevate fraaterite arvates."
      },
      size: [192, 129 - 21],
      onClose,
    });

    const contentRect = this.window.contentAreaRect();
    const renderer = new CharacterOpinionRenderer();
    this.scrollView = new ScrollView({
      items: characters,
      rect: contentRect,
      itemSize: [contentRect.size[0] - 10, 20],
      itemSeparator: 1,
      margin: [1, 1],
      bgColor: "#000",
      renderer: renderer.render.bind(renderer),
    });
  }

  paint(screen: PixelScreen) {
    this.window.paint(screen);
    this.scrollView.paint(screen);
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    const stopPropagation =
      this.window.handleGameEvent(event) ||
      this.scrollView.handleGameEvent(event);
    if (stopPropagation) {
      return true;
    }

    if (event.type === "click" && !isCoordInRect(event.coord, this.window.getRect())) {
      this.onClose();
      return true;
    }
  }
}
