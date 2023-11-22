import { GamePlayerDetails } from "../../game/models/game-player-details.model";

export const TABLE_COLUMNS = ['position', 'name', 'wins', 'lose'];

export const TABLE_DATA: GamePlayerDetails[] = [
  { position: 1, name: 'Player 1', wins: 70, lose: 23 },
  { position: 2, name: 'Player 2', wins: 56, lose: 32 },
  { position: 3, name: 'Player 3', wins: 44, lose: 27 },
  { position: 4, name: 'Player 4', wins: 23, lose: 32 },
  { position: 5, name: 'Player 5', wins: 11, lose: 15 }
];