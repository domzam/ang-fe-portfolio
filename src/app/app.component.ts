import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GameSelectors } from './modules/game/state/game.selectors';
import { Game } from './modules/game/state/game.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private store = inject(Store);

  @Select(GameSelectors.isPlaying) isPlaying$!: Observable<boolean>;

  endGame() {
    this.store.dispatch([
      new Game.End(),
      new Game.CardsReloaded(),
      new Game.ResetResults(),
      new Game.ResetScors(),
      new Game.ResetPlayers()
    ]);
  }

}
