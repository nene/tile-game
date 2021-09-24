import { Coord, coordSub } from "./game/Coord";

export function mouseCoordRelativeTo(e: MouseEvent, el: HTMLElement): Coord {
  return coordSub(
    coordSub([e.clientX, e.clientY], absolutePosition(el)),
    [-1, -1]
  );
}

function absolutePosition(el: HTMLElement | null): Coord {
  var xPosition = 0;
  var yPosition = 0;

  while (el) {
    if (el.tagName === "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
      var yScrollPos = el.scrollTop || document.documentElement.scrollTop;

      xPosition += el.offsetLeft - xScrollPos + el.clientLeft;
      yPosition += el.offsetTop - yScrollPos + el.clientTop;
    } else {
      xPosition += el.offsetLeft - el.scrollLeft + el.clientLeft;
      yPosition += el.offsetTop - el.scrollTop + el.clientTop;
    }

    el = el.offsetParent as HTMLElement | null;
  }
  return [xPosition, yPosition];
}
