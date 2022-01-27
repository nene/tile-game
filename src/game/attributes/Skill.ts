export interface SkillConfig {
  onLevelUp: (skill: Skill, msg: string) => void;
}

export interface Skill {
  getLevel(): number;
}
