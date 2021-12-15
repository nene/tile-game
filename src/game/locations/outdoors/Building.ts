import { GameObject } from "../../GameObject";

export interface Building {
  getWalls: () => GameObject[];
}
