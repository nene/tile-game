import { Coord } from "../Coord";
import { TextStyle } from "../PixelScreen";

// Utility interface to allow mocking just one method in tests
export interface TextMeasurer {
  measureText: (text: string | number, style: TextStyle) => Coord;
}

export function fitText(screen: TextMeasurer, size: Coord, text: string, style: TextStyle): string[] {
  return text.split("\n").flatMap((paragraph) => fitParagraph(screen, size, paragraph, style));
}

function fitParagraph(screen: TextMeasurer, [containerWidth]: Coord, text: string, style: TextStyle): string[] {
  const [width] = screen.measureText(text, style);
  if (width <= containerWidth) {
    return [text];
  }

  const lines: string[] = [];
  let currentLine: string[] = [];
  for (const word of text.split(" ")) {
    currentLine.push(word);
    if (screen.measureText(currentLine.join(" "), style)[0] > containerWidth) {
      if (currentLine.length > 1) {
        const lastWord = currentLine.pop() as string
        lines.push(currentLine.join(" "));
        currentLine = [lastWord];
      } else {
        lines.push(currentLine.join(" "));
        currentLine = [];
      }
    }
  }

  if (currentLine.length > 0) {
    lines.push(currentLine.join(" "));
  }

  return lines;
}
