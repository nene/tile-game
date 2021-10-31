import { Coord, coordAdd, Rect } from "../Coord";
import { GameEvent } from "../GameEvent";
import { TextButton } from "../ui/TextButton";
import { PixelScreen } from "../PixelScreen";
import { TextContent } from "./TextContent";
import { Component } from "../ui/Component";

interface MultiChoiceQuestionContentConfig {
  container: Rect;
  question: string;
  choices: string[];
  fontSize?: "medium" | "small";
  onAnswer: (answer: string) => void;
}

export class MultiChoiceQuestionContent implements Component {
  private fontSize?: "medium" | "small";
  private question: TextContent;
  private answerButtons: TextButton[];
  private onAnswer: (answer: string) => void;

  constructor({ container, question, choices, fontSize, onAnswer }: MultiChoiceQuestionContentConfig) {
    this.fontSize = fontSize;
    this.onAnswer = onAnswer;
    this.question = new TextContent(question, container);
    this.answerButtons = this.createAnswerButtons(choices, container);
  }

  private createAnswerButtons(choices: string[], container: Rect): TextButton[] {
    const buttonSize: Coord = [container.size[0], 14];
    const startCoord: Coord = coordAdd(container.coord, [0, 12 * 2]);

    return choices.map((choice, i) => {
      const buttonOffset = 15 * i;
      const coord = coordAdd(startCoord, [0, buttonOffset]);
      return new TextButton({
        rect: { coord, size: buttonSize },
        text: choice,
        align: "left",
        size: this.fontSize,
        onClick: () => { this.onAnswer(choice) },
      });
    });
  }

  paint(screen: PixelScreen) {
    this.question.paint(screen);

    this.answerButtons.forEach((btn) => {
      btn.paint(screen);
    });
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    this.answerButtons.forEach((btn) => {
      btn.handleGameEvent(event);
    });
    return undefined;
  }
}
