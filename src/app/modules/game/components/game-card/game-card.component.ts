import { Component, Input } from '@angular/core';
import { BattleResult } from '../../models/battle-result.enum';
import { PersonDetails } from '../../models/people/person-details.model';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {

  @Input({ required: false }) imagePath: string = '';
  @Input({ required: false }) isLoading: boolean = false;
  @Input({ required: false }) person: PersonDetails | null = null;
  @Input({ required: false }) battleResult: BattleResult | null = BattleResult.None;

  get image() { return this.imagePath || 'assets/img/game/people/none.jpg'; }
  get name() { return this.person?.properties.name || '#####'; }
  get description() { return this.person?.description || '#####'; }
  get mass() { return this.person?.properties.mass || '#'; }
  get height() { return this.person?.properties.height || '#'; }
  get hairColor() { return this.person?.properties.hair_color || '#'; }
  get skinColor() { return this.person?.properties.skin_color || '#'; }
  get eyeColor() { return this.person?.properties.eye_color || '#'; }
  get birthYear() { return this.person?.properties.birth_year || '#'; }
  get gender() { return this.person?.properties.gender || '#'; }
}
