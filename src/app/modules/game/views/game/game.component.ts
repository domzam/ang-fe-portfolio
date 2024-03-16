import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Game } from '../../state/game.actions';
import { Observable } from 'rxjs';
import { GameSelectors } from '../../state/game.selectors';
import { PersonDetails } from '../../models/people/person-details.model';
import { Winner } from '../../enums/winner.enum';
import { GameEvent } from '../../enums/game-event.enum';
import { GameOption } from '../../enums/game-option.enum';
import { StarshipDetails } from '../../models/starships/starship-details.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit {

  private store = inject(Store);

  public scoreLimit = this.store.selectSnapshot<number>((state) => state.game.scoreLimit);
  public playerWins = Winner.Player;
  public computerWins = Winner.Computer;

  public peopleGame = GameOption.People;
  public starshipGame = GameOption.Starships;

  @Select(GameSelectors.isCharactersLoading) isCharactersLoading$!: Observable<boolean>;
  @Select(GameSelectors.isCharactersLoaded) isCharactersLoaded$!: Observable<boolean>;
  @Select(GameSelectors.isPlaying) isPlaying$!: Observable<boolean>;
  @Select(GameSelectors.isCharacterDetailsLoading) isCharacterDetailsLoading$!: Observable<boolean>;
  @Select(GameSelectors.player) player$!: Observable<PersonDetails | StarshipDetails | null>;
  @Select(GameSelectors.playerScore) playerScore$!: Observable<number | null>;
  @Select(GameSelectors.computer) computer$!: Observable<PersonDetails | StarshipDetails | null>;
  @Select(GameSelectors.computerScore) computerScore$!: Observable<number | null>;
  @Select(GameSelectors.winner) winner$!: Observable<Winner | null>;
  @Select(GameSelectors.scoreLimit) scoreLimit$!: Observable<number | null>;
  @Select(GameSelectors.gameOption) gameOption$!: Observable<GameOption | null>;

  ngOnInit(): void {
    this.store.dispatch(new Game.LoadPeopleList());
  }

  public game(gameEvent: GameEvent) {
    switch (gameEvent) {
      case GameEvent.Start:
        this.store.dispatch(new Game.Start());
        break;
      case GameEvent.End:
        this.store.dispatch(new Game.End());
        break;
      case GameEvent.Next:
        this.store.dispatch(new Game.CardsShuffle());
        break;
      case GameEvent.PlayAgain:
        this.store.dispatch(new Game.PlayAgain());
        break;
      default:
        break;
    }
  }

  public onGameOptionUpdate(option: GameOption) {
    this.store.dispatch(new Game.UpdateGameOption(option));
  }

  public toPerson(details: PersonDetails | StarshipDetails | null): PersonDetails | null {
    if (details && 'mass' in details) return details as PersonDetails;
    return null;
  }

  public toStarship(details: PersonDetails | StarshipDetails | null): StarshipDetails | null {
    if (details && 'crew' in details) return details as StarshipDetails;
    return null;
  }

}
