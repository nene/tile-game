import { Sprite } from "../sprites/Sprite";

export interface SkillConfig {
  onLevelUp: (skill: Skill, msg: string) => void;
}

export interface Skill {
  // Integer between 0..10
  getLevel(): number;
  // Progress to next level. Float between 0..1
  getProgress(): number;
  getIcon(): Sprite;
}
