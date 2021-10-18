import { Rect } from "../Coord";
import { GameEvent } from "../GameEvent";
import { Organization } from "../orgs/Organization";
import { PixelScreen } from "../PixelScreen";
import { DialogContent } from "./DialogContent";
import { TextContent } from "./TextContent";

export class FlagQuestionContent implements DialogContent {
  private question: TextContent;

  constructor(private org: Organization) {
    this.question = new TextContent(`Millised on ${org.name} värvid?`);
  }

  paint(screen: PixelScreen, rect: Rect) {
    this.question.paint(screen, rect);
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    return undefined;
  }
}
