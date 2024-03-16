import { GameOption } from "../enums/game-option.enum";

export namespace Game {

  export class ClearCharactersList {
    static readonly type = '[Game] Clear Characters List';
  }

  export class CharactersLoading {
    static readonly type = '[Game] Characters Loading';
  }

  export class CharactersLoaded {
    static readonly type = '[Game] Characters Loaded';
  }

  export class CharacterDetailsLoading {
    static readonly type = '[Game] Character Details Loading';
  }

  export class CharacterDetailsLoaded {
    static readonly type = '[Game] Character Details Loaded';
  }

  export class Start {
    static readonly type = '[Game] Start';
  }

  export class LoadPeopleList {
    static readonly type = '[Game] Load People List';
  }

  export class LoadPeopleListFailed {
    static readonly type = '[Game] Load People List Failed';
  }

  export class LoadStarshipsList {
    static readonly type = '[Game] Load Starships List';
  }

  export class LoadStarshipsListFailed {
    static readonly type = '[Game] Load Starships List Failed';
  }

  export class EmptyCharactersListError {
    static readonly type = '[Game] Empty Characters List Error';
  }

  export class CardsShuffle {
    static readonly type = '[Game] Cards Shuffle';
  }

  export class CardsShuffleFailed {
    static readonly type = '[Game] Cards Shuffle Failed';
  }

  export class UpdateScore {
    static readonly type = '[Game] Update Score';
  }

  export class UpdateGameOption {
    static readonly type = '[Game] Update Game Option';
    constructor(public option: GameOption) { }
  }

  export class End {
    static readonly type = '[Game] End';
  }

  export class PlayAgain {
    static readonly type = '[Game] Play Again';
  }

  export class ResetScore {
    static readonly type = '[Game] Reset Score';
  }

}