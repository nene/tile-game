import { allOrganizations, Organization, OrgSkillLevel } from "../orgs/Organization";
import { QuestionCategory } from "../questions/QuestionFactory";

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

  // About which orgs we ask questions
  getTargetOrgs(): Organization[] {
    return allOrganizations().filter((org) => org.level === this.level);
  }

  // Which additional orgs are allowed in the multi-choice answers
  getPossibleOrgs(): Organization[] {
    return allOrganizations();
  }

  getEnabledCategories(): QuestionCategory[] {
    return ["colors", "place", "slogan", "year"];
  }
}
