import { Selector } from "@ngxs/store";
import { GameState } from "./game.state";
import { GameStateModel } from "./game.model";
import { PersonDetails } from "../../../modules/game/models/people/person-details.model";
import { BattleResult } from "../../../modules/game/models/battle-result.enum";
import { StarshipDetails } from "../../../modules/game/models/starships/starship-details.model";
import { GameOption } from "../../../modules/game/models/game-option.enum";

export class GameSelectors {
  @Selector([GameState])
  static isPlaying(state: GameStateModel): boolean {
    return state.isPlaying;
  }

  @Selector([GameState])
  static isLoading(state: GameStateModel): boolean {
    return state.isLoading;
  }

  @Selector([GameState])
  static isCardsReloading(state: GameStateModel): boolean {
    return state.cardsReloading;
  }

  @Selector([GameState])
  static player(state: GameStateModel): PersonDetails | null {
    return state.player;
  }

  @Selector([GameState])
  static playerStarship(state: GameStateModel): StarshipDetails | null {
    return state.playerStarships;
  }

  @Selector([GameState])
  static computer(state: GameStateModel): PersonDetails | null {
    return state.computer;
  }

  @Selector([GameState])
  static computerStarship(state: GameStateModel): StarshipDetails | null {
    return state.computerStarships;
  }

  @Selector([GameState])
  static computerResult(state: GameStateModel): BattleResult {
    return state.computerResult;
  }

  @Selector([GameState])
  static playerResult(state: GameStateModel): BattleResult {
    return state.playerResult;
  }

  @Selector([GameState])
  static playerWinCount(state: GameStateModel): number {
    return state.playerWinCount;
  }

  @Selector([GameState])
  static computerWinCount(state: GameStateModel): number {
    return state.computerWinCount;
  }

  @Selector([GameState])
  static isFinalWinner(state: GameStateModel): boolean {
    return state.isFinalWinner;
  }

  @Selector([GameState])
  static gameOption(state: GameStateModel): GameOption {
    return state.gameOption;
  }
}