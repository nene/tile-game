import { BeerCabinet } from "../../furniture/BeerCabinet";
import { Coord, tileToScreenCoord } from "../../Coord";
import { Fridge } from "../../furniture/Fridge";
import { LocationFactory, LocationName } from "../LocationFactory";
import { GameObject } from "../../GameObject";
import { Table } from "../../furniture/Table";
import { BeerBox } from "../../furniture/BeerBox";
import { Door } from "../../furniture/Door";
import { Sofa } from "../../furniture/Sofa";
import { Fireplace } from "../../furniture/Fireplace";
import { Countertop } from "../../furniture/Countertop";
import { Painting } from "../../furniture/Painting";
import { KitchenSink } from "../../furniture/KitchenSink";
import { BookCabinet } from "../../furniture/BookCabinet";
import { TiledBackground } from "../TiledBackground";

export class CfeCellarLocationFactory implements LocationFactory {
  private background = new TiledBackground([
    "#22222222222222########",
    "6TTTTTTTTTTTTTT4#######",
    "6MMMMMMMMMMMMMM4#######",
    "6BBBBBBBBBBBBBB1222222#",
    "6..............TTTTTTT4",
    "6..............MMMMMMM4",
    "6..............BBBBBBB4",
    "6.....................4",
    "6.....................4",
    "6.....................4",
    "6.....................4",
    "6.....................4",
    "6.....................4",
    "6.....................4",
    "6.....................4",
    "6.....................4",
    "#888888888888888888888#",
  ]);

  private objects: GameObject[] = [
    ...this.background.getWalls(),

    new Painting(tileToScreenCoord([4, 4]), "color-shield"),
    new Table(tileToScreenCoord([8, 8])),
    new Table(tileToScreenCoord([3, 8]), "rtl"),
    new Sofa(tileToScreenCoord([3, 4])),
    new Fireplace(tileToScreenCoord([6, 4])),
    new BookCabinet(tileToScreenCoord([11, 4])),
    new Door({
      coord: tileToScreenCoord([13, 4]),
      spriteName: "door",
      from: "cfe-cellar",
      to: "cfe-hall",
    }),

    new Countertop(tileToScreenCoord([15, 7])),
    new Painting(tileToScreenCoord([15, 7]), "bulletin-board"),
    new BeerCabinet(tileToScreenCoord([17, 7])),
    new Fridge(tileToScreenCoord([19, 7])),
    new BeerBox(tileToScreenCoord([20, 7])),
    new KitchenSink(tileToScreenCoord([21, 8])),
  ];

  getName(): LocationName {
    return "cfe-cellar";
  }

  getSize(): Coord {
    return tileToScreenCoord(this.background.getGridSize());
  }

  getBackground() {
    return this.background;
  }

  getObjects() {
    return this.objects;
  }
}
