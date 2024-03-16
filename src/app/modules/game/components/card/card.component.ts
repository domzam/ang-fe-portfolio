import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {

  @Input() isLoading: boolean | null = false;
  @Input() name: string | undefined = undefined;
  @Input() description: string | undefined = undefined;
  @Input() common: string | undefined = undefined;
  @Input() score: number | null = 0;
  @Input() isWinner: boolean = false;
  @Input() isLoser: boolean = false;
  @Input() computerLayout: boolean = false;
  @Input() scoreLimit: number | null = 0;

}
