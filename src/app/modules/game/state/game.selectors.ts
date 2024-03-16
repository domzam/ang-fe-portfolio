import { Selector } from "@ngxs/store";
import { GameState } from "./game.state";
import { GameStateModel } from "./game.model";
import { GameOption } from "../enums/game-option.enum";
import { PersonDetails } from "../models/people/person-details.model";
import { Winner } from "../enums/winner.enum";
import { StarshipDetails } from "../models/starships/starship-details.model";

export class GameSelectors {

  @Selector([GameState])
  static isPlaying(state: GameStateModel): boolean {
    return state.isPlaying;
  }

  @Selector([GameState])
  static isCharactersLoaded(state: GameStateModel): boolean {
    return !!state.ids.length;
  }

  @Selector([GameState])
  static isCharactersLoading(state: GameStateModel): boolean {
    return state.isCharactersLoading;
  }

  @Selector([GameState])
  static isCharacterDetailsLoading(state: GameStateModel): boolean {
    return state.isCharacterDetailsLoading;
  }

  @Selector([GameState])
  static player(state: GameStateModel): PersonDetails | StarshipDetails | null {
    return state.player;
  }

  @Selector([GameState])
  static playerScore(state: GameStateModel): number {
    return state.playerScore;
  }

  @Selector([GameState])
  static computer(state: GameStateModel): PersonDetails | StarshipDetails | null {
    return state.computer;
  }

  @Selector([GameState])
  static computerScore(state: GameStateModel): number {
    return state.computerScore;
  }

  @Selector([GameState])
  static gameOption(state: GameStateModel): GameOption {
    return state.gameOption;
  }

  @Selector([GameState])
  static winner(state: GameStateModel): Winner {
    return state.winner;
  }

  @Selector([GameState])
  static scoreLimit(state: GameStateModel): number {
    return state.scoreLimit;
  }
}