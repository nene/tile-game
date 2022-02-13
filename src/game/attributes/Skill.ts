import { Subject } from "rxjs";
import { Sprite } from "../sprites/Sprite";

export type LevelUpEvent = { skill: Skill, msg: string };
export type LevelUpSubject = Subject<LevelUpEvent>;

export interface Skill {
  getName(): string;
  // Integer between 0..10
  getLevel(): number;
  // Progress to next level. Float between 0..1
  getProgress(): number;
  getIcon(): Sprite;
}
