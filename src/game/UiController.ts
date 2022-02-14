import { PixelScreen } from "./PixelScreen";
import { InventoryController } from "./InventoryController";
import { Overlay } from "./ui/Overlay";
import { CursorController } from "./CursorController";
import { MiniGame } from "./minigames/MiniGame";
import { ScoreBoard } from "./ScoreBoard";
import { GameEvent } from "./GameEvent";
import { InventoryView } from "./inventory/InventoryView";
import { PlayerAttributes } from "./attributes/PlayerAttributes";
import { Coord } from "./Coord";
import { Calendar } from "./Calendar";
import { Component, isTickableComponent } from "./ui/Component";
import { QuestionFactory } from "./questions/QuestionFactory";
import { GameWorld } from "./GameWorld";
import { createWorld } from "./locations/createWorld";
import { DayTransition } from "./DayTransition";
import { resetCharactersForDay } from "./npc/characters";
import { LevelUpMessage } from "./ui/LevelUpMessage";
import { toggleSkillsView } from "./ui/infoModals";
import { Player } from "./player/Player";
import { filter, delay, Subscription, combineLatest } from "rxjs";

const START_DAY = 2;

export class UiController {
  private world: GameWorld;
  private inventoryController: InventoryController;
  private cursorController: CursorController;
  private modalWindow?: Component;
  private infoModalWindow?: Component;
  private scoreBoard: ScoreBoard;
  private calendar: Calendar;
  private questionFacory: QuestionFactory;
  private levelUpMsg = new LevelUpMessage();
  private attributes = new PlayerAttributes();
  private dayTransition?: DayTransition;
  private playerSubscription?: Subscription;

  constructor() {
    this.calendar = new Calendar();
    this.inventoryController = new InventoryController(this.attributes);
    this.cursorController = new CursorController();
    this.scoreBoard = new ScoreBoard();
    this.questionFacory = new QuestionFactory(this.attributes.orgSkill, this.attributes.termSkill);

    this.world = this.rebuildWorld(START_DAY);

    this.calendar.dayEnd$.subscribe((day) => this.doDayTransition(day + 1));

    this.attributes.alcoSkill.drunkenness$.subscribe((drunkenness) => this.updatePlayerMentalState(drunkenness));

    this.attributes.wallet.money$.subscribe((money) => this.scoreBoard.setMoney(money));
    this.attributes.alcoSkill.drunkenness$.subscribe((drunkenness) => this.scoreBoard.setDrunkenness(drunkenness));
    this.calendar.dateTime$.subscribe((dateTime) => this.scoreBoard.setDateTime(dateTime));

    this.attributes.levelUp$.subscribe((event) => this.levelUpMsg.show(event));
    this.levelUpMsg.click$.subscribe(() => toggleSkillsView(this));
  }

  private rebuildWorld(day: number): GameWorld {
    this.inventoryController.resetForNewDay();
    this.attributes.resetForNewDay();
    this.calendar.setDay(day);
    resetCharactersForDay(day);
    const world = createWorld(day);
    this.initPlayer(world.getPlayer());
    return world;
  }

  private initPlayer(player: Player) {
    this.playerSubscription?.unsubscribe();

    this.playerSubscription = combineLatest([
      player.mentalState$,
      player.isDrinking$,
    ]).pipe(
      filter(([state, isDrinking]) => state === "sleep" && !isDrinking),
      delay(6000),
    ).subscribe(() => {
      this.calendar.endDay();
    });
  }

  private doDayTransition(newDay: number) {
    this.dayTransition = new DayTransition({
      day: newDay,
      onHalfWay: () => {
        this.modalWindow = undefined;
        this.world = this.rebuildWorld(newDay);
      },
      onFinished: () => {
        this.dayTransition = undefined;
      }
    });
  }

