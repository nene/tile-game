import { Coord, coordAdd, Rect } from "../Coord";
import { GameEvent } from "../GameEvent";
import { TextButton } from "../ui/TextButton";
import { PixelScreen } from "../PixelScreen";
import { TextContent } from "./TextContent";
import { Component } from "../ui/Component";
import { CounterAnimation } from "./CounterAnimation";

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
  private answerButtonsVisible: CounterAnimation;
  private onAnswer: (answer: string) => void;

  constructor({ container, question, choices, fontSize, onAnswer }: MultiChoiceQuestionContentConfig) {
    this.fontSize = fontSize;
    this.onAnswer = onAnswer;
    this.question = new TextContent({ text: question, rect: container, animated: true });
    this.answerButtons = this.createAnswerButtons(choices, container);
    this.answerButtonsVisible = new CounterAnimation({ ticksPerFrame: 2, total: choices.length });
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

  tick() {
    this.question.tick();
    if (this.question.isAnimationFinished()) {
      this.answerButtonsVisible.tick();
    }
  }

  paint(screen: PixelScreen) {
    this.question.paint(screen);
    screen.paint(this.answerButtons.slice(0, this.answerButtonsVisible.getCount()));
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    this.answerButtons.forEach((btn) => {
      btn.handleGameEvent(event);
    });
    return undefined;
  }
}
