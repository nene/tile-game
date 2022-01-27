import { SkillsView } from "../attributes/SkillsView";
import { isAcademicCharacter } from "../npc/AcademicCharacter";
import { getAllCharacters } from "../npc/characters";
import { OpinionsView } from "../npc/OpinionsView";
import { UiController } from "../UiController";

export function toggleOpinionsView(ui: UiController) {
  if (ui.getInfoModal() instanceof OpinionsView) {
    ui.hideInfoModal();
  } else {
    ui.showInfoModal(new OpinionsView({
      characters: getAllCharacters().filter(isAcademicCharacter),
      onClose: () => ui.hideInfoModal(),
    }));
  }
}

export function toggleSkillsView(ui: UiController) {
  if (ui.getInfoModal() instanceof SkillsView) {
    ui.hideInfoModal();
  } else {
    ui.showInfoModal(new SkillsView({
      attributes: ui.getAttributes(),
      onClose: () => ui.hideInfoModal(),
    }));
  }
}
