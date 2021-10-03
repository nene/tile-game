import { coordAdd, Rect } from "./Coord";
import { PixelScreen } from "./PixelScreen";

export const UI_BG_COLOR = "#b88f61";
export const UI_SHADOW_COLOR = "#8f563b";
export const UI_HIGHLIGHT_COLOR = "#bda37a";

export function drawUpset(screen: PixelScreen, rect: Rect) {
  drawUiBox(screen, rect, UI_HIGHLIGHT_COLOR, UI_SHADOW_COLOR);
}

export function drawInset(screen: PixelScreen, rect: Rect) {
  drawUiBox(screen, rect, UI_SHADOW_COLOR, UI_HIGHLIGHT_COLOR);
}

function drawUiBox(screen: PixelScreen, rect: Rect, color1: string, color2: string) {
  screen.drawRect({ coord: rect.coord, size: [rect.size[0] - 1, 1] }, color1, { fixed: true });
  screen.drawRect({ coord: rect.coord, size: [1, rect.size[1] - 1] }, color1, { fixed: true });
  screen.drawRect({ coord: coordAdd(rect.coord, [1, rect.size[1] - 1]), size: [rect.size[0] - 1, 1] }, color2, { fixed: true });
  screen.drawRect({ coord: coordAdd(rect.coord, [rect.size[0] - 1, 1]), size: [1, rect.size[1] - 1] }, color2, { fixed: true });
}
