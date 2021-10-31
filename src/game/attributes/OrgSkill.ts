export enum OrgSkillLevel {
  estica = 0, // Only questions about Fraternitas Estica
  level1 = 1,
  level2 = 2,
  level3 = 3,
  level4 = 4,
  level5 = 5,
  level6 = 6,
  level7 = 7,
  level8 = 8,
  level9 = 9,
  level10 = 10,
}

// Skill of answering questions about Academic Organizations.
// As the player levels up, questions become harder.
export class OrgSkill {
  private level = OrgSkillLevel.estica;

  getLevel(): OrgSkillLevel {
    return this.level;
  }

  increment() {
    if (this.level < OrgSkillLevel.level10) {
      this.level++;
    }
  }
}
