import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PersonDetails } from '../../models/people/person-details.model';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonCardComponent {

  @Input() isLoading: boolean | null = false;
  @Input() person: PersonDetails | null = null;
  @Input() computerLayout: boolean = false;
  @Input() score: number | null = 0;
  @Input() isWinner: boolean = false;
  @Input() isLoser: boolean = false;
  @Input() scoreLimit: number | null = 0;

 }
