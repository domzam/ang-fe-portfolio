import { People } from "../models/people/people.model";
import { BattleResult } from "../models/battle-result.enum";
import { PersonDetails } from "../models/people/person-details.model";
import { Starships } from "../models/starships/starships.model";
import { StarshipDetails } from "../../../modules/game/models/starships/starship-details.model";
import { GameOption } from "../../../modules/game/models/game-option.enum";

export interface GameStateModel {
  isPlaying: boolean;
  isLoading: boolean;
  cardsReloading: boolean;
  characters: People[];
  ships: Starships[];
  player: PersonDetails | null;
  playerStarships: StarshipDetails | null;
  computer: PersonDetails | null;
  computerStarships: StarshipDetails | null;
  playerResult: BattleResult;
  computerResult: BattleResult;
  playerWinCount: number;
  computerWinCount: number;
  isFinalWinner: boolean;
  gameOption: GameOption;
}