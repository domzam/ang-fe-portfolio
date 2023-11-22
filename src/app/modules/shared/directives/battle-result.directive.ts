import { Directive, HostBinding, Input, OnChanges } from '@angular/core';
import { BattleResult } from '../../game/models/battle-result.enum';

@Directive({
  selector: '[appBattleResult]'
})
export class BattleResultDirective implements OnChanges {

  @Input({ required: false })
  className: BattleResult | null = BattleResult.None;

  @HostBinding('class')
  resultClass = '';

  ngOnChanges(): void {
    switch (this.className) {
      case BattleResult.Draw:
        this.resultClass = 'draw';
        break;
      case BattleResult.Loser:
        this.resultClass = 'loser';

        break;
      case BattleResult.Winner:
        this.resultClass = 'winner';
        break;
      case BattleResult.FinalWinner:
        this.resultClass = 'final-winner';
        break;
      default: this.resultClass = '';
    }
  }
}
