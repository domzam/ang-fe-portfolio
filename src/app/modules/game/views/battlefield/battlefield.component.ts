import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BattleResult } from '../../models/battle-result.enum';
import { PersonDetails } from '../../models/people/person-details.model';
import { GameSelectors } from '../../state/game.selectors';
import { FormControl, Validators } from '@angular/forms';
import { GameService } from '../../../../modules/game/services/game.service';
import { StarshipDetails } from '../../../../modules/game/models/starships/starship-details.model';
import { GameOption } from '../../../../modules/game/models/game-option.enum';
import { Game } from '../../state/game.actions';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss']
})
export class BattlefieldComponent {

  private gameService = inject(GameService);
  private store = inject(Store);

  @Select(GameSelectors.isPlaying) isPlaying$!: Observable<boolean>;
  @Select(GameSelectors.isCardsReloading) isCardsReloading$!: Observable<boolean>;
  @Select(GameSelectors.isLoading) isLoading$!: Observable<boolean>;
  @Select(GameSelectors.player) player$!: Observable<PersonDetails | null>;
  @Select(GameSelectors.playerStarship) playerStarship$!: Observable<StarshipDetails | null>;
  @Select(GameSelectors.computer) computer$!: Observable<PersonDetails | null>;
  @Select(GameSelectors.computerStarship) computerStarship$!: Observable<StarshipDetails | null>;
  @Select(GameSelectors.playerResult) playerResult$!: Observable<BattleResult>;
  @Select(GameSelectors.computerResult) computerResult$!: Observable<BattleResult>;
  @Select(GameSelectors.playerWinCount) playerWinCount$!: Observable<number>;
  @Select(GameSelectors.computerWinCount) computerWinCount$!: Observable<number>;
  @Select(GameSelectors.isFinalWinner) isFinalWinner$!: Observable<boolean>;

  get computerImage() { return this.gameService.computerImage; }
  get playerImage() { return this.gameService.playerImage; }

  playerName = new FormControl('', Validators.required);
  gameOptions: GameOption[] = Object.values(GameOption);
  selectedOption: GameOption = this.store.selectSnapshot<GameOption>(GameSelectors.gameOption);

  onStartGame(evokeError?: boolean) {
    this.store.dispatch([
      new Game.IsLoading(),
      new Game.LoadGame(evokeError),
      new Game.Start()
    ]);
  }

  onPlay(evokeError?: boolean) {
    this.store.dispatch([
      new Game.ResetResults(),
      new Game.CardsReloading(),
      new Game.CardsShuffle(evokeError)
    ]);
  }

  onPlayAgain() {
    this.store.dispatch([
      new Game.ResetResults(),
      new Game.ResetScors(),
      new Game.ResetPlayers()
    ]);
  }

  gameOptionUpdate() {
    this.store.dispatch([
      new Game.ResetPlayers(),
      new Game.ResetResults(),
      new Game.UpdateGameOption(this.selectedOption)
    ]);
  }

}
