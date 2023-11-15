import { GameOption } from "../../../modules/game/models/game-option.enum";

export namespace Game {

  export class IsLoading {
    static readonly type = '[Game] Is Loading';
  }

  export class IsLoaded {
    static readonly type = '[Game] Is Loaded';
  }

  export class CardsReloading {
    static readonly type = '[Game] Cards Reloading';
  }

  export class CardsReloaded {
    static readonly type = '[Game] Cards Reloaded';
  }

  export class Start {
    static readonly type = '[Game] Start';
  }

  export class End {
    static readonly type = '[Game] End';
  }

  export class LoadCharacters {
    static readonly type = '[Game] Load Characters';
  }

  export class LoadGame {
    static readonly type = '[Game] Load Game';
    constructor(public evokeError?: boolean) { }
  }

  export class CardsShuffle {
    static readonly type = '[Game] Cards Shuffle';
    constructor(public evokeError?: boolean) { }
  }

  export class CardsShuffleFailed {
    static readonly type = '[Game] Cards Shuffle Failed';
  }

  export class SetWinner {
    static readonly type = '[Game] Set Winner';
  }

  export class ResetResults {
    static readonly type = '[Game] Reset Results';
  }

  export class ResetScors {
    static readonly type = '[Game] Reset Scores';
  }

  export class ResetPlayers {
    static readonly type = '[Game] Reset Players';
  }

  export class UpdateGameOption {
    static readonly type = '[Game] Update Game Option';
    constructor(public option: GameOption) { }
  }

}