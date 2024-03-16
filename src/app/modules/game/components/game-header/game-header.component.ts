import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GameOption } from '../../enums/game-option.enum';
import { GameEvent } from '../../enums/game-event.enum';

@Component({
  selector: 'app-game-header',
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameHeaderComponent {

  @Input() gameOption: GameOption | null = null;
  @Input() isPlaying: boolean | null = false;
  @Input() isCharactersLoading: boolean | null = false;
  @Input() isCharactersLoaded: boolean | null = false;
  @Input() isCharacterDetailsLoading: boolean | null = false;
  @Input() nextGame: boolean = false;
  @Output() gameEvent = new EventEmitter<GameEvent>();
  @Output() gameOptionEvent = new EventEmitter<GameOption>();

  gameOptions: GameOption[] = Object.values(GameOption);

  onGameOptionUpdate() {
    this.gameOptionEvent.emit(this.gameOption!);
  }

  onStartGame() {
    this.gameEvent.emit(GameEvent.Start);
  }

  onNextRound(playAgain = false) {
    if (playAgain) this.gameEvent.emit(GameEvent.PlayAgain);
    else this.gameEvent.emit(GameEvent.Next);
  }

  onEndGame() {
    this.gameEvent.emit(GameEvent.End);
  }

}
