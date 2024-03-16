import { GameOption } from "../enums/game-option.enum";
import { PersonDetails } from "../models/people/person-details.model";
import { Winner } from "../enums/winner.enum";
import { StarshipDetails } from "../models/starships/starship-details.model";

export interface GameStateModel {
  isPlaying: boolean;
  isCharactersLoading: boolean;
  isCharacterDetailsLoading: boolean;
  ids: string[];
  player: PersonDetails | StarshipDetails | null;
  playerScore: number;
  computer: PersonDetails | StarshipDetails | null;
  computerScore: number;
  winner: Winner;
  gameOption: GameOption;
  scoreLimit: number;
}