  private updatePlayerMentalState(drunkenness: number) {
    const player = this.world.getPlayer();
    if (drunkenness === 5) {
      player.setMentalState('sleep');
    } else {
      player.setMentalState(drunkenness >= 3 ? 'drunk' : 'sober');
    }
  }

  showInventory(view: InventoryView) {
    this.inventoryController.showInventory(view);
  }

  hideInventory() {
    this.inventoryController.hideInventory();
  }

  getAttributes(): PlayerAttributes {
    return this.attributes;
  }

  tick() {
    if (this.isGameWorldActive()) {
      this.world.tick();
      this.inventoryController.gameTick();
      this.calendar.tick();
    } else {
      this.dayTransition?.tick();
      if (this.modalWindow && isTickableComponent(this.modalWindow)) {
        this.modalWindow.tick();
      }
      this.inventoryController.uiTick();
    }
    this.levelUpMsg.tick();
  }

  paint(screen: PixelScreen) {
    if (this.isGameWorldVisible()) {
      this.world.paint(screen);
    }

    screen.withFixedCoords(() => {
      if (this.getMiniGame()) {
        this.getMiniGame()?.paint(screen);
        if (this.infoModalWindow) {
          Overlay.paint(screen);
          this.infoModalWindow.paint(screen);
          this.cursorController.paint(screen);
        }
      } else if (this.infoModalWindow) {
        Overlay.paint(screen);
        this.infoModalWindow.paint(screen);
      } else if (this.modalWindow) {
        Overlay.paint(screen);
        this.modalWindow.paint(screen);
      } else {
        this.inventoryController.paint(screen);
      }

      this.levelUpMsg.paint(screen);
      this.scoreBoard.paint(screen);

      this.dayTransition?.paint(screen);

      if (!this.getMiniGame()) {
        this.cursorController.paint(screen);
      }
    });
  }

  isGameWorldActive(): boolean {
    // Time always stops when game is excplicitly paused or during day transitions
    if (this.infoModalWindow || this.dayTransition) {
      return false;
    }
    // Time also stops when inventory or modalWindow is open,
    // but regardless of that, time always runs during mini-game.
    return Boolean(this.getMiniGame()) || (!this.inventoryController.isObjectInventoryShown() && !this.modalWindow);
  }

  isGameWorldVisible(): boolean {
    return !this.inventoryController.getMiniGame();
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    let stopPropagation: boolean | undefined = undefined;
    stopPropagation = stopPropagation || this.dayTransition?.handleGameEvent(event);
    stopPropagation = stopPropagation || this.infoModalWindow?.handleGameEvent(event);
    stopPropagation = stopPropagation || this.getMiniGame()?.handleGameEvent(event);
    stopPropagation = stopPropagation || this.cursorController.handleGameEvent(event);
    stopPropagation = stopPropagation || this.modalWindow?.handleGameEvent(event);
    stopPropagation = stopPropagation || this.inventoryController.handleGameEvent(event);
    stopPropagation = stopPropagation || this.levelUpMsg.handleGameEvent(event);
    if (stopPropagation) {
      return true;
    }
  }

  highlightCursor(highlighted: boolean) {
    this.cursorController.setHighlighted(highlighted);
  }

  getMouseCoord(): Coord {
    return this.cursorController.getCoord();
  }

  private getMiniGame(): MiniGame | undefined {
    return this.inventoryController.getMiniGame();
  }

  // Normal modal
  showModal(modalWindow: Component) {
    this.modalWindow = modalWindow;
  }

  hideModal() {
    this.modalWindow = undefined;
  }

  // Info-modal
  getInfoModal(): Component | undefined {
    return this.infoModalWindow;
  }

  showInfoModal(infoModalWindow: Component) {
    this.infoModalWindow = infoModalWindow;
  }

  hideInfoModal() {
    this.infoModalWindow = undefined;
  }

  questions(): QuestionFactory {
    return this.questionFacory;
  }

  getWorld() {
    return this.world;
  }
}
