import { PixelScreen } from "./PixelScreen";

export type Coord = [number, number];

export interface GameObject {
    coord: Coord;
    tick: (screen: PixelScreen) => void;
    paint: (screen: PixelScreen) => void;
}

export interface Sprite {
    image: HTMLImageElement,
    coord: Coord,
    size: Coord,
}
