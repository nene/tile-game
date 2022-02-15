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
import { resetCharacters } from "./npc/characters";
import { LevelUpMessage } from "./ui/LevelUpMessage";
import { toggleSkillsView } from "./ui/infoModals";
import { Player } from "./player/Player";
import { filter, delay, Subscription, combineLatest } from "rxjs";
import { Scene } from "./scenes/Scene";
import { StartScene } from "./scenes/StartScene";

const START_DAY = 2;

export class UiController {
  private scene: Scene;
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
  private miniGame?: MiniGame;

  constructor() {
    this.calendar = new Calendar();
    this.inventoryController = new InventoryController(this.attributes);
    this.cursorController = new CursorController();
    this.scoreBoard = new ScoreBoard();
    this.questionFacory = new QuestionFactory(this.attributes.orgSkill, this.attributes.termSkill);

    [this.scene, this.world] = this.rebuildWorld(START_DAY);

    this.calendar.dayEnd$.subscribe((day) => this.doDayTransition(day + 1));

    this.attributes.alcoSkill.drunkenness$.subscribe((drunkenness) => this.updatePlayerMentalState(drunkenness));

    this.attributes.wallet.money$.subscribe((money) => this.scoreBoard.setMoney(money));
    this.attributes.alcoSkill.drunkenness$.subscribe((drunkenness) => this.scoreBoard.setDrunkenness(drunkenness));
    this.calendar.dateTime$.subscribe((dateTime) => this.scoreBoard.setDateTime(dateTime));

    this.attributes.levelUp$.subscribe((event) => this.levelUpMsg.show(event));
    this.levelUpMsg.click$.subscribe(() => toggleSkillsView(this));

    this.inventoryController.miniGame$.subscribe((miniGame) => this.startMiniGame(miniGame));
  }

  private rebuildWorld(day: number): [Scene, GameWorld] {
    this.miniGame = undefined;
    this.inventoryController.resetForNewDay();
    this.attributes.resetForNewDay();
    this.calendar.setDay(day);
    resetCharacters();
    const scene = new StartScene();
    const world = createWorld(scene);
    this.initPlayer(world.getPlayer());
    return [scene, world];
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
        [this.scene, this.world] = this.rebuildWorld(newDay);
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
      this.scene.tick(this.world);
      this.world.tick();
      this.miniGame?.tick();
      if (this.miniGame?.isFinished()) {
        this.miniGame = undefined;
      }
      this.calendar.tick();
    } else {
      this.dayTransition?.tick();
      if (this.modalWindow && isTickableComponent(this.modalWindow)) {
        this.modalWindow.tick();
      }
      this.inventoryController.tick();
    }
    this.levelUpMsg.tick();
  }

  paint(screen: PixelScreen) {
    if (this.isGameWorldVisible()) {
      this.world.paint(screen);
    }

    screen.withFixedCoords(() => {
      if (this.miniGame) {
        this.miniGame.paint(screen);
        this.paintMinigameUi(screen);
      } else {
        this.paintGameUi(screen);
      }
    });
  }

  private paintGameUi(screen: PixelScreen) {
    if (this.infoModalWindow) {
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
    this.cursorController.paint(screen);
  }

  private paintMinigameUi(screen: PixelScreen) {
    if (this.infoModalWindow) {
      Overlay.paint(screen);
      this.infoModalWindow.paint(screen);
    }

    this.levelUpMsg.paint(screen);
    this.scoreBoard.paint(screen);
    this.dayTransition?.paint(screen);

    if (this.infoModalWindow) {
      this.cursorController.paint(screen);
    }
  }

  isGameWorldActive(): boolean {
    // Time always stops when game is excplicitly paused or during day transitions
    if (this.infoModalWindow || this.dayTransition) {
      return false;
    }
    // Time also stops when inventory or modalWindow is open,
    // but regardless of that, time always runs during mini-game.
    return Boolean(this.miniGame) || (!this.inventoryController.isObjectInventoryShown() && !this.modalWindow);
  }

  isGameWorldVisible(): boolean {
    return !this.miniGame;
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    let stopPropagation: boolean | undefined = undefined;
    stopPropagation = stopPropagation || this.dayTransition?.handleGameEvent(event);
    stopPropagation = stopPropagation || this.infoModalWindow?.handleGameEvent(event);
    stopPropagation = stopPropagation || this.miniGame?.handleGameEvent(event);
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

  private startMiniGame(miniGame: MiniGame) {
    this.miniGame = miniGame;
    // Ensure we start minigame with current mouse coordinate
    this.miniGame.handleGameEvent({ type: "mousemove", coord: this.getMouseCoord() });
    this.miniGame.init(this.attributes);
    // Minigame might finish immediately. Discard it in that case
    if (this.miniGame.isFinished()) {
      this.miniGame = undefined;
    }
  }
}